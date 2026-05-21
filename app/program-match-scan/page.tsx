"use client";
import { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';

interface ProgramForm {
  targetCountry: string;
  studyLevel: string;
  currentEducation: string;
  fieldOfStudy: string;
  gpa: string;
  englishLevel: string;
  budget: string;
  intake: string;
  experience: string;
  scholarship: string;
  documents: string;
}

export default function ProgramMatchPage() {
  const [form, setForm] = useState<ProgramForm>({
    targetCountry: '',
    studyLevel: '',
    currentEducation: '',
    fieldOfStudy: '',
    gpa: '',
    englishLevel: '',
    budget: '',
    intake: '',
    experience: '',
    scholarship: '',
    documents: '',
  });
  const [result, setResult] = useState<null | { percentage: number; strengths: string[]; weaknesses: string[]; recommendations: string[] }>(null);

  const handleChange = (key: keyof ProgramForm, value: string) => {
    setForm({ ...form, [key]: value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/analyze-program', {
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
        <h1 className="text-2xl font-semibold mb-4">Program Match</h1>
        <p className="muted-text mb-6">Fill in your academic and personal details to see how well you match your target study program.</p>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Target country</label>
              <input type="text" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.targetCountry} onChange={(e) => handleChange('targetCountry', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Study level</label>
              <select className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.studyLevel} onChange={(e) => handleChange('studyLevel', e.target.value)}>
                <option value="">Select</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Current education level</label>
              <input type="text" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.currentEducation} onChange={(e) => handleChange('currentEducation', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Field of study</label>
              <input type="text" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.fieldOfStudy} onChange={(e) => handleChange('fieldOfStudy', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">GPA or grade level</label>
              <input type="number" step="0.01" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.gpa} onChange={(e) => handleChange('gpa', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">English level</label>
              <select className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.englishLevel} onChange={(e) => handleChange('englishLevel', e.target.value)}>
                <option value="">Select</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Native">Native</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Budget range (USD)</label>
              <input type="text" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.budget} onChange={(e) => handleChange('budget', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Preferred intake</label>
              <input type="text" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.intake} onChange={(e) => handleChange('intake', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Work experience</label>
              <input type="text" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.experience} onChange={(e) => handleChange('experience', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Scholarship need</label>
              <select className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.scholarship} onChange={(e) => handleChange('scholarship', e.target.value)}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Available documents</label>
              <input type="text" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.documents} onChange={(e) => handleChange('documents', e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn-primary">Analyze Program Match</button>
        </form>
        {result && (
          <div className="mt-6 card">
            <h3 className="font-semibold mb-2">Results</h3>
            <p className="muted-text mb-2">Program fit: {result.percentage}%</p>
            {result.strengths.length > 0 && (
              <div className="mb-2">
                <p className="font-medium">Strengths:</p>
                <ul className="list-disc list-inside text-sm">
                  {result.strengths.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.weaknesses.length > 0 && (
              <div className="mb-2">
                <p className="font-medium">Weaknesses:</p>
                <ul className="list-disc list-inside text-sm">
                  {result.weaknesses.map((s, idx) => (
                    <li key={idx}>{s}</li>
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