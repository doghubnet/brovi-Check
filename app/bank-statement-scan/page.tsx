"use client";
import { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';

interface FinanceForm {
  targetCountry: string;
  relation: string;
  currency: string;
  tuition: string;
  living: string;
  opening: string;
  closing: string;
  average: string;
  income: string;
  expense: string;
  largeDeposits: string;
  jobProof: string;
  accommodationProof: string;
}

export default function BankStatementPage() {
  const [form, setForm] = useState<FinanceForm>({
    targetCountry: '',
    relation: '',
    currency: '',
    tuition: '',
    living: '',
    opening: '',
    closing: '',
    average: '',
    income: '',
    expense: '',
    largeDeposits: '',
    jobProof: '',
    accommodationProof: '',
  });
  const [result, setResult] = useState<null | { percentage: number; riskFlags: string[]; missing: string[]; recommendations: string[] }>(null);

  const handleChange = (key: keyof FinanceForm, value: string) => {
    setForm({ ...form, [key]: value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/analyze-finance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult(null);
    }
  }

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Bank Statement Readiness</h1>
        <p className="muted-text mb-6">Provide your financial details. We will not ask for passwords or sensitive banking information.</p>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Target country</label>
              <input type="text" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.targetCountry} onChange={(e) => handleChange('targetCountry', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Sponsor relation</label>
              <input type="text" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.relation} onChange={(e) => handleChange('relation', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Currency</label>
              <input type="text" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.currency} onChange={(e) => handleChange('currency', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Tuition amount</label>
              <input type="number" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.tuition} onChange={(e) => handleChange('tuition', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Living cost estimate</label>
              <input type="number" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.living} onChange={(e) => handleChange('living', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Opening balance</label>
              <input type="number" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.opening} onChange={(e) => handleChange('opening', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Closing balance</label>
              <input type="number" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.closing} onChange={(e) => handleChange('closing', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Average balance</label>
              <input type="number" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.average} onChange={(e) => handleChange('average', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Monthly income</label>
              <input type="number" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.income} onChange={(e) => handleChange('income', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Monthly expense</label>
              <input type="number" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.expense} onChange={(e) => handleChange('expense', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium block mb-1">Large deposits explanation</label>
              <textarea className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" rows={2} value={form.largeDeposits} onChange={(e) => handleChange('largeDeposits', e.target.value)}></textarea>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Sponsor job/business proof</label>
              <input type="text" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.jobProof} onChange={(e) => handleChange('jobProof', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Accommodation proof</label>
              <input type="text" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.accommodationProof} onChange={(e) => handleChange('accommodationProof', e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn-primary">Analyze Financial Readiness</button>
        </form>
        {result && (
          <div className="mt-6 card">
            <h3 className="font-semibold mb-2">Results</h3>
            <p className="muted-text mb-2">Financial readiness: {result.percentage}%</p>
            {result.riskFlags.length > 0 && (
              <div className="mb-2">
                <p className="font-medium">Risk flags:</p>
                <ul className="list-disc list-inside text-sm">
                  {result.riskFlags.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.missing.length > 0 && (
              <div className="mb-2">
                <p className="font-medium">Missing proof:</p>
                <ul className="list-disc list-inside text-sm">
                  {result.missing.map((m, idx) => (
                    <li key={idx}>{m}</li>
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
    </ProtectedRoute>
  );
}