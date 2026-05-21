"use client";
import { useState } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

/**
 * A floating chat widget that allows users to have simple conversations
 * with the Brovi Assistant. Messages are sent to the `/api/chat` route
 * which returns deterministic responses when no AI keys are configured.
 * The widget never blocks the page and can be toggled open or closed.
 */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hello! I am your Brovi Assistant. Ask me about preparing your visa application.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMessage: ChatMessage = { role: 'user', content: trimmed };
    const newMessages: ChatMessage[] = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.message }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="w-72 bg-white dark:bg-neutral-800 rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="bg-primary text-white px-4 py-2 flex justify-between items-center">
            <span>Brovi Assistant</span>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">✕</button>
          </div>
          <div className="flex-1 p-3 space-y-2 overflow-y-auto" style={{ maxHeight: '300px' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.role === 'user'
                    ? 'text-right'
                    : 'text-left'
                }
              >
                <div
                  className={
                    msg.role === 'user'
                      ? 'inline-block bg-secondary text-white rounded-lg px-3 py-1'
                      : 'inline-block bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 rounded-lg px-3 py-1'
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-block bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 rounded-lg px-3 py-1">
                  Thinking…
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-800 text-sm"
                placeholder="Type your message…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                type="button"
                className="btn-primary text-sm whitespace-nowrap"
                onClick={sendMessage}
                disabled={loading}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="btn-secondary rounded-full h-12 w-12 flex items-center justify-center shadow-lg"
          aria-label="Open chat"
        >
          💬
        </button>
      )}
    </div>
  );
}