import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { profiles } from './profileData';
import ChatOverlay from './ChatOverlay';
import BottomNav from './BottomNav';
import { Sparkles, Mic, Plane, Percent, Star, DollarSign } from 'lucide-react';

export default function Explore({ currentProfile }) {
  const { profile: profileParam } = useParams();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const activeProfile = profiles[profileParam] || currentProfile || profiles.alex;

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-stone-900 flex flex-col max-w-md mx-auto relative shadow-2xl font-sans pb-24">
      
      {/* Main Content */}
      <main className="flex-1">
        
        {/* Header Section */}
        <div className="px-6 pt-10 pb-6 text-center">
          <h1 className="text-3xl font-light text-stone-800 leading-tight">
            Apply for a credit card that<br />fits your life
          </h1>
        </div>

        {/* Chat Widget Section */}
        <div className="px-4 mb-6">
          <div 
            onClick={() => setIsChatOpen(true)}
            className="bg-white rounded-3xl p-5 shadow-sm border border-stone-100 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-700" />
              <h2 className="text-[17px] font-bold text-stone-900">Have a question? Let's chat.</h2>
            </div>
            
            <div className="flex items-center bg-[#F2F2F2] rounded-full px-4 py-2.5 mb-4">
              <span className="flex-1 text-stone-500 text-sm">Ask me anything about credit cards</span>
              <Mic className="w-5 h-5 text-stone-700" />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
              <button className="bg-[#F2F2F2] text-stone-700 text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap">
                Which card is best for me?
              </button>
              <button className="bg-[#F2F2F2] text-stone-700 text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap">
                I'm looking for
              </button>
            </div>
          </div>
        </div>

        {/* Categories / Tabs */}
        <div className="flex justify-between px-6 mb-6 border-b border-stone-200 pb-2">
          <div className="flex flex-col items-center border-b-2 border-yellow-400 pb-2 px-2 -mb-[9px]">
            <div className="border border-stone-800 p-1 mb-1 rounded-sm">
              <DollarSign className="w-5 h-5 text-stone-800" strokeWidth={1.5} />
            </div>
            <span className="text-[11px] font-bold text-stone-900">Cash back</span>
            <span className="text-[11px] font-bold text-stone-900">(1)</span>
          </div>
          
          <div className="flex flex-col items-center pb-2 px-2 text-stone-500">
            <Star className="w-6 h-6 mb-1" strokeWidth={1.5} />
            <span className="text-[11px] font-medium">Rewards</span>
            <span className="text-[11px] font-medium">(5)</span>
          </div>

          <div className="flex flex-col items-center pb-2 px-2 text-stone-500">
            <div className="border border-stone-500 rounded-full p-0.5 mb-1">
              <Percent className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <span className="text-[11px] font-medium">Low intro</span>
            <span className="text-[11px] font-medium">rate (3)</span>
          </div>

          <div className="flex flex-col items-center pb-2 px-2 text-stone-500">
            <Plane className="w-6 h-6 mb-1" strokeWidth={1.5} />
            <span className="text-[11px] font-medium">Travel</span>
            <span className="text-[11px] font-medium">(4)</span>
          </div>
        </div>

        {/* Card Offer Details (Orange/Yellow Background context from Image 2) */}
        <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg relative p-6 pt-12">
            
            {/* V Bank Active Cash Card Visual */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-28 bg-gradient-to-r from-stone-900 via-stone-800 to-red-950 rounded-xl p-3 shadow-lg text-white flex flex-col justify-between relative overflow-hidden border border-stone-700">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-bold uppercase tracking-wider text-red-400">V BANK</span>
                <span className="text-[8px] italic opacity-80 text-white">ACTIVE CASH</span>
              </div>
              <div className="w-6 h-4 bg-amber-400/80 rounded-sm shadow-sm" />
              <div className="flex justify-between items-end">
                <span className="text-[8px] font-mono tracking-widest text-stone-300">{activeProfile?.name?.toUpperCase() || 'ALEX'}</span>
                <span className="text-[10px] font-bold tracking-tighter text-white">VISA</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-stone-900">Active Cash®</h3>
              <p className="text-lg font-semibold text-stone-800 leading-snug mt-1">
                Earn unlimited 2% cash rewards<br />on purchases
              </p>
            </div>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex">
                <span className="w-24 shrink-0 font-semibold text-stone-700">Intro offer</span>
                <span className="text-stone-600">
                  $200 cash rewards bonus when you spend $500 in purchases within the first 3 months
                </span>
              </div>
              
              <div className="flex border-t border-stone-100 pt-3">
                <span className="w-24 shrink-0 font-semibold text-stone-700">Rewards</span>
                <span className="text-stone-600">2% cash rewards on purchases</span>
              </div>

              <div className="flex border-t border-stone-100 pt-3">
                <span className="w-24 shrink-0 font-semibold text-stone-700">Annual fee</span>
                <span className="text-stone-600">$0</span>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 mb-6">
              <a href="#" className="text-sm font-semibold text-blue-800 underline">Rates and fees</a>
              <a href="#" className="text-sm font-semibold text-blue-800 underline">Important reward terms</a>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 py-3 border-2 border-stone-300 text-stone-800 rounded-full font-bold text-sm hover:bg-stone-50 transition-colors">
                Learn more
              </button>
              <button className="flex-1 py-3 bg-red-600 text-white rounded-full font-bold text-sm hover:bg-red-700 transition-colors shadow-sm">
                Apply now
              </button>
            </div>
          </div>
        </div>

        {/* Important Legal Information */}
        <div className="bg-[#EBEBEB] px-4 py-8 text-[11px] text-stone-600 space-y-4">
          <h4 className="font-bold text-stone-800 text-sm mb-2">Important legal information</h4>
          <p>
            View <a href="#" className="text-blue-800 underline">account agreements.</a>
          </p>
          <p>Credit card is subject to credit qualification.</p>
          <p>
            You may not qualify for an additional Wells Fargo-branded credit card if you have opened a Wells Fargo-branded credit card in the last 6 months.
          </p>
          <p>
            Offers may differ from time to time and depend on the marketing channel, such as phone, email, online, direct mail, or in branch. You must select <strong>Apply now</strong> on this page to take advantage of this specific offer.
          </p>
          <p className="pt-2">CAR-0000-00000</p>
          
          <div className="border-t border-stone-300 pt-6 mt-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <a href="#">Privacy, Cookies, Security & Legal</a>
              <a href="#">Do Not Sell or Share My Personal Information</a>
              <a href="#">Notice of Data Collection</a>
              <a href="#">Give Us Feedback</a>
            </div>
            <p>Copyright © 19XX-20XX Wells Fargo Bank, N.A. All rights reserved.</p>
          </div>
        </div>

      </main>

      {/* Shared Bottom Nav */}
      <BottomNav />

      {/* Chat Overlay triggered from Explore widget */}
      <ChatOverlay
        profile={activeProfile}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        fromExplore={true}
      />
    </div>
  );
}
