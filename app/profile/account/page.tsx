// app/profile/account/page.tsx

export default function AccountSettingsPage() {
  return (
    <section className="max-w-md mx-auto space-y-6">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
      <form>
        <label className="block mb-2 font-semibold" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="John Doe"
          disabled
        />

        <label className="block mb-2 font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="john@example.com"
          disabled
        />

        <p className="mt-4 text-gray-500 italic text-sm">
          Account settings editing is not implemented in this MVP.
        </p>
      </form>
    </section>
  );
}
