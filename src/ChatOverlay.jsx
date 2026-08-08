import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Mic } from 'lucide-react';
import { getKeywordResponse } from './keywordEngine';

export default function ChatOverlay({ profile, isOpen, onClose }) {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Seed default insights list exact UI from screenshot when chat opens
  React.useEffect(() => {
    if (isOpen && profile) {
      const initialText = `I'll analyze your recent spending categories and travel expenses to gain a clearer understanding for you.\n\nHere's what I saw over the last year:\n\n• Travel was a top spending category, mainly on flights and hotels.\n• Dining expenses were frequent.\n• Many bookings came through travel sites.\n\nDoes this match your expected spending going forward?`;

      setMessages([
        {
          id: 1,
          sender: 'bot',
          text: initialText,
          options: [
            "Yes, this sounds right",
            "Something looks incorrect"
          ]
        }
      ]);
    }
  }, [isOpen, profile]);

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getKeywordResponse(profile, text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-[#EAE8E3] flex flex-col max-w-md mx-auto overflow-hidden font-sans select-none"
      >
        {/* Top Header Bar with back arrow & badge */}
        <div className="pt-10 px-5 pb-3 flex items-center justify-between bg-[#EAE8E3]">
          <button
            onClick={onClose}
            className="p-1 -ml-2 text-stone-900 hover:text-stone-600 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-7 h-7 stroke-[1.75]" />
          </button>

          {/* Insights / Travel Pill Badge top right */}
          <div className="flex items-center space-x-1 bg-[#F5F4F0] border border-[#DCDAD2] rounded-2xl px-3 py-1.5 shadow-xs">
            <span className="text-[13px] font-semibold text-stone-900 tracking-tight">Insights</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block -mt-2 -mr-0.5" />
            <span className="text-[11px] font-medium text-stone-400 block -mt-2">Travel</span>
          </div>
        </div>

        {/* Chat Content Body */}
        <div className="flex-1 overflow-y-auto px-6 pt-2 pb-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-4">
              {msg.sender === 'bot' ? (
                <div className="text-[15px] leading-relaxed text-stone-900 font-normal space-y-3">
                  {msg.text.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('•')) {
                      return (
                        <ul key={pIdx} className="space-y-2.5 my-2 pl-1">
                          {paragraph.split('\n').map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start">
                              <span className="mr-2 text-stone-800 font-bold">•</span>
                              <span className="text-stone-900">{bullet.replace('• ', '')}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={pIdx}>{paragraph}</p>;
                  })}
                </div>
              ) : (
                /* User Chat Message Bubble */
                <div className="flex justify-end">
                  <div className="bg-[#E2E0D8] text-stone-900 border border-stone-400/50 rounded-2xl px-4 py-2 text-[14px] font-medium shadow-xs">
                    {msg.text}
                  </div>
                </div>
              )}

              {/* Pill Option Buttons (e.g. Yes, this sounds right / Something looks incorrect) */}
              {msg.options && (
                <div className="flex flex-col items-end space-y-2.5 pt-2">
                  {msg.options.map((optionText, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleSend(optionText)}
                      className="px-5 py-2.5 rounded-full bg-[#EAE8E3] hover:bg-[#E2E0D8] border border-stone-900 text-stone-900 text-[14px] font-medium transition-all shadow-2xs active:scale-[0.98]"
                    >
                      {optionText}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="text-stone-500 text-sm italic font-medium">
              LEXA is thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar pinned to bottom */}
        <div className="p-5 bg-[#EAE8E3] flex items-center justify-between">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex-1 mr-3"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Start chatting"
              className="w-full bg-transparent border-none text-[16px] text-stone-900 placeholder-stone-500 focus:outline-none font-normal"
            />
          </form>

          {/* Microphone Icon Button in Circle */}
          <button
            onClick={() => handleSend()}
            className="w-10 h-10 rounded-full border border-indigo-950/60 bg-transparent flex items-center justify-center text-indigo-950 hover:bg-indigo-950 hover:text-white transition-colors shrink-0"
            aria-label="Voice input or send"
          >
            <Mic className="w-5 h-5 stroke-[1.75]" />
          </button>
        </div>

        {/* Home Indicator Bar at bottom (iPhone feel) */}
        <div className="pb-2 flex justify-center bg-[#EAE8E3]">
          <div className="w-32 h-1 bg-stone-900 rounded-full opacity-80" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
