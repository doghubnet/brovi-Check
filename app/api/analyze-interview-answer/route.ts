import { NextRequest, NextResponse } from 'next/server';

/**
 * Provides deterministic feedback on interview answers. Scores are based on
 * answer length and the presence of key phrases like "study", "career",
 * "sponsor" and "home". Suggestions encourage users to elaborate on
 * their motivations and plans.
 */
export async function POST(req: NextRequest) {
  const { question, answer } = await req.json();
  if (typeof answer !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const words = answer.trim().split(/\s+/);
  const lengthScore = Math.min(10, Math.floor(words.length / 10) + 1);
  const lower = answer.toLowerCase();
  const clarity = lengthScore;
  let consistency = 5;
  let confidence = 5;
  let purpose = 5;
  if (lower.includes('study') || lower.includes('learn')) purpose += 2;
  if (lower.includes('career') || lower.includes('future')) consistency += 2;
  if (lower.includes('confident') || lower.includes('prepared')) confidence += 2;
  // bound scores
  const clamp = (n: number) => Math.max(1, Math.min(10, n));
  const result = {
    clarity: clamp(clarity),
    consistency: clamp(consistency),
    confidence: clamp(confidence),
    purpose: clamp(purpose),
    suggestions: '' as string,
  };
  const suggestions: string[] = [];
  if (words.length < 30) suggestions.push('Provide more detail to demonstrate clarity and depth.');
  if (!lower.includes('career')) suggestions.push('Explain how this program aligns with your career goals.');
  if (!lower.includes('sponsor')) suggestions.push('Mention who will sponsor your studies and why.');
  if (!lower.includes('home')) suggestions.push('Describe your ties to your home country.');
  result.suggestions = suggestions.join(' ');
  return NextResponse.json(result);
}