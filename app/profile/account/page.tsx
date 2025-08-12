"use client";

import { useState } from "react";

export default function AccountSettings() {
  // Dummy initial user data — replace with real user state/store
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Profile updated:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`);
    // TODO: Save user info to backend/auth store
  };

  return (
    <form
      onSubmit={handleSave}
      className="max-w-lg mx-auto flex flex-col gap-6 bg-white"
    >
      <label className="flex flex-col gap-1">
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        Phone (optional)
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
      </label>

      <button
        type="submit"
        className="bg-black text-white py-2 rounded hover:bg-gray-900 transition"
      >
        Save Changes
      </button>
    </form>
  );
}
