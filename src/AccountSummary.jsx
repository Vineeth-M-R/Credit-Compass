import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { profiles } from './profileData';
import ChatOverlay from './ChatOverlay';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
  MessageSquare,
  LogOut,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Plane,
  Hotel,
  Coffee,
  RefreshCw,
  Car,
  ShoppingBag,
  ShoppingCart,
  Tv,
  Percent,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  ChevronRight,
  CreditCard,
  Wallet
} from 'lucide-react';

export default function AccountSummary({ currentProfile, onLogout }) {
  const { profile: profileParam } = useParams();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  // Match profile from route param or fallback to currentProfile or default alex
  const activeProfile = profiles[profileParam] || currentProfile || profiles.alex;

  const getTransactionIcon = (iconName) => {
    switch (iconName) {
      case 'Plane': return <Plane className="w-4 h-4 text-indigo-400" />;
      case 'Hotel': return <Hotel className="w-4 h-4 text-blue-400" />;
      case 'Coffee': return <Coffee className="w-4 h-4 text-amber-400" />;
      case 'RefreshCw': return <RefreshCw className="w-4 h-4 text-emerald-400" />;
      case 'Car': return <Car className="w-4 h-4 text-purple-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      case 'ShoppingCart': return <ShoppingCart className="w-4 h-4 text-amber-400" />;
      case 'Tv': return <Tv className="w-4 h-4 text-cyan-400" />;
      case 'Percent': return <Percent className="w-4 h-4 text-rose-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'AlertCircle': return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4 text-indigo-400" />;
      default: return <CreditCard className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col max-w-md mx-auto relative border-x border-slate-800/80 shadow-2xl">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 p-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-700 flex items-center justify-center font-black text-white text-lg shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
            V
          </div>
          <div>
            <h1 className="font-bold text-base text-white tracking-tight leading-none">V Bank</h1>
            <span className="text-[10px] text-indigo-400 font-semibold tracking-wide uppercase">Mobile Banking</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/60 rounded-full pl-2 pr-3 py-1">
            <img
              src={activeProfile.avatar}
              alt={activeProfile.name}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-indigo-500"
            />
            <span className="text-xs font-semibold text-slate-200">{activeProfile.name}</span>
          </div>
          <button
            onClick={() => {
              onLogout();
              navigate('/');
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Switch Profile"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Floating Chat Icon (Fixed top-right below navbar) */}
      <div className="sticky top-20 z-40 px-4 flex justify-end pointer-events-none mb-[-48px]">
        <button
          onClick={() => setIsChatOpen(true)}
          className="pointer-events-auto relative group flex items-center space-x-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2.5 rounded-full shadow-lg shadow-indigo-600/40 hover:shadow-indigo-500/60 transition-all duration-300 transform active:scale-95"
        >
          <MessageSquare className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-bold tracking-wide">Ask LEXA</span>
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 space-y-4 pt-6">
        
        {/* Warning Banner (For Clay / Debt Profile) */}
        {activeProfile.warning && (
          <div className="bg-rose-950/60 border border-rose-800/80 rounded-2xl p-3.5 flex items-start space-x-3 shadow-lg shadow-rose-950/30">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-rose-200 uppercase tracking-wider">Attention Required</h4>
              <p className="text-xs text-rose-300 mt-0.5 font-medium">{activeProfile.warning}</p>
            </div>
          </div>
        )}

        {/* Account Balance Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/90 border border-slate-800 rounded-3xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
                {activeProfile.accountType}
              </span>
              <span className="text-xs text-slate-500 font-mono">•••• {activeProfile.accountNumber}</span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
              {activeProfile.tier}
            </span>
          </div>

          <div className="mb-4">
            <span className="text-xs text-slate-400 block mb-1">
              {activeProfile.isDebt ? 'Current Owed Balance' : 'Available Balance'}
            </span>
            <div className="text-3xl font-extrabold tracking-tight text-white flex items-baseline space-x-1">
              <span className={activeProfile.isDebt ? 'text-rose-400' : 'text-white'}>
                {activeProfile.isDebt ? `-$${Math.abs(activeProfile.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : `$${activeProfile.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
              </span>
            </div>
          </div>

          {/* Additional Credit Card stats if applicable */}
          {activeProfile.creditCard && (
            <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center text-xs">
              <span className="text-slate-400">Card limit: ${activeProfile.creditCard.limit.toLocaleString()}</span>
              {activeProfile.creditCard.utilizationPercentage ? (
                <span className="text-rose-400 font-semibold">
                  Utilization: {activeProfile.creditCard.utilizationPercentage}%
                </span>
              ) : (
                <span className="text-emerald-400 font-medium">
                  Available: ${activeProfile.creditCard.available?.toLocaleString()}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Spending Breakdown Chart */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-lg">
          <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center justify-between">
            <span>Spending Breakdown</span>
            <span className="text-xs font-normal text-slate-400">This Month</span>
          </h3>

          <div className="h-44 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activeProfile.spendingBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="amount"
                >
                  {activeProfile.spendingBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    fontSize: '12px'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Spent']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Items */}
          <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-800/60">
            {activeProfile.spendingBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-400 truncate flex-1">{item.category}</span>
                <span className="text-slate-200 font-semibold">${item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-3">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-bold text-slate-200">Recent Transactions</h3>
            <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center">
              View All <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {activeProfile.transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/40 hover:border-slate-700/60 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center shrink-0">
                    {getTransactionIcon(tx.icon)}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200 leading-snug">{tx.merchant}</h4>
                    <span className="text-[10px] text-slate-400">{tx.date} · {tx.category}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-bold ${
                      tx.type === 'credit' ? 'text-emerald-400' : 'text-slate-200'
                    }`}
                  >
                    {tx.type === 'credit' ? `+$${tx.amount.toFixed(2)}` : `-$${tx.amount.toFixed(2)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Render Chat Overlay when opened */}
      <ChatOverlay
        profile={activeProfile}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}
