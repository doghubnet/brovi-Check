"use client";
import { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';

const questions = [
  'Why do you want to study abroad?',
  'How will this program help your career?',
  'Who is sponsoring your studies?',
  'What ties do you have to your home country?',
];

interface InterviewResult {
  clarity: number;
  consistency: number;
  confidence: number;
  purpose: number;
  suggestions: string;
}

export default function InterviewPracticePage() {
  const [question, setQuestion] = useState(questions[0]);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<InterviewResult | null>(null);

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/analyze-interview-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer }),
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
        <h1 className="text-2xl font-semibold mb-4">Interview Practice</h1>
        <p className="muted-text mb-6">Choose a question, type your answer and get feedback on clarity, consistency, confidence and purpose.</p>
        <form onSubmit={handleAnalyze} className="space-y-4 max-w-3xl">
          <div>
            <label className="text-sm font-medium block mb-1">Select question</label>
            <select value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800">
              {questions.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Your answer</label>
            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" placeholder="Type your answer…" />
          </div>
          <button type="submit" className="btn-primary">Analyze Answer</button>
        </form>
        {result && (
          <div className="mt-6 card">
            <h3 className="font-semibold mb-2">Feedback</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="font-medium">Clarity</p>
                <p className="muted-text">{result.clarity}/10</p>
              </div>
              <div>
                <p className="font-medium">Consistency</p>
                <p className="muted-text">{result.consistency}/10</p>
              </div>
              <div>
                <p className="font-medium">Confidence</p>
                <p className="muted-text">{result.confidence}/10</p>
              </div>
              <div>
                <p className="font-medium">Purpose</p>
                <p className="muted-text">{result.purpose}/10</p>
              </div>
            </div>
            <p className="text-sm">{result.suggestions}</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}