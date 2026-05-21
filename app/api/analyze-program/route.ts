import { NextRequest, NextResponse } from 'next/server';

/**
 * Calculates a program fit score based on provided form data. The score is
 * determined by the proportion of fields that contain non‑empty values. Strengths
 * correspond to filled fields and weaknesses to missing ones. This deterministic
 * approach avoids sending sensitive data to external AI services.
 */
export async function POST(req: NextRequest) {
  const { form } = await req.json();
  if (!form || typeof form !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const entries = Object.entries(form) as [string, string][];
  const total = entries.length;
  let filled = 0;
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  entries.forEach(([key, value]) => {
    if (value && value.trim().length > 0) {
      filled += 1;
      strengths.push(key);
    } else {
      weaknesses.push(key);
    }
  });
  const percentage = total > 0 ? Math.round((filled / total) * 100) : 0;
  const recommendations = weaknesses.map((w) => `Provide more detail for ${w}`);
  return NextResponse.json({ percentage, strengths, weaknesses, recommendations });
}