"use client";
import { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';

interface ReviewForm {
  type: string;
  urgency: string;
  notes: string;
  contact: string;
}

export default function ConsultantReviewPage() {
  const [form, setForm] = useState<ReviewForm>({ type: '', urgency: '', notes: '', contact: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (key: keyof ReviewForm, value: string) => {
    setForm({ ...form, [key]: value });
  };
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In Round 1 we simply acknowledge submission
    setSubmitted(true);
  }
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Consultant Review</h1>
        <p className="muted-text mb-6">Request a professional review of your readiness. Our team will contact you soon.</p>
        {submitted ? (
          <div className="card">
            <p className="font-medium mb-2">Thank you! Your request has been submitted.</p>
            <p className="muted-text text-sm">We’ll reach out using your preferred contact method.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <div>
              <label className="text-sm font-medium block mb-1">Review type</label>
              <select className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.type} onChange={(e) => handleChange('type', e.target.value)}>
                <option value="">Select</option>
                <option value="Document">Document</option>
                <option value="Program">Program</option>
                <option value="Finance">Finance</option>
                <option value="Interview">Interview</option>
                <option value="Full">Full report</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Urgency</label>
              <select className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.urgency} onChange={(e) => handleChange('urgency', e.target.value)}>
                <option value="">Select</option>
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Notes</label>
              <textarea className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" rows={3} value={form.notes} onChange={(e) => handleChange('notes', e.target.value)} placeholder="Provide any additional information here…"></textarea>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Preferred contact method</label>
              <select className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800" value={form.contact} onChange={(e) => handleChange('contact', e.target.value)}>
                <option value="">Select</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
              </select>
            </div>
            <p className="text-xs muted-text">By submitting this request you agree that a consultant may contact you for further information. This is not legal advice.</p>
            <button type="submit" className="btn-primary">Submit Request</button>
          </form>
        )}
      </div>
    </ProtectedRoute>
  );
}