"use client";
import { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';

interface DocItem {
  name: string;
  section: string;
}

const docItems: DocItem[] = [
  { name: 'Passport', section: 'Identity' },
  { name: 'Passport photo', section: 'Identity' },
  { name: 'National ID', section: 'Identity' },
  { name: 'Birth certificate', section: 'Identity' },
  { name: 'Academic transcript', section: 'Academic' },
  { name: 'Degree certificate or grade 12 certificate', section: 'Academic' },
  { name: 'Language proof', section: 'Academic' },
  { name: 'Admission letter', section: 'Admission' },
  { name: 'Pre-enrollment or application proof', section: 'Admission' },
  { name: 'Motivation letter', section: 'Admission' },
  { name: 'Recommendation letter', section: 'Admission' },
  { name: 'CV', section: 'Admission' },
  { name: 'Sponsor letter', section: 'Financial/Sponsor' },
  { name: 'Bank statement', section: 'Financial/Sponsor' },
  { name: 'Sponsor ID', section: 'Financial/Sponsor' },
  { name: 'Sponsor income proof', section: 'Financial/Sponsor' },
  { name: 'Family certificate if needed', section: 'Financial/Sponsor' },
  { name: 'Translation status', section: 'Translation/Legalization' },
  { name: 'Legalization status', section: 'Translation/Legalization' },
  { name: 'Apostille or consular legalization if needed', section: 'Translation/Legalization' },
  { name: 'Country-specific extra document', section: 'Country-specific' },
];

const statusOptions = [
  'Ready',
  'Missing',
  'In progress',
  'Needs update',
  'Needs translation',
  'Needs legalization',
  'Not required',
];

export default function DocumentScanPage() {
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [result, setResult] = useState<null | { percentage: number; missing: string[]; recommendations: string[] }>(null);
  const sections = Array.from(new Set(docItems.map((i) => i.section)));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const items = docItems.map((item) => ({ name: item.name, status: formState[item.name] || 'Missing' }));
    try {
      const res = await fetch('/api/analyze-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult(null);
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sticky section menu for large screens */}
        <nav className="hidden lg:block w-56 border-r border-neutral-200 dark:border-neutral-700 pt-4">
          <ul className="space-y-2">
            {sections.map((sec) => (
              <li key={sec}>
                <a href={`#${sec.replace(/\s+/g, '-')}`} className="block px-3 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  {sec}
                </a>
              </li>
            ))}
            <li>
              <a href="#Review" className="block px-3 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800">
                Review
              </a>
            </li>
          </ul>
        </nav>
        {/* Main form */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-4">Document Scan</h1>
          <p className="muted-text mb-6">Submit the form to receive percentage‑based readiness scoring and step‑by‑step recommendations.</p>
          <form onSubmit={handleSubmit} className="space-y-8">
            {sections.map((sec) => (
              <div id={sec.replace(/\s+/g, '-')} key={sec} className="space-y-4">
                <h2 className="section-title text-xl">{sec}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {docItems
                    .filter((i) => i.section === sec)
                    .map((item) => (
                      <div key={item.name} className="flex flex-col">
                        <label className="text-sm font-medium mb-1 flex items-center gap-1">
                          {item.name}
                          <span title="Select current status. Verify official requirements before submission." className="text-primary cursor-help">ℹ︎</span>
                        </label>
                        <select
                          className="rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800"
                          value={formState[item.name] || ''}
                          onChange={(e) => setFormState({ ...formState, [item.name]: e.target.value })}
                        >
                          <option value="" disabled>Select status</option>
                          {statusOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                </div>
              </div>
            ))}
            {/* Attachments placeholder */}
            <div id="Attachments" className="space-y-4">
              <h2 className="section-title text-xl">Attachments</h2>
              <p className="muted-text text-sm">Do not upload bank passwords, card numbers, CVV, online banking login details, OTPs, or private access codes.</p>
              <div className="flex items-center gap-4">
                <input type="file" multiple disabled className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" />
                <span className="muted-text text-sm">(Preview only in Round 1)</span>
              </div>
            </div>
            <div id="Review" className="space-y-4">
              <h2 className="section-title text-xl">Review</h2>
              <button type="submit" className="btn-primary">Analyze Documents</button>
              {result && (
                <div className="mt-4 card">
                  <h3 className="font-semibold mb-2">Results</h3>
                  <p className="muted-text mb-2">Readiness: {result.percentage}%</p>
                  {result.missing.length > 0 && (
                    <div className="mb-2">
                      <p className="font-medium">Missing or incomplete items:</p>
                      <ul className="list-disc list-inside text-sm">
                        {result.missing.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.recommendations.length > 0 && (
                    <div>
                      <p className="font-medium">Recommendations:</p>
                      <ul className="list-disc list-inside text-sm">
                        {result.recommendations.map((r, idx) => (
                          <li key={idx}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}