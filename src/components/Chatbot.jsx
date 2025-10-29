"use client"

import { useEffect, useRef, useState } from 'react'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: "Welcome to Nisala Villa — I'm Nisala Assistant! I can help with bookings, rooms, dining, amenities and more." },
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

  function sendQuickReply(text) {
    const t = String(text).trim()
    if (!t) return
    const userMsg = { id: Date.now(), from: 'user', text: t }
    setMessages((m) => [...m, userMsg])

    // mock bot reply for quick replies
    setTyping(true)
    setTimeout(() => {
      const reply = generateReply(t)
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'bot', text: reply }])
      setTyping(false)
    }, 500 + Math.random() * 600)
  }

  function generateReply(text) {
    const t = text.toLowerCase()
    // bookings / availability
    if (t.includes('book') || t.includes('reserve') || t.includes('availability')) return "Great — I'd love to help you book! Tell me your preferred check-in and check-out dates, number of guests, and any special requests. "

    // rooms / villas
    if (t.includes('room') || t.includes('villa') || t.includes('suite') || t.includes('accommodation')) return "Our villas combine privacy with comfort — sea views, private terraces, and thoughtful amenities. Tell me dates and guest count and I can check options and nightly rates."

    // prices / rates / offers
    if (t.includes('price') || t.includes('cost') || t.includes('rate') || t.includes('price') ) return "Rates change by season and room type. If you share dates and number of guests I can provide an estimated rate and any active offers or packages. "

  // dining / restaurant
  if (t.includes('dine') || t.includes('restaurant') || t.includes('breakfast') || t.includes('menu')) return "We offer farm-to-table dining with fresh local ingredients. Breakfast is included for most packages — we also have dinner and special chef's menus on request. Would you like today's menu or to reserve a table?"

  // spa / wellness - NOT available on-site
  if (t.includes('spa') || t.includes('massage') || t.includes('wellness') || t.includes('treatment')) return "We do not have a spa on-site. We can recommend trusted local therapists or arrange in-room treatments on request; tell me what you'd like and I can check availability."

  // pool / beach / amenities
    if (t.includes('pool') || t.includes('beach') || t.includes('wifi') || t.includes('amenit')) return "Amenities include a freshwater pool, complimentary Wi‑Fi, daily housekeeping, and concierge services. If you need airport transfers or equipment for activities, I can arrange that too. "

    

    // transport / transfers
    if (t.includes('airport') || t.includes('transfer') || t.includes('taxi') || t.includes('pick up')) return "We can arrange airport pick-ups and private transfers on request. Tell me your flight details and arrival time and I'll check availability and pricing. "

    // cancellation / policy
    if (t.includes('cancel') || t.includes('cancellation') || t.includes('policy')) return "Our cancellation policy depends on the rate you choose. Flexible and non‑refundable options are available — share your dates and I can show the policy for that booking."
        if (t.includes('park') || t.includes('parking')) return "Complimentary on-site parking is available for guests. "
    if (t.includes('access') || t.includes('wheelchair') || t.includes('accessible')) return "We try to accommodate accessibility needs — tell me what you require and I'll help find the best option. "


  // offers / packages / long stay
  if (t.includes('offer') || t.includes('package') || t.includes('discount') || t.includes('deal')) return "We run seasonal packages and long-stay discounts. Share your dates and length of stay and I'll check current promotions."

  // events / meetings (note: weddings not organized)
  if (t.includes('event') || t.includes('conference') || t.includes('meeting')) return "We can assist with small private meetings and gatherings. Tell me the date and expected guest count and I will check availability and options."
  if (t.includes('wedding')) return "We do not organize weddings at Nisala Villa. If you need recommendations for wedding venues nearby, I can suggest options."

  // pets / parking / accessibility
  if (t.includes('pet') || t.includes('pets')) return "Pets are not allowed at Nisala Villa."
  if (t.includes('park') || t.includes('parking')) return "Complimentary on-site parking is available for guests."
  if (t.includes('access') || t.includes('wheelchair') || t.includes('accessible')) return "We try to accommodate accessibility needs — tell me what you require and I'll help find the best option."

  // location / directions
  if (t.includes('where') || t.includes('located') || t.includes('direction') || t.includes('how to get')) return "Nisala Villa is located near Hikkaduwa, Galle. I can provide directions, recommended transfer times, and tips for getting here — which airport or city are you coming from?"

  // contact / phone / email
  if (t.includes('phone') || t.includes('call') || t.includes('email') || t.includes('contact')) return "You can reach our reservations team at +94 77 688 9958 or email info@nisalavillahikkaduwa.com"

    // greetings / thanks
    if (t.includes('hello') || t.includes('hi') || t.includes('hey')) return "Hello there! I'm Nisala Assistant — how can I make your stay special today?"
    if (t.includes('thanks') || t.includes('thank')) return "You're very welcome — happy to help! If you need anything else, just ask. "

    // fallback with suggested topics
    return "I'd love to help. How can I assist you today?"
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
          <div className="w-96 max-w-sm bg-white border rounded-lg shadow-xl flex flex-col overflow-hidden transition-transform">
            <div className="px-4 py-3 bg-gradient-to-r from-rose-600 to-rose-700 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Nisala Assistant</div>
                  <div className="text-xs text-rose-100 opacity-90">Ask about rooms, bookings or dining</div>
                </div>
              </div>
            </div>
            <div ref={listRef} className="p-3 space-y-3 h-72 overflow-y-auto bg-gray-50">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${m.from === 'user' ? 'bg-rose-800 text-white' : 'bg-white text-gray-800 border shadow-sm'} px-4 py-2 rounded-2xl max-w-[85%] break-words`}>{m.text}</div>
                </div>
              ))}
              {typing && (
                <div className="text-sm text-gray-500">Nisala is typing...</div>
              )}
            </div>
            <div className="px-3 pt-2 pb-3 border-t bg-white">
              {/* quick replies */}
              <div className="flex flex-wrap gap-2 pb-2">
                <button onClick={() => sendQuickReply('Book')} className="text-xs px-3 py-1 bg-gray-100 rounded-full border">Book</button>
                <button onClick={() => sendQuickReply('Rooms')} className="text-xs px-3 py-1 bg-gray-100 rounded-full border">Rooms</button>
                <button onClick={() => sendQuickReply('Dining')} className="text-xs px-3 py-1 bg-gray-100 rounded-full border">Dining</button>
                <button onClick={() => sendQuickReply('Contact')} className="text-xs px-3 py-1 bg-gray-100 rounded-full border">Contact</button>
              </div>

              <div className="flex items-center gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={2}
                  className="resize-none flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rose-600"
                  placeholder="Write a message..."
                  aria-label="Chat message"
                />
                <button onClick={sendMessage} className="ml-2 bg-rose-800 hover:bg-rose-900 text-white px-4 py-2 rounded-lg">Send</button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close chat' : 'Open chat'}
          className="ml-3 bg-rose-700 hover:bg-rose-800 text-white px-3 py-2 rounded-full shadow-lg flex items-center justify-center"
        >
          {open ? (
            // close icon (keeps an icon visible when open)
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 6l12 12" />
                <path d="M6 18L18 6" />
              </svg>
              <span className="sr-only">Close</span>
            </>
          ) : (
            // chat bubble icon (keeps an icon visible when closed)
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 10h.01M12 10h.01M16 10h.01" strokeLinecap="round" />
              </svg>
              <span className="sr-only">Chat</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
