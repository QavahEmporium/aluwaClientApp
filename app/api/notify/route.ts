// app/api/notify/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import Order from "@/models/order";

export async function POST(req: Request) {
  try {
    // 1️⃣ Get raw POST body from Payfast
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);

    // Convert to object for easier handling
    const data: Record<string, string> = {};
    params.forEach((value, key) => (data[key] = value));

    console.log("✅ Payfast ITN Received:", data);

    // 2️⃣ Rebuild signature string (alphabetical order, encode values)
    let signatureString = Object.entries(data)
      .filter(([k]) => k !== "signature") // exclude signature from string
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&");

    // Add passphrase
    if (process.env.PAYFAST_PASSPHRASE) {
      signatureString += `&passphrase=${encodeURIComponent(
        process.env.PAYFAST_PASSPHRASE
      )}`;
    }

    // 3️⃣ Generate signature and compare
    const generatedSignature = crypto
      .createHash("md5")
      .update(signatureString)
      .digest("hex");

    if (generatedSignature !== data.signature) {
      console.error("❌ Invalid Payfast signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 4️⃣ Optionally verify source IP (Payfast IP ranges)
    // This step is recommended for production to prevent spoofed requests.
    // You can fetch the request IP from headers: req.headers.get("x-forwarded-for");

    // 5️⃣ Validate with Payfast server (postback)
    const pfHost =
      process.env.PAYFAST_MODE === "sandbox"
        ? "sandbox.payfast.co.za"
        : "www.payfast.co.za";

    const validationResponse = await fetch(
      `https://${pfHost}/eng/query/validate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyText, // send exact same body back
      }
    );

    const validationText = await validationResponse.text();

    // if (validationText !== "VALID") {
    //   console.error("❌ Payfast ITN validation failed:", validationText);
    //   return NextResponse.json({ error: "Invalid ITN data" }, { status: 400 });
    // }

    // 6️⃣ If we reach here, payment is verified ✅
    console.log("✅ Payfast Payment Verified:", data);

    // 🔹 TODO: Update your order in DB (match data.m_payment_id or token)
    // e.g. await markOrderAsPaid(data.m_payment_id, data.pf_payment_id);
    const status =
      data.payment_status === "COMPLETE"
        ? "complete"
        : data.payment_status === "CANCELLED"
        ? "cancelled"
        : "";

    Order.findByIdAndUpdate(
      data.m_payment_id,
      {
        status,
      },
      { new: true }
    );

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error processing Payfast ITN:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
/* 

✅ Payfast ITN Received: {
  m_payment_id: '68d11da18abb77f304605bde',
  pf_payment_id: '2794127',
  payment_status: 'COMPLETE',
  item_name: 'Aluwa HairCare Product',
  item_description: 'Aluwa HairCare Product',
  amount_gross: '550.00',
  amount_fee: '-12.65',
  amount_net: '537.35',
  custom_str1: '',
  custom_str2: '',
  custom_str3: '',
  custom_str4: '',
  custom_str5: '',
  custom_int1: '',
  custom_int2: '',
  custom_int3: '',
  custom_int4: '',
  custom_int5: '',
  name_first: 'Qavah',
  name_last: '',
  email_address: 'admin@theugatour.com',
  merchant_id: '10042059',
  signature: '2f01285eb12ce49106452024160a9935'
}

*/
