import { NextRequest, NextResponse } from 'next/server';

/**
 * Calculates a simple document readiness score based on the provided items.
 * Each item with status "Ready" contributes to the overall percentage.
 * Missing items and recommendations are returned for user guidance.
 */
export async function POST(req: NextRequest) {
  const { items } = await req.json();
  if (!Array.isArray(items)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const total = items.length;
  let readyCount = 0;
  const missing: string[] = [];
  const recommendations: string[] = [];
  items.forEach((item: { name: string; status: string }) => {
    if (item.status === 'Ready') {
      readyCount += 1;
    } else {
      missing.push(item.name);
      recommendations.push(`Prepare or update ${item.name}`);
    }
  });
  const percentage = total > 0 ? Math.round((readyCount / total) * 100) : 0;
  return NextResponse.json({ percentage, missing, recommendations });
}