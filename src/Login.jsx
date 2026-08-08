import React from 'react';
import { useNavigate } from 'react-router-dom';
import { profiles } from './profileData';
import { Shield, ChevronRight, Sparkles, CreditCard, ShoppingBag, Plane } from 'lucide-react';

export default function Login({ onSelectProfile }) {
  const navigate = useNavigate();

  const handleSelect = (profile) => {
    onSelectProfile(profile);
    navigate(`/account/${profile.id}`);
  };

  const getProfileIcon = (id) => {
    switch (id) {
      case 'alex':
        return <Plane className="w-5 h-5 text-indigo-400" />;
      case 'bill':
        return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'clay':
        return <CreditCard className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Container - Mobile frame feel */}
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/50 z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 shadow-lg shadow-indigo-500/30 mb-4 ring-1 ring-white/20">
            <span className="text-2xl font-black tracking-wider text-white">V</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">V Bank</h1>
          <p className="text-slate-400 text-sm mt-1 font-medium">Select a profile to continue</p>
        </div>

        {/* Profile Options List */}
        <div className="space-y-3.5">
          {Object.values(profiles).map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleSelect(profile)}
              className="w-full group text-left p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-200 flex items-center justify-between shadow-sm hover:shadow-md hover:shadow-indigo-500/10 active:scale-[0.98]"
            >
              <div className="flex items-center space-x-3.5">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-700 group-hover:ring-indigo-500 transition-all"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 bg-slate-900 rounded-full border border-slate-700">
                    {getProfileIcon(profile.id)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-100 text-base group-hover:text-indigo-300 transition-colors">
                      {profile.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-300 font-medium">
                      {profile.tier}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-normal">
                    {profile.descriptor}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center flex items-center justify-center space-x-1.5 text-xs text-slate-500">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          <span>Simulated Banking Environment · LEXA AI Ready</span>
        </div>
      </div>
    </div>
  );
}
