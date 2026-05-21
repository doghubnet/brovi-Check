import { NextRequest, NextResponse } from 'next/server';
import { env } from '../../../lib/env';

/**
 * Simple chat endpoint for the Brovi Assistant. This deterministic fallback
 * provides basic responses based on the latest user message. No external
 * AI services are used in Round 1 to avoid leaking sensitive data. When
 * server‑side AI keys are configured in future rounds the assistant may
 * query Gemini or OpenRouter here.
 */
export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ message: 'Hello! Ask me about your visa preparation.' });
  }
  const last = messages[messages.length - 1];
  const userContent = typeof last.content === 'string' ? last.content.toLowerCase() : '';
  let reply = 'I am here to help with your visa preparation. Please ask about document readiness, study programs, finances or interviews.';
  if (userContent.includes('hello') || userContent.includes('hi')) {
    reply = 'Hello! How can I assist you with your visa preparation today?';
  } else if (userContent.includes('document')) {
    reply = 'For document readiness, ensure your passport, certificates and financial proofs are up to date. Use the document scan feature for a detailed checklist.';
  } else if (userContent.includes('program')) {
    reply = 'To find a good program match, consider your academic background, budget and career goals. The program match scan will provide a personalised fit percentage.';
  } else if (userContent.includes('finance') || userContent.includes('bank')) {
    reply = 'Financial readiness involves showing sufficient funds and clear sponsorship. Our finance readiness scan reviews balances and proof requirements.';
  } else if (userContent.includes('interview')) {
    reply = 'Interview preparation is key. Practise common questions and make sure your answers are clear, consistent and confident. The interview practice module can help.';
  }
  return NextResponse.json({ message: reply });
}