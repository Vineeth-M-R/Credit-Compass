import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { profiles } from './profileData';
import ChatOverlay from './ChatOverlay';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
  MessageSquare,
  LogOut,
  AlertTriangle,
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
  CreditCard
} from 'lucide-react';

export default function AccountSummary({ currentProfile, onLogout }) {
  const { profile: profileParam } = useParams();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const activeProfile = profiles[profileParam] || currentProfile || profiles.alex;

  const getTransactionIcon = (iconName) => {
    switch (iconName) {
      case 'Plane': return <Plane className="w-4 h-4 text-stone-700" />;
      case 'Hotel': return <Hotel className="w-4 h-4 text-stone-700" />;
      case 'Coffee': return <Coffee className="w-4 h-4 text-stone-700" />;
      case 'RefreshCw': return <RefreshCw className="w-4 h-4 text-stone-700" />;
      case 'Car': return <Car className="w-4 h-4 text-stone-700" />;
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4 text-stone-700" />;
      case 'ShoppingCart': return <ShoppingCart className="w-4 h-4 text-stone-700" />;
      case 'Tv': return <Tv className="w-4 h-4 text-stone-700" />;
      case 'Percent': return <Percent className="w-4 h-4 text-stone-700" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-4 h-4 text-stone-700" />;
      case 'AlertCircle': return <AlertCircle className="w-4 h-4 text-stone-700" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4 text-stone-700" />;
      default: return <CreditCard className="w-4 h-4 text-stone-700" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EAE8E3] text-stone-900 flex flex-col max-w-md mx-auto relative border-x border-[#DEDCD5] shadow-xl font-sans">
      {/* Navigation Header */}
      <header className="bg-[#F5F4F0] border-b border-[#DEDCD5] p-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
            V
          </div>
          <div>
            <h1 className="font-bold text-sm text-stone-900 tracking-tight leading-none">V Bank</h1>
            <span className="text-[10px] text-stone-500 font-medium uppercase tracking-wider">Mobile Banking</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-2 bg-white border border-[#E2E0D8] rounded-full pl-1.5 pr-3 py-1 shadow-2xs">
            <img
              src={activeProfile.avatar}
              alt={activeProfile.name}
              className="w-5 h-5 rounded-full object-cover ring-1 ring-stone-300"
            />
            <span className="text-xs font-semibold text-stone-800">{activeProfile.name}</span>
          </div>
          <button
            onClick={() => {
              onLogout();
              navigate('/');
            }}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-[#EAE8E3] transition-colors"
            title="Switch Profile"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Floating Chat Icon (Fixed top-right below navbar) */}
      <div className="sticky top-16 z-40 px-4 flex justify-end pointer-events-none mb-[-44px] pt-3">
        <button
          onClick={() => setIsChatOpen(true)}
          className="pointer-events-auto flex items-center space-x-2 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2.5 rounded-full shadow-lg transition-all duration-200 active:scale-95 border border-stone-800"
        >
          <MessageSquare className="w-4 h-4 text-white" />
          <span className="text-xs font-semibold tracking-tight">Ask LEXA</span>
          <span className="w-2 h-2 rounded-full bg-red-500" />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 space-y-4 pt-6">
        
        {/* Warning Banner */}
        {activeProfile.warning && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 flex items-start space-x-3 shadow-2xs">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-red-900 uppercase tracking-wider">Attention Required</h4>
              <p className="text-xs text-red-700 mt-0.5 font-medium">{activeProfile.warning}</p>
            </div>
          </div>
        )}

        {/* Account Balance Card */}
        <div className="bg-[#F5F4F0] border border-[#DEDCD5] rounded-3xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                {activeProfile.accountType}
              </span>
              <span className="text-xs text-stone-400 font-mono">•••• {activeProfile.accountNumber}</span>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-[#E2E0D8] text-stone-700 font-medium">
              {activeProfile.tier}
            </span>
          </div>

          <div className="mb-4">
            <span className="text-xs text-stone-500 block mb-1">
              {activeProfile.isDebt ? 'Current Owed Balance' : 'Available Balance'}
            </span>
            <div className="text-3xl font-bold tracking-tight text-stone-900">
              <span className={activeProfile.isDebt ? 'text-red-600' : 'text-stone-900'}>
                {activeProfile.isDebt ? `-$${Math.abs(activeProfile.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : `$${activeProfile.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
              </span>
            </div>
          </div>

          {activeProfile.creditCard && (
            <div className="pt-3 border-t border-[#E2E0D8] flex justify-between items-center text-xs">
              <span className="text-stone-500">Limit: ${activeProfile.creditCard.limit.toLocaleString()}</span>
              {activeProfile.creditCard.utilizationPercentage ? (
                <span className="text-red-600 font-semibold">
                  Utilization: {activeProfile.creditCard.utilizationPercentage}%
                </span>
              ) : (
                <span className="text-stone-700 font-medium">
                  Available: ${activeProfile.creditCard.available?.toLocaleString()}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Spending Breakdown */}
        <div className="bg-[#F5F4F0] border border-[#DEDCD5] rounded-3xl p-5 shadow-sm">
          <h3 className="text-xs font-bold text-stone-900 mb-2 uppercase tracking-wider flex items-center justify-between">
            <span>Spending Breakdown</span>
            <span className="text-[11px] font-normal text-stone-400">This Month</span>
          </h3>

          <div className="h-40 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activeProfile.spendingBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={3}
                  dataKey="amount"
                >
                  {activeProfile.spendingBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#F5F4F0" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E0D8',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                    color: '#1A1A1A'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Spent']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-[#E2E0D8]">
            {activeProfile.spendingBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-stone-600 truncate flex-1">{item.category}</span>
                <span className="text-stone-900 font-semibold">${item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#F5F4F0] border border-[#DEDCD5] rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Recent Transactions</h3>
            <button className="text-xs text-stone-600 hover:text-stone-900 font-medium flex items-center">
              View All <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="space-y-2">
            {activeProfile.transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#E2E0D8] transition-all shadow-2xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0">
                    {getTransactionIcon(tx.icon)}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900 leading-snug">{tx.merchant}</h4>
                    <span className="text-[10px] text-stone-400">{tx.date} · {tx.category}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-bold ${
                      tx.type === 'credit' ? 'text-emerald-700' : 'text-stone-900'
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
