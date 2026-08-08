import React from 'react';
import { useNavigate } from 'react-router-dom';
import { profiles } from './profileData';
import { ChevronRight, Sparkles, CreditCard, ShoppingBag, Plane } from 'lucide-react';

export default function Login({ onSelectProfile }) {
  const navigate = useNavigate();

  const handleSelect = (profile) => {
    onSelectProfile(profile);
    navigate(`/account/${profile.id}`);
  };

  const getProfileIcon = (id) => {
    switch (id) {
      case 'alex':
        return <Plane className="w-4 h-4 text-slate-700" />;
      case 'bill':
        return <ShoppingBag className="w-4 h-4 text-slate-700" />;
      case 'clay':
        return <CreditCard className="w-4 h-4 text-slate-700" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EAE8E3] flex flex-col justify-center items-center p-4 relative font-sans">
      {/* Container simulating high-end mobile aesthetic */}
      <div className="w-full max-w-sm bg-[#F5F4F0] border border-[#DEDCD5] rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-300/40">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-stone-900 text-white shadow-md mb-3">
            <span className="text-xl font-bold tracking-tight">V</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">V Bank</h1>
          <p className="text-stone-500 text-xs mt-1 font-medium">Select a profile to continue</p>
        </div>

        {/* Profile Options List */}
        <div className="space-y-3">
          {Object.values(profiles).map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleSelect(profile)}
              className="w-full text-left p-4 rounded-2xl bg-white border border-[#E2E0D8] hover:border-stone-400 hover:bg-[#FAF9F5] transition-all duration-200 flex items-center justify-between shadow-sm active:scale-[0.98]"
            >
              <div className="flex items-center space-x-3.5">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-stone-200"
                  />
                  <div className="absolute -bottom-1 -right-1 p-0.5 bg-[#EAE8E3] rounded-full border border-stone-300">
                    {getProfileIcon(profile.id)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-stone-900 text-sm">
                      {profile.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium border border-stone-200">
                      {profile.tier}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5 font-normal">
                    {profile.descriptor}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[11px] text-stone-400 font-medium">
          Insights & Banking Assistant Powered by LEXA
        </div>
      </div>
    </div>
  );
}
