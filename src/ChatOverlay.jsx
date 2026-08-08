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

  // Pre-loaded structured conversation steps based on exact user screenshots
  const conversationTree = {
    // Step 0 (Initial greeting)
    0: {
      text: `Hi ${profile?.name || 'Alex'}! What can I help you with today?`,
      options: ["I'm looking for a new credit card."]
    },
    // Step 1
    1: {
      text: "Sure. Will you mostly use the card for everyday spending, business expenses, or travel?",
      options: ["Travel, mostly"]
    },
    // Step 2
    2: {
      text: "Got it. Looks like travel is your top category, with most of your spending on flights and hotels. Dining, groceries, and everyday purchases come next.\n\nDoes that sound like a good picture of your spending?",
      options: ["Yes, this sounds right", "Something looks incorrect"]
    },
    // Step 3
    3: {
      text: "Great. Let's find the rewards style that works for you. Which of these sounds most like you?",
      options: [
        "Travel + everyday rewards",
        "Maximise travel booking rewards",
        "Maximise hotel rewards"
      ]
    },
    // Step 4
    4: {
      text: `Got it. Based on what you've shared, here are two Wells Fargo cards that could be a good fit.\n\n• Autograph® Card — no annual fee\n• Autograph Journey® Card — includes a $95 annual fee and offers additional travel rewards and benefits\n\nHow do you feel about paying an annual fee for those added features?`,
      options: [
        "Yes, I'm open to an annual fee",
        "No, I'd rather avoid any fee",
        "Help me compare"
      ]
    },
    // Step 5 (Final recommendation card)
    5: {
      text: "Sounds good. Based on your spending habits, the Autograph Journey® Card looks like a great fit.",
      isCardRecommendation: true,
      cardData: {
        title: "Autograph Journey®",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=400", // card thumbnail
        benefits: [
          "5x points on hotels",
          "4x points on airlines",
          "3x points on restaurants and other travel"
        ],
        annualFee: "Includes a $95 annual fee"
      }
    }
  };

  // Track conversation step state
  const [stepIndex, setStepIndex] = React.useState(0);

  React.useEffect(() => {
    if (isOpen) {
      setStepIndex(0);
      setMessages([
        {
          id: 1,
          sender: 'bot',
          text: conversationTree[0].text,
          options: conversationTree[0].options
        }
      ]);
    }
  }, [isOpen, profile]);

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleOptionSelect = (optionText) => {
    const nextStep = stepIndex + 1;

    // Add User message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: optionText
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setStepIndex(nextStep);

      if (conversationTree[nextStep]) {
        const step = conversationTree[nextStep];
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: step.text,
          options: step.options,
          isCardRecommendation: step.isCardRecommendation,
          cardData: step.cardData
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        // Fallback or generic keyword response after flow completes
        const responseText = getKeywordResponse(profile, optionText);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: 'bot', text: responseText }
        ]);
      }
    }, 450);
  };

  const handleFreeInputSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputValue
    };

    setMessages((prev) => [...prev, userMsg]);
    const inputCopy = inputValue;
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      // Auto-advance if input matches initial prompt intent
      if (stepIndex === 0 && inputCopy.toLowerCase().includes("credit card")) {
        handleOptionSelect(inputCopy);
      } else {
        const responseText = getKeywordResponse(profile, inputCopy);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: 'bot', text: responseText }
        ]);
      }
    }, 450);
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

          {/* Insights Badge top right */}
          <div className="flex items-center space-x-1">
            <span className="text-[14px] font-medium text-stone-900 tracking-tight">Insights</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
          </div>
        </div>

        {/* Chat Content Body */}
        <div className="flex-1 overflow-y-auto px-6 pt-2 pb-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-4">
              {msg.sender === 'bot' ? (
                <div className="text-[15px] leading-relaxed text-stone-900 font-normal space-y-3">
                  {msg.text.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.includes('Autograph® Card') || paragraph.includes('Autograph Journey® Card')) {
                      return (
                        <div key={pIdx} className="space-y-2.5 my-2 pl-1">
                          {paragraph.split('\n').map((line, lIdx) => {
                            if (line.startsWith('•')) {
                              const [title, desc] = line.split(' — ');
                              return (
                                <p key={lIdx} className="text-stone-900">
                                  <span className="font-bold">• {title.replace('• ', '')}</span> — {desc}
                                </p>
                              );
                            }
                            return <p key={lIdx}>{line}</p>;
                          })}
                        </div>
                      );
                    }
                    if (paragraph.includes('Autograph Journey®')) {
                      const parts = paragraph.split('Autograph Journey®');
                      return (
                        <p key={pIdx}>
                          {parts[0]}
                          <span className="font-bold">Autograph Journey®</span>
                          {parts[1]}
                        </p>
                      );
                    }
                    return <p key={pIdx}>{paragraph}</p>;
                  })}

                  {/* Recommendation Card Component */}
                  {msg.isCardRecommendation && (
                    <div className="mt-4 bg-[#F4F3EF] border border-[#E0DED7] rounded-3xl p-5 shadow-xs space-y-4">
                      {/* Card Visual Graphic */}
                      <div className="flex flex-col items-center">
                        <div className="w-48 h-28 bg-gradient-to-r from-stone-900 via-stone-800 to-red-950 rounded-xl p-3 shadow-md text-white flex flex-col justify-between relative overflow-hidden">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-red-400">WELLS FARGO</span>
                            <span className="text-[8px] italic opacity-80">AUTOGRAPH</span>
                          </div>
                          <div className="w-6 h-4 bg-amber-400/80 rounded-xs" />
                          <div className="flex justify-between items-end">
                            <span className="text-[8px] font-mono tracking-widest text-stone-300">MARY WELLS</span>
                            <span className="text-[10px] font-bold tracking-tighter">VISA</span>
                          </div>
                        </div>
                        <h4 className="font-bold text-stone-900 text-sm mt-3">{msg.cardData.title}</h4>
                      </div>

                      <div className="border-t border-[#E2E0D8] pt-3">
                        <h5 className="font-bold text-stone-900 text-xs mb-2">Key benefits:</h5>
                        <ul className="space-y-1.5 text-xs text-stone-800">
                          {msg.cardData.benefits.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-start">
                              <span className="mr-2 font-bold">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-stone-600 mt-3 font-medium">{msg.cardData.annualFee}</p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex space-x-2.5 pt-1">
                        <button className="flex-1 py-2.5 rounded-full border border-stone-900 text-stone-900 text-xs font-bold hover:bg-stone-200 transition-all">
                          View details
                        </button>
                        <button className="flex-1 py-2.5 rounded-full bg-stone-950 text-white text-xs font-bold hover:bg-stone-800 transition-all">
                          Apply now
                        </button>
                      </div>

                      <div className="text-center pt-1">
                        <button className="text-xs text-purple-900 font-semibold underline hover:text-purple-700">
                          Explore other Wells Fargo credit cards
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* User Chat Message Bubble - Light Grey Pill shape exact match */
                <div className="flex justify-end">
                  <div className="bg-[#DEDCD5] text-stone-900 rounded-full px-5 py-2.5 text-[14px] font-medium shadow-2xs max-w-[85%] text-right">
                    {msg.text}
                  </div>
                </div>
              )}

              {/* Exact Quick Response Pill Bars (Black outline rounded buttons) */}
              {msg.options && (
                <div className="flex flex-col items-end space-y-2.5 pt-2">
                  {msg.options.map((optionText, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(optionText)}
                      className="px-5 py-2.5 rounded-full bg-[#EAE8E3] hover:bg-[#E2E0D8] border border-stone-900 text-stone-900 text-[14px] font-medium transition-all shadow-2xs active:scale-[0.98] cursor-pointer"
                    >
                      {optionText}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="text-stone-500 text-xs italic font-medium pt-1">
              LEXA is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar pinned to bottom */}
        <div className="p-5 bg-[#EAE8E3] flex items-center justify-between">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFreeInputSend();
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

          {/* Microphone Icon Button */}
          <button
            onClick={() => handleFreeInputSend()}
            className="w-10 h-10 rounded-full border border-indigo-950/60 bg-transparent flex items-center justify-center text-indigo-950 hover:bg-indigo-950 hover:text-white transition-colors shrink-0"
            aria-label="Voice input or send"
          >
            <Mic className="w-5 h-5 stroke-[1.75]" />
          </button>
        </div>

        {/* Home Indicator Bar */}
        <div className="pb-2 flex justify-center bg-[#EAE8E3]">
          <div className="w-32 h-1 bg-stone-900 rounded-full opacity-80" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
