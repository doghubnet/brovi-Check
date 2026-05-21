"use client";
import { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { PDFReportButton } from '../../components/reports/PDFReportButton';

interface ModuleScores {
  document: number;
  program: number;
  finance: number;
  interview: number;
}

export default function ReadinessReportPage() {
  const [scores, setScores] = useState<ModuleScores>({ document: 0, program: 0, finance: 0, interview: 0 });
  const [overall, setOverall] = useState<number | null>(null);
  const [priority, setPriority] = useState<string[]>([]);

  async function handleGenerate() {
    try {
      const res = await fetch('/api/generate-final-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores }),
      });
      const data = await res.json();
      setOverall(data.overall);
      setPriority(data.priority);
    } catch {
      setOverall(null);
      setPriority([]);
    }
  }

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Readiness Report</h1>
        <p className="muted-text mb-6">Combine your module scores to see your overall readiness and get a priority action plan.</p>
        <div className="space-y-4 mb-6 max-w-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Document score (%)</label>
              <input type="number" max={100} min={0} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={scores.document} onChange={(e) => setScores({ ...scores, document: Number(e.target.value) })} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Program score (%)</label>
              <input type="number" max={100} min={0} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={scores.program} onChange={(e) => setScores({ ...scores, program: Number(e.target.value) })} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Financial score (%)</label>
              <input type="number" max={100} min={0} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={scores.finance} onChange={(e) => setScores({ ...scores, finance: Number(e.target.value) })} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Interview score (%)</label>
              <input type="number" max={100} min={0} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={scores.interview} onChange={(e) => setScores({ ...scores, interview: Number(e.target.value) })} />
            </div>
          </div>
          <button type="button" className="btn-primary" onClick={handleGenerate}>Generate Report</button>
        </div>
        {overall !== null && (
          <div className="card mb-6">
            <h3 className="font-semibold mb-2">Report Summary</h3>
            <p className="muted-text mb-2">Overall readiness: {overall}%</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
              <div>
                <p className="font-medium">Document</p>
                <p className="muted-text">{scores.document}%</p>
              </div>
              <div>
                <p className="font-medium">Program</p>
                <p className="muted-text">{scores.program}%</p>
              </div>
              <div>
                <p className="font-medium">Finance</p>
                <p className="muted-text">{scores.finance}%</p>
              </div>
              <div>
                <p className="font-medium">Interview</p>
                <p className="muted-text">{scores.interview}%</p>
              </div>
            </div>
            {priority.length > 0 && (
              <div>
                <p className="font-medium">Priority action plan:</p>
                <ul className="list-disc list-inside text-sm">
                  {priority.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <PDFReportButton />
      </div>
    </ProtectedRoute>
  );
}