import ProfileAccount from "@/components/profile/profile-account";
import AccountNav from "@/components/profile/nav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white text-black pt-[64px] pb-[72px] max-w-5xl mx-auto px-4">
      <ProfileAccount />

      <AccountNav />
      <section>{children}</section>
    </main>
  );
}
