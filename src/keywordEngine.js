/**
 * Keyword Response Engine for LEXA Banking Assistant.
 * Receives current profile object and user input string, returning smart banking responses.
 */

export function getKeywordResponse(profile, userInput) {
  if (!userInput || typeof userInput !== 'string') {
    return "I didn't quite catch that. How can I assist with your V Bank accounts today?";
  }

  const query = userInput.toLowerCase().trim();
  const name = profile?.name || "there";

  // Balance query
  if (query.includes("balance") || query.includes("how much") || query.includes("money") || query.includes("account")) {
    if (profile?.isDebt) {
      return `Your current ${profile.accountType} (${profile.creditCard.number}) has a total balance owed of $${Math.abs(profile.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}. Your utilization is high at ${profile.creditCard.utilizationPercentage}%. Would you like to explore balance transfer or payment options?`;
    }
    return `Your ${profile.accountType} (${profile.accountNumber}) available balance is $${profile.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}. All accounts are in good standing!`;
  }

  // Transactions query
  if (query.includes("transaction") || query.includes("recent") || query.includes("spent") || query.includes("history") || query.includes("charge")) {
    const recent = profile?.transactions?.slice(0, 3).map(t => `${t.merchant} ($${t.amount.toFixed(2)})`).join(", ");
    return `Here are your most recent transactions: ${recent}. You can view the full transaction list on your main dashboard screen.`;
  }

  // Card / Debt / Pay query
  if (query.includes("pay") || query.includes("card") || query.includes("due") || query.includes("debt") || query.includes("interest")) {
    if (profile?.isDebt) {
      return `Your ${profile.warning}. Paying more than the minimum will help reduce your APR interest charges ($89.50 last cycle). Would you like me to set up an automatic payment plan for you?`;
    }
    return `Your card (${profile.creditCard?.number}) has an available limit of $${profile.creditCard?.available?.toLocaleString('en-US', { minimumFractionDigits: 2 })} with no outstanding payment due dates pending.`;
  }

  // Rewards / Travel / Perks
  if (query.includes("reward") || query.includes("travel") || query.includes("lounge") || query.includes("points") || query.includes("flight")) {
    if (profile?.id === "alex") {
      return `As a ${profile.tier} member, you have 142,500 V-Points available! You also have complimentary unlimited lounge access and zero foreign exchange fee benefits active.`;
    }
    return `You have 12,400 reward points. Upgrading to our Premiere Elite tier unlocks 3x travel points and complimentary global lounge access!`;
  }

  // Help / Greeting
  if (query.includes("hi") || query.includes("hello") || query.includes("hey") || query.includes("help") || query.includes("lexa")) {
    return `Hello ${name}! I'm Credit Compass, your V Bank AI Assistant. You can ask me about your balance, recent spending, rewards, credit card payment options, or transferring funds.`;
  }

  // Default fallback response
  return `I understand you're asking about "${userInput}". As your V Bank assistant, I can help you check your account balance, review recent transactions, or manage your card options.`;
}
