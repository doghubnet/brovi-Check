import { NextRequest, NextResponse } from 'next/server';

/**
 * Combines module scores into an overall readiness score. Produces a
 * priority list indicating which areas need the most improvement.
 */
export async function POST(req: NextRequest) {
  const { scores } = await req.json();
  if (!scores || typeof scores !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const { document, program, finance, interview } = scores;
  const values = [Number(document), Number(program), Number(finance), Number(interview)];
  const overall = values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
  const priority: string[] = [];
  if (Number(document) < 80) priority.push('Improve document readiness');
  if (Number(program) < 80) priority.push('Find better program match');
  if (Number(finance) < 80) priority.push('Increase financial readiness');
  if (Number(interview) < 80) priority.push('Practice interview skills');
  return NextResponse.json({ overall, priority });
}