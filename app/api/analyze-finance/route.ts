import { NextRequest, NextResponse } from 'next/server';

/**
 * Determines financial readiness by comparing balances against estimated costs.
 * Also flags risks when expenses exceed income or when key fields are empty.
 */
export async function POST(req: NextRequest) {
  const { form } = await req.json();
  if (!form || typeof form !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const missing: string[] = [];
  const riskFlags: string[] = [];
  const recs: string[] = [];
  // gather numeric values
  const tuition = parseFloat(form.tuition || '0');
  const living = parseFloat(form.living || '0');
  const closing = parseFloat(form.closing || '0');
  const income = parseFloat(form.income || '0');
  const expense = parseFloat(form.expense || '0');
  // identify missing
  Object.entries(form).forEach(([k, v]) => {
    if (!v || v.toString().trim().length === 0) {
      missing.push(k);
    }
  });
  // compute readiness
  const required = tuition + living;
  const percentage = required > 0 ? Math.min(100, Math.round((closing / required) * 100)) : 0;
  // risk flags
  if (income && expense && Number(expense) > Number(income)) {
    riskFlags.push('Expenses exceed income');
  }
  if (closing < required) {
    riskFlags.push('Balance below required funds');
  }
  missing.forEach((m) => recs.push(`Provide or verify ${m}`));
  return NextResponse.json({ percentage, riskFlags, missing, recommendations: recs });
}