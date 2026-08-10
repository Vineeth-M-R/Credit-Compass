import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Mic } from 'lucide-react';
import { getKeywordResponse } from './keywordEngine';

export default function ChatOverlay({ profile, isOpen, onClose }) {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState('STEP_0');
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Preset Card Definitions
  const autographJourneyCard = {
    title: "Autograph Journey®",
    subtitle: "WELLS FARGO AUTOGRAPH",
    benefits: [
      "5x points on hotels",
      "4x points on airlines",
      "3x points on restaurants and other travel"
    ],
    annualFee: "Includes a $100 annual fee"
  };

  const autographCard = {
    title: "Autograph® Card",
    subtitle: "WELLS FARGO AUTOGRAPH",
    benefits: [
      "3x points on dining, travel, gas & transit",
      "3x points on popular streaming services",
      "1x points on other purchases"
    ],
    annualFee: "No annual fee ($0)"
  };

  // Initialize Chat Flow
  React.useEffect(() => {
    if (isOpen) {
      setCurrentStep('STEP_0');
      setMessages([
        {
          id: 1,
          sender: 'bot',
          text: `Hi ${profile?.name || 'Alex'}! What can I help you with today?`,
          options: [
            "I am looking for a new credit card",
            "I am looking for a quick loan",
            "I am looking to explore options I have with V bank"
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

  const handleOptionSelect = (optionText) => {
    // Clear options from all previous messages so they disappear once clicked
    setMessages((prev) =>
      prev.map((msg) => ({
        ...msg,
        options: null
      }))
    );

    // Append user selection message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: optionText
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      processFlowLogic(optionText);
    }, 450);
  };

  const processFlowLogic = (userChoice) => {
    // -------------------------------------------------------------
    // STEP 0: Initial Greeting
    // -------------------------------------------------------------
    if (currentStep === 'STEP_0') {
      if (userChoice.includes("new credit card")) {
        // Flow-A proceeds
        setCurrentStep('STEP_1');
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: "Sure, will you mostly use the card for everyday spending, business expenses, or travel?",
            options: [
              "Everyday spending",
              "Business expenses",
              "Travel"
            ]
          }
        ]);
      } else {
        // User chooses loan or explore options -> respond appropriately and guide back to Flow-A
        let redirectionText = "";
        if (userChoice.includes("loan")) {
          redirectionText = "Quick loans are available with low interest rates! However, let's start by looking at your card options for your account.\n\nWill you mostly use a new card for everyday spending, business expenses, or travel?";
        } else {
          redirectionText = "V Bank offers checking, savings, loans, and reward cards. Let's explore credit card options first.\n\nWill you mostly use a card for everyday spending, business expenses, or travel?";
        }

        setCurrentStep('STEP_1');
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: redirectionText,
            options: [
              "Everyday spending",
              "Business expenses",
              "Travel"
            ]
          }
        ]);
      }
      return;
    }

    // -------------------------------------------------------------
    // STEP 1: Usage Category (Everyday / Business / Travel)
    // -------------------------------------------------------------
    if (currentStep === 'STEP_1') {
      if (userChoice.includes("Travel")) {
        // Suggestion 3 -> Flow-A proceeds
        setCurrentStep('STEP_2');
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: "Got it. Looks like travel is your top category, with most of your spending on flights and hotels. Dining, groceries and everyday purchases comes next.\n\nDoes that sound like a good picture of your spending?",
            options: [
              "Yes this sounds right",
              "Something looks incorrect"
            ]
          }
        ]);
      } else if (userChoice.includes("Everyday")) {
        // Suggestion 1 -> Flow-B (Everyday Rewards Card Flow)
        setCurrentStep('STEP_4');
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: "Got it. For everyday spending like groceries, dining out, and streaming, we have great cash rewards options.\n\nHere are two V bank cards that could be a good fit:\n\n• Autograph® Card — no annual fee\n• Autograph Journey® Card — includes a $100 annual fee and offers additional rewards\n\nHow do you feel about paying an annual fee for those added features?",
            options: [
              "Yes, I'm open to annual fee",
              "No, I'd rather avoid any fee",
              "Help me compare"
            ]
          }
        ]);
      } else {
        // Suggestion 2: Business expenses -> No recommendation, ask to explore URL
        setCurrentStep('STEP_1_NO_REC');
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: "We don't have a direct business card recommendation for your account profile right now. Please explore www.v-bank/creditcards.com for more options.\n\nWould you like to explore personal card options instead?",
            options: [
              "Everyday spending",
              "Travel"
            ]
          }
        ]);
      }
      return;
    }

    // If redirected from Business option back to personal options
    if (currentStep === 'STEP_1_NO_REC') {
      if (userChoice.includes("Travel")) {
        setCurrentStep('STEP_2');
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: "Got it. Looks like travel is your top category, with most of your spending on flights and hotels. Dining, groceries and everyday purchases comes next.\n\nDoes that sound like a good picture of your spending?",
            options: [
              "Yes this sounds right",
              "Something looks incorrect"
            ]
          }
        ]);
      } else {
        setCurrentStep('STEP_4');
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: "Got it. Based on what you've shared, here are two V bank cards that could be a good fit.\n\n• Autograph® Card — no annual fee\n• Autograph Journey® Card — includes a $100 annual fee and offers additional travel rewards and benefits\n\nHow do you feel about paying an annual fee for those added features?",
            options: [
              "Yes, I'm open to annual fee",
              "No, I'd rather avoid any fee",
              "Help me compare"
            ]
          }
        ]);
      }
      return;
    }

    // -------------------------------------------------------------
    // STEP 2: Confirm Spending Picture (Yes / Something looks incorrect)
    // -------------------------------------------------------------
    if (currentStep === 'STEP_2') {
      // User chooses suggestion 1 or 2 -> Keep response same
      setCurrentStep('STEP_3');
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: "Great. Lets find the rewards style that works for you. Which of these sounds most like you?",
          options: [
            "Travel + everyday rewards",
            "Maximise travel booking rewards",
            "Maximize hotel rewards"
          ]
        }
      ]);
      return;
    }

    // -------------------------------------------------------------
    // STEP 3: Rewards style choice
    // -------------------------------------------------------------
    if (currentStep === 'STEP_3') {
      // User can choose anything here -> Response remains same
      setCurrentStep('STEP_4');
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Got it based on what you've shared, here are two V bank cards that could be a good fit.\n\n• Autograph® Card — no annual fee\n• Autograph Journey® Card — includes a $100 annual fee and offers additional travel rewards and benefits\n\nHow do you feel about paying an annual fee for those added features?`,
          options: [
            "Yes, I'm open to annual fee",
            "No, I'd rather avoid any fee",
            "Help me compare"
          ]
        }
      ]);
      return;
    }

    // -------------------------------------------------------------
    // STEP 4: Annual Fee Preference
    // -------------------------------------------------------------
    if (currentStep === 'STEP_4') {
      if (userChoice.includes("Yes") || userChoice.includes("open")) {
        // Suggestion 1 -> Recommend Autograph Journey Card
        setCurrentStep('FINISHED');
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: "Sounds good. Based on your spending habits, the Autograph Journey® Card looks like a great fit.",
            isCardRecommendation: true,
            cardData: autographJourneyCard
          }
        ]);
      } else if (userChoice.includes("No") || userChoice.includes("avoid")) {
        // Suggestion 2 -> Recommend Autograph Card (no fee)
        setCurrentStep('FINISHED');
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: "Sounds good. Based on your spending habits, the Autograph® Card looks like a great fit.",
            isCardRecommendation: true,
            cardData: autographCard
          }
        ]);
      } else {
        // Suggestion 3 -> Help me compare (Side by Side comparison)
        setCurrentStep('FINISHED');
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: "Here is a side by side comparison of both cards to help you decide:",
            isSideBySideComparison: true,
            cardA: autographCard,
            cardB: autographJourneyCard
          }
        ]);
      }
      return;
    }

    // Default Fallback
    const responseText = getKeywordResponse(profile, userChoice);
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, sender: 'bot', text: responseText }
    ]);
  };

  const handleFreeInputSend = () => {
    if (!inputValue.trim()) return;

    // Clear options from all previous messages so they disappear once clicked/sent
    setMessages((prev) =>
      prev.map((msg) => ({
        ...msg,
        options: null
      }))
    );

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
      processFlowLogic(inputCopy);
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
        {/* Top Header Bar */}
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
                    return <p key={pIdx}>{paragraph}</p>;
                  })}

                  {/* Single Card Recommendation Widget */}
                  {msg.isCardRecommendation && (
                    <div className="mt-4 bg-[#F4F3EF] border border-[#E0DED7] rounded-3xl p-5 shadow-xs space-y-4">
                      <div className="flex flex-col items-center">
                        <div className="w-48 h-28 bg-gradient-to-r from-stone-900 via-stone-800 to-red-950 rounded-xl p-3 shadow-md text-white flex flex-col justify-between relative overflow-hidden">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-red-400">V BANK</span>
                            <span className="text-[8px] italic opacity-80">AUTOGRAPH</span>
                          </div>
                          <div className="w-6 h-4 bg-amber-400/80 rounded-xs" />
                          <div className="flex justify-between items-end">
                            <span className="text-[8px] font-mono tracking-widest text-stone-300">{profile?.name || 'ALEX'}</span>
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

                      <div className="flex space-x-2.5 pt-1">
                        <button className="flex-1 py-2.5 rounded-full border border-stone-900 text-stone-900 text-xs font-bold hover:bg-stone-200 transition-all">
                          View details
                        </button>
                        <button className="flex-1 py-2.5 rounded-full bg-stone-950 text-white text-xs font-bold hover:bg-stone-800 transition-all">
                          Apply now
                        </button>
                      </div>

                      <div className="text-center pt-1">
                        <a href="https://www.v-bank/creditcards.com" target="_blank" rel="noreferrer" className="text-xs text-purple-900 font-semibold underline hover:text-purple-700">
                          Explore other V Bank credit cards
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Side-by-Side Comparison Widget */}
                  {msg.isSideBySideComparison && (
                    <div className="mt-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {/* Card A (Autograph Card - No Fee) */}
                        <div className="bg-[#F4F3EF] border border-[#E0DED7] rounded-2xl p-3.5 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="w-full h-20 bg-stone-900 rounded-lg p-2 text-white flex flex-col justify-between mb-2">
                              <span className="text-[8px] font-bold text-red-400">V BANK</span>
                              <span className="text-[9px] font-mono">{msg.cardA.title}</span>
                            </div>
                            <h5 className="font-bold text-stone-900 text-xs mb-1.5">{msg.cardA.title}</h5>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-2">
                              {msg.cardA.annualFee}
                            </span>
                            <ul className="space-y-1 text-[11px] text-stone-700">
                              {msg.cardA.benefits.map((b, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="mr-1 font-bold">•</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button className="w-full mt-3 py-1.5 rounded-full bg-stone-950 text-white text-xs font-bold hover:bg-stone-800">
                            Apply
                          </button>
                        </div>

                        {/* Card B (Autograph Journey - $100 Fee) */}
                        <div className="bg-[#F4F3EF] border-2 border-purple-800 rounded-2xl p-3.5 shadow-xs flex flex-col justify-between relative">
                          <span className="absolute -top-2.5 right-3 bg-purple-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Recommended
                          </span>
                          <div>
                            <div className="w-full h-20 bg-gradient-to-r from-stone-900 via-stone-800 to-red-950 rounded-lg p-2 text-white flex flex-col justify-between mb-2">
                              <span className="text-[8px] font-bold text-red-400">V BANK</span>
                              <span className="text-[9px] font-mono">{msg.cardB.title}</span>
                            </div>
                            <h5 className="font-bold text-stone-900 text-xs mb-1.5">{msg.cardB.title}</h5>
                            <span className="text-[10px] font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded-md inline-block mb-2">
                              {msg.cardB.annualFee}
                            </span>
                            <ul className="space-y-1 text-[11px] text-stone-700">
                              {msg.cardB.benefits.map((b, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="mr-1 font-bold">•</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button className="w-full mt-3 py-1.5 rounded-full bg-purple-900 text-white text-xs font-bold hover:bg-purple-800">
                            Apply
                          </button>
                        </div>
                      </div>

                      <div className="text-center pt-1">
                        <a href="https://www.v-bank/creditcards.com" target="_blank" rel="noreferrer" className="text-xs text-purple-900 font-semibold underline hover:text-purple-700">
                          Explore other V Bank credit cards
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* User Chat Message Bubble */
                <div className="flex justify-end">
                  <div className="bg-[#DEDCD5] text-stone-900 rounded-full px-5 py-2.5 text-[14px] font-medium shadow-2xs max-w-[85%] text-right">
                    {msg.text}
                  </div>
                </div>
              )}

              {/* Quick Response Pill Bars */}
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
              Credit Compass is typing...
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
