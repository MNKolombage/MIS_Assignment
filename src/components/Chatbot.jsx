"use client"

import { useEffect, useRef, useState } from 'react'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: 'Hi! I\'m Nisala Bot. How can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, open])

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    const userMsg = { id: Date.now(), from: 'user', text }
    setMessages((m) => [...m, userMsg])
    setInput('')

    // mock bot reply
    setTyping(true)
    setTimeout(() => {
      const reply = generateReply(text)
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'bot', text: reply }])
      setTyping(false)
    }, 800 + Math.random() * 700)
  }

  function generateReply(text) {
    const t = text.toLowerCase()
    if (t.includes('price') || t.includes('cost')) return 'Our prices vary by season — check the Rates section or tell me your dates and party size.'
    if (t.includes('book') || t.includes('reserve')) return 'You can book on the website — tell me your preferred dates and I can check availability.'
    if (t.includes('hello') || t.includes('hi')) return 'Hello! How can I help you today?'
    if (t.includes('thanks') || t.includes('thank')) return "You're welcome — happy to help!"
    return "I'm here to help — can you give me more details?"
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div className="flex items-end">
        {open && (
          <div className="w-80 max-w-xs bg-white border rounded-lg shadow-lg flex flex-col overflow-hidden">
            <div className="px-4 py-3 bg-rose-700 text-white font-semibold">Nisala Assistant</div>
            <div ref={listRef} className="p-3 space-y-2 h-56 overflow-y-auto bg-gray-50">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${m.from === 'user' ? 'bg-rose-700 text-white' : 'bg-white text-gray-800 border'} px-3 py-2 rounded-lg max-w-full`}>{m.text}</div>
                </div>
              ))}
              {typing && (
                <div className="text-sm text-gray-500">Nisala is typing...</div>
              )}
            </div>
            <div className="p-2 border-t">
              <div className="flex items-center">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={1}
                  className="resize-none flex-1 border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring"
                  placeholder="Write a message..."
                  aria-label="Chat message"
                />
                <button onClick={sendMessage} className="ml-2 bg-rose-700 text-white px-3 py-1 rounded-md">Send</button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open chat"
          className="ml-3 bg-rose-700 hover:bg-rose-800 text-white p-3 rounded-full shadow-lg"
        >
          {open ? '✕' : '💬'}
        </button>
      </div>
    </div>
  )
}
