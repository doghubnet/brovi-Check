export default function PrivacyPage() {
  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
      <p>We respect your privacy. Brovi Check collects only the information necessary to provide our services and never shares personal data with third parties without your consent. We use industry‑standard encryption and secure storage to protect your documents and information.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Information we collect</h2>
      <ul className="list-disc list-inside">
        <li>Basic account details like name and email address.</li>
        <li>Visa preparation information you choose to provide.</li>
        <li>Usage analytics to improve our services.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">How we use your information</h2>
      <p>We use your data to deliver the features of Brovi Check such as document scanning, program matching, financial readiness analysis and interview practice. Your data is never sold or shared for advertising purposes.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Data retention</h2>
      <p>We retain your information for as long as your account remains active or as needed to provide you services. You can request account deletion at any time.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p>If you have questions about this policy, please contact our support team.</p>
    </div>
  );
}