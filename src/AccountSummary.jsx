import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { profiles } from './profileData';
import ChatOverlay from './ChatOverlay';
import {
  Search,
  Bell,
  ChevronRight,
  Home,
  ArrowDownLeft,
  ArrowRightLeft,
  Compass,
  Menu
} from 'lucide-react';

export default function AccountSummary({ currentProfile, onLogout }) {
  const { profile: profileParam } = useParams();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const activeProfile = profiles[profileParam] || currentProfile || profiles.taylor;

  return (
    <div className="min-h-screen bg-[#ECEAE4] text-stone-900 flex flex-col max-w-md mx-auto relative shadow-2xl font-sans pb-16">
      
      {/* Top Mobile Header (Search "Need help?", Violet LEXA Badge, Bell, Sign off) */}
      <header className="pt-4 px-4 pb-3 flex items-center justify-between bg-[#ECEAE4]">
        {/* "Need help?" Search button with adjacent violet icon */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center space-x-2 bg-white border border-[#D5D3CB] rounded-full px-3 py-1.5 shadow-2xs hover:border-purple-400 transition-all cursor-pointer group"
        >
          <Search className="w-4 h-4 text-stone-400 group-hover:text-purple-600 transition-colors" />
          <span className="text-xs text-stone-500 font-medium group-hover:text-stone-800 transition-colors">Need help?</span>
          
          {/* Violet LEXA Icon Badge */}
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs ml-1 font-bold text-xs">
            <span className="tracking-tighter">e</span>
          </div>
        </button>

        {/* Right Nav Options (Notification Bell + Sign off) */}
        <div className="flex items-center space-x-3">
          <button className="text-stone-700 hover:text-stone-950 p-1">
            <Bell className="w-5 h-5 stroke-[1.75]" />
          </button>
          <button
            onClick={() => {
              onLogout();
              navigate('/');
            }}
            className="text-xs text-stone-800 font-semibold hover:text-stone-950 transition-colors"
          >
            Sign off
          </button>
        </div>
      </header>

      {/* Greeting Title */}
      <div className="px-5 pt-3 pb-4">
        <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">
          Good evening, {activeProfile.name}
        </h1>
      </div>

      {/* Main Content Area */}
      <main className="px-4 space-y-3.5 flex-1">

        {/* 1. EVERYDAY CHECKING Card */}
        <div className="bg-white border border-[#E0DDD5] rounded-2xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-stone-500 tracking-wider uppercase mb-1">
            {activeProfile.checking.accountName} ...{activeProfile.checking.last4}
          </div>
          <div className="text-2xl font-semibold text-stone-900 tracking-tight mb-0.5">
            ${activeProfile.checking.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-stone-500 font-normal">
            Available balance
          </div>
        </div>

        {/* 2. CREDIT CARD Card */}
        <div className="bg-white border border-[#E0DDD5] rounded-2xl p-4 shadow-xs">
          <div className="text-[11px] font-bold text-stone-500 tracking-wider uppercase mb-1 truncate pr-2">
            {activeProfile.creditCard.accountName} ...{activeProfile.creditCard.last4}
          </div>
          <div className="text-2xl font-semibold text-stone-900 tracking-tight mb-0.5">
            ${activeProfile.creditCard.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-stone-500 font-normal">
            Outstanding balance
          </div>
        </div>

        {/* 3. Open an account section */}
        <div className="bg-white border border-[#E0DDD5] rounded-2xl p-4 shadow-xs">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-stone-900">Open an account</span>
            <button className="text-xs font-semibold text-purple-900 hover:text-purple-700 flex items-center">
              Explore all <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center pt-1">
            {/* Checking */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-xl mb-1 group-hover:scale-105 transition-transform">
                💳
              </div>
              <span className="text-xs font-medium text-stone-800">Checking</span>
            </div>

            {/* Savings & CDs */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl mb-1 group-hover:scale-105 transition-transform">
                🪙
              </div>
              <span className="text-[11px] font-medium text-stone-800 leading-tight">Savings & CDs</span>
            </div>

            {/* Credit cards */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-xl mb-1 group-hover:scale-105 transition-transform">
                🧧
              </div>
              <span className="text-xs font-medium text-stone-800">Credit cards</span>
            </div>

            {/* Mortgages & Loans */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl mb-1 group-hover:scale-105 transition-transform">
                🏡
              </div>
              <span className="text-[11px] font-medium text-stone-800 leading-tight">Mortgages & Loans</span>
            </div>
          </div>
        </div>

        {/* 4. FICO Score Card */}
        <div className="bg-white border border-[#E0DDD5] rounded-2xl p-4 shadow-xs flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-emerald-200 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-stone-900">{activeProfile.ficoScore.score}</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 leading-snug">
              {activeProfile.ficoScore.changeText}
            </h4>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Updated {activeProfile.ficoScore.updatedDate}
            </p>
          </div>
        </div>

        {/* 5. Horizontal Promo Banners Carousel */}
        <div className="flex space-x-3 overflow-x-auto no-scrollbar pt-1 pb-2">
          <div className="min-w-[200px] bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-2xl p-3.5 shrink-0 shadow-xs flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Special Offer</span>
            <div className="font-bold text-xs mt-2">60K bonus pts</div>
          </div>
          <div className="min-w-[200px] bg-stone-900 text-white rounded-2xl p-3.5 shrink-0 shadow-xs flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Refinance Rates</span>
            <div className="font-bold text-xs mt-2">Low APR Guarantee</div>
          </div>
        </div>
      </main>

      {/* Bottom Sticky Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#F5F4F0] border-t border-[#DCDAD2] py-2 px-3 flex justify-around items-center z-40">
        <button className="flex flex-col items-center text-red-700">
          <Home className="w-5 h-5 fill-current" />
          <span className="text-[10px] font-bold mt-0.5">Accounts</span>
        </button>

        <button className="flex flex-col items-center text-stone-600 hover:text-stone-950">
          <ArrowDownLeft className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Deposit</span>
        </button>

        <button className="flex flex-col items-center text-stone-600 hover:text-stone-950">
          <div className="w-5 h-5 rounded-full border border-stone-600 flex items-center justify-center font-bold text-[10px]">
            $
          </div>
          <span className="text-[10px] font-medium mt-0.5">Pay & Transfer</span>
        </button>

        <button className="flex flex-col items-center text-stone-600 hover:text-stone-950">
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Explore</span>
        </button>

        <button className="flex flex-col items-center text-stone-600 hover:text-stone-950">
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Menu</span>
        </button>
      </nav>

      {/* Chat Overlay triggered on click of "Need help?" or violet icon */}
      <ChatOverlay
        profile={activeProfile}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}
