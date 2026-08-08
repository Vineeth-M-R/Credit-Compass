export const profiles = {
  alex: {
    id: "alex",
    name: "Alex",
    descriptor: "Premiere Customer · Travel Enthusiast",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    tier: "Premiere Elite",
    accountNumber: "8849",
    accountType: "Global Platinum Reserve",
    balance: 8420.50,
    creditCard: {
      number: "•••• 8849",
      limit: 25000,
      available: 16579.50,
    },
    spendingBreakdown: [
      { category: "Airlines & Travel", amount: 3450, color: "#6366f1" },
      { category: "Hotels & Stays", amount: 2100, color: "#3b82f6" },
      { category: "Dining & Lounges", amount: 1420, color: "#8b5cf6" },
      { category: "Forex & Int'l", amount: 1450.50, color: "#ec4899" }
    ],
    transactions: [
      { id: 1, merchant: "Emirates Airlines", category: "Travel", amount: 1250.00, date: "Today, 2:15 PM", icon: "Plane", type: "debit" },
      { id: 2, merchant: "Marriott Bonvoy Resort", category: "Hotels", amount: 840.50, date: "Yesterday", icon: "Hotel", type: "debit" },
      { id: 3, merchant: "Airport Lounge Express", category: "Dining", amount: 65.00, date: "Aug 04", icon: "Coffee", type: "debit" },
      { id: 4, merchant: "Global Currency FX Transfer", category: "Forex", amount: 500.00, date: "Aug 02", icon: "RefreshCw", type: "debit" },
      { id: 5, merchant: "Uber International Black", category: "Travel", amount: 82.00, date: "Jul 31", icon: "Car", type: "debit" },
      { id: 6, merchant: "Salary Deposit - Tech Global", category: "Income", amount: 6500.00, date: "Jul 28", icon: "ArrowDownLeft", type: "credit" }
    ]
  },
  bill: {
    id: "bill",
    name: "Bill",
    descriptor: "Everyday Banking · Frequent Shopper",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    tier: "Everyday Plus",
    accountNumber: "3412",
    accountType: "Smart Checking Account",
    balance: 2105.75,
    creditCard: {
      number: "•••• 3412",
      limit: 5000,
      available: 4120.00,
    },
    spendingBreakdown: [
      { category: "Shopping", amount: 890, color: "#10b981" },
      { category: "Groceries", amount: 620, color: "#f59e0b" },
      { category: "Subscriptions", amount: 145, color: "#06b6d4" },
      { category: "Dining Out", amount: 450.75, color: "#f43f5e" }
    ],
    transactions: [
      { id: 1, merchant: "Amazon.com Purchase", category: "Shopping", amount: 124.99, date: "Today, 11:30 AM", icon: "ShoppingBag", type: "debit" },
      { id: 2, merchant: "Target Superstore", category: "Groceries", amount: 86.40, date: "Yesterday", icon: "ShoppingCart", type: "debit" },
      { id: 3, merchant: "Whole Foods Market", category: "Groceries", amount: 142.10, date: "Aug 04", icon: "ShoppingCart", type: "debit" },
      { id: 4, merchant: "Netflix & Spotify Bundle", category: "Subscriptions", amount: 28.98, date: "Aug 03", icon: "Tv", type: "debit" },
      { id: 5, merchant: "Starbucks Coffee", category: "Dining Out", amount: 14.25, date: "Aug 02", icon: "Coffee", type: "debit" },
      { id: 6, merchant: "Trader Joe's", category: "Groceries", amount: 68.50, date: "Jul 30", icon: "ShoppingCart", type: "debit" }
    ]
  },
  clay: {
    id: "clay",
    name: "Clay",
    descriptor: "Credit Card Holder · Reviewing Options",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    tier: "Preferred Cardholder",
    accountNumber: "9102",
    accountType: "Sapphire Rewards Card",
    balance: -4320.00,
    isDebt: true,
    warning: "Minimum Payment Due: $145.00 by Aug 12",
    creditCard: {
      number: "•••• 9102",
      limit: 5000,
      utilized: 4320.00,
      utilizationPercentage: 86.4
    },
    spendingBreakdown: [
      { category: "Card Balance", amount: 3200, color: "#ef4444" },
      { category: "Interest & Fees", amount: 620, color: "#f97316" },
      { category: "Recent Charges", amount: 500, color: "#eab308" }
    ],
    transactions: [
      { id: 1, merchant: "Interest Charge - APR 24.9%", category: "Interest", amount: 89.50, date: "Today", icon: "Percent", type: "debit" },
      { id: 2, merchant: "Credit Card Payment - Thank You", category: "Payment", amount: 150.00, date: "Yesterday", icon: "CheckCircle2", type: "credit" },
      { id: 3, merchant: "Balance Transfer Fee", category: "Fees", amount: 45.00, date: "Aug 03", icon: "AlertCircle", type: "debit" },
      { id: 4, merchant: "Electronics MegaStore", category: "Shopping", amount: 399.00, date: "Aug 01", icon: "Smartphone", type: "debit" },
      { id: 5, merchant: "Late Fee Adjustment", category: "Fees", amount: 35.00, date: "Jul 29", icon: "AlertTriangle", type: "debit" }
    ]
  }
};
