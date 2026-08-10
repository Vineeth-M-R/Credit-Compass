import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Home,
  ArrowDownLeft,
  Compass,
  Menu
} from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useParams();
  
  const currentProfile = profile || 'alex'; // fallback
  const isExplore = location.pathname.startsWith('/explore');
  const isAccounts = location.pathname.startsWith('/account');

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#F5F4F0] border-t border-[#DCDAD2] py-2 px-3 flex justify-around items-center z-40">
      <button 
        onClick={() => navigate(`/account/${currentProfile}`)}
        className={`flex flex-col items-center ${isAccounts ? 'text-red-700' : 'text-stone-600 hover:text-stone-950'}`}
      >
        <Home className={`w-5 h-5 ${isAccounts ? 'fill-current' : ''}`} />
        <span className={`text-[10px] mt-0.5 ${isAccounts ? 'font-bold' : 'font-medium'}`}>Accounts</span>
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

      <button 
        onClick={() => navigate(`/explore/${currentProfile}`)}
        className={`flex flex-col items-center ${isExplore ? 'text-red-700' : 'text-stone-600 hover:text-stone-950'}`}
      >
        <Compass className={`w-5 h-5 ${isExplore ? 'fill-current' : ''}`} />
        <span className={`text-[10px] mt-0.5 ${isExplore ? 'font-bold' : 'font-medium'}`}>Explore</span>
      </button>

      <button className="flex flex-col items-center text-stone-600 hover:text-stone-950">
        <Menu className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Menu</span>
      </button>
    </nav>
  );
}
