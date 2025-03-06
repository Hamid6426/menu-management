import Section from "../../components/admin/Section";

export default function AccountSettings() {
  return (
    <div className="min-h-screen w-full px-6">
      <h1 className="text-3xl font-black my-3">Account Settings</h1>

      {/* Personal Information */}
      <Section title="Personal Information">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="john.doe@example.com"
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Save Changes
          </button>
        </form>
      </Section>

      {/* Account Security */}
      <Section title="Account Security">
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Change Password
        </button>
      </Section>

      {/* Preferences */}
      <Section title="Preferences">
        <div>
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <select
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </Section>

      <Section title="Theme Settings">
        <div>
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <select
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          >
            <option>System</option>
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>
      </Section>
    </div>
  );
}
