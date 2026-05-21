export default function PricingPage() {
  const plans = [
    {
      name: 'Free Plan',
      price: 'Free',
      features: ['Document scan', 'Program match', 'Finance readiness', 'Interview practice'],
    },
    {
      name: 'Premium Review',
      price: '$49',
      features: ['Full readiness report', 'Priority task list', 'Email support'],
    },
    {
      name: 'Consultant Support',
      price: 'Contact us',
      features: ['One‑on‑one consultant session', 'Detailed feedback', 'Tailored guidance'],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Team dashboards', 'Bulk onboarding', 'Dedicated success manager'],
    },
  ];
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-center">Pricing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="card flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold text-primary mb-4">{plan.price}</p>
              <ul className="space-y-1 text-sm mb-4">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-1">
                    ✔
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {plan.price === 'Free' ? (
                <a href="/document-scan" className="btn-primary w-full">Get Started</a>
              ) : (
                <a href="/consultant-review" className="btn-secondary w-full">Contact Us</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}