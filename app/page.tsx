export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center py-20 bg-gradient-to-b from-primary to-secondary text-white rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Prepare for your study visa with confidence</h1>
        <p className="mb-6 max-w-2xl mx-auto">
          Brovi Check helps you assess document readiness, match programs, evaluate financial statements and practice interviews – all in one place.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/document-scan" className="btn-primary">Start Free Scan</a>
          <a href="/pricing" className="btn-secondary">View Pricing</a>
        </div>
      </section>

      <section>
        <h2 className="section-title text-center">What Brovi Check does</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card">
            <h3 className="font-semibold mb-2">Document Readiness</h3>
            <p className="muted-text">Check passports, academic transcripts, certificates and more to make sure you have everything you need.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Program Match</h3>
            <p className="muted-text">Assess your background against target programs and receive personalised recommendations.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Financial Readiness</h3>
            <p className="muted-text">Evaluate bank statements, sponsorship and budgeting to prepare the financial proof.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Interview Practice</h3>
            <p className="muted-text">Answer common visa interview questions and get feedback on clarity, confidence and purpose.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Track Applications</h3>
            <p className="muted-text">Manage your applications and stay on top of statuses, tasks and next steps.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Secure Vault</h3>
            <p className="muted-text">Store documents safely and access them anywhere, while keeping your data private.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title text-center">How it works</h2>
        <ol className="list-decimal max-w-3xl mx-auto space-y-4">
          <li>Sign up and complete your profile.</li>
          <li>Run scans for documents, program fit, finances and interview readiness.</li>
          <li>Review your personalised report and follow the recommended actions.</li>
          <li>Access tasks, applications and document vault from your dashboard.</li>
          <li>Request consultant review when you’re ready.</li>
        </ol>
      </section>

      <section className="bg-neutral-100 dark:bg-neutral-800 p-8 rounded-lg">
        <h2 className="section-title text-center">Safety and privacy</h2>
        <p className="max-w-3xl mx-auto muted-text">
          We take privacy seriously. Your data is encrypted and stored securely. We never ask for your passwords, card numbers or banking credentials.
        </p>
      </section>

      <section className="text-center">
        <h2 className="section-title">Ready to start?</h2>
        <a href="/document-scan" className="btn-primary">Start Free Scan</a>
      </section>
    </div>
  );
}