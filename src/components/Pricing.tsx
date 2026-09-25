import React, { useState } from 'react';
import { Check, ArrowRight, Calculator, Sliders, Sparkles } from 'lucide-react';
import { PRICING_PLANS, PRICING_DISCLAIMER } from '../data/portfolioData.ts';

interface PricingProps {
  currency: 'USD' | 'EUR' | 'GBP';
  onCurrencyChange: (c: 'USD' | 'EUR' | 'GBP') => void;
  onSelectPlan: (planName: string, budgetRange: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({
  currency,
  onCurrencyChange,
  onSelectPlan,
}) => {
  const [showEstimator, setShowEstimator] = useState(false);
  const [pagesCount, setPagesCount] = useState<number>(3);
  const [needAiApi, setNeedAiApi] = useState<boolean>(false);
  const [needBooking, setNeedBooking] = useState<boolean>(false);
  const [needExpressDelivery, setNeedExpressDelivery] = useState<boolean>(false);

  // Conversion rates (approximate baseline for international display)
  const currencyRates: Record<'USD' | 'EUR' | 'GBP', { rate: number; symbol: string }> = {
    USD: { rate: 1.0, symbol: '$' },
    EUR: { rate: 0.92, symbol: '€' },
    GBP: { rate: 0.79, symbol: '£' },
  };

  const currentInfo = currencyRates[currency];

  const formatPrice = (usd: number | null) => {
    if (usd === null) return "Let's Talk";
    const converted = Math.round(usd * currentInfo.rate);
    return `${currentInfo.symbol}${converted}+`;
  };

  // Dynamic cost estimator logic
  const calculateEstimatedCost = () => {
    let base = 499;
    if (pagesCount > 3) {
      base = 499 + (pagesCount - 3) * 60;
    }
    if (needAiApi) base += 250;
    if (needBooking) base += 200;
    if (needExpressDelivery) base += 150;

    const converted = Math.round(base * currentInfo.rate);
    return `${currentInfo.symbol}${converted}`;
  };

  const handleApplyEstimate = () => {
    const est = calculateEstimatedCost();
    const details = `Estimated Scope: ${pagesCount} pages${needAiApi ? ', AI/API Integration' : ''}${needBooking ? ', Booking System' : ''} (${est} ${currency})`;
    onSelectPlan('Custom Estimate', details);
  };

  return (
    <section id="pricing" className="py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Clear & Transparent
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Project Pricing
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Clear starting packages for USA and international businesses. No hidden markups.
            </p>
          </div>

          {/* Currency Switcher & Scope Estimator Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 bg-[#0c1220] p-1 rounded-xl border border-slate-800">
              {(['USD', 'EUR', 'GBP'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => onCurrencyChange(c)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                    currency === c
                      ? 'bg-slate-800 text-cyan-300 font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {c} ({currencyRates[c].symbol})
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowEstimator(!showEstimator)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded-xl border transition-all ${
                showEstimator
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              {showEstimator ? 'Hide Estimator' : 'Scope Estimator'}
            </button>
          </div>
        </div>

        {/* Interactive Scope Estimator Drawer */}
        {showEstimator && (
          <div className="mb-14 p-6 sm:p-8 rounded-2xl border border-cyan-500/40 bg-[#0d1629]/90 backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">Interactive Scope Calculator</span>
                <h4 className="text-lg font-bold text-white mt-0.5">Customize Your Exact Project Specs</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-mono">Estimated Ballpark</span>
                <span className="text-2xl font-extrabold text-cyan-300 tabular-nums">
                  {calculateEstimatedCost()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              {/* Page count slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono">
                  <span className="text-slate-300">Page Count:</span>
                  <span className="text-cyan-400 font-bold tabular-nums">{pagesCount} Pages</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={pagesCount}
                  onChange={(e) => setPagesCount(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <span className="text-[11px] text-slate-500">1 to 12 responsive pages</span>
              </div>

              {/* AI / API */}
              <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={needAiApi}
                  onChange={(e) => setNeedAiApi(e.target.checked)}
                  className="mt-0.5 accent-cyan-400"
                />
                <div>
                  <div className="font-semibold text-white">AI / API Integration</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Connect LLMs, payment APIs, or dynamic feeds</div>
                </div>
              </label>

              {/* Booking */}
              <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={needBooking}
                  onChange={(e) => setNeedBooking(e.target.checked)}
                  className="mt-0.5 accent-cyan-400"
                />
                <div>
                  <div className="font-semibold text-white">Booking / Scheduler</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Calendar, reservations or class booking UI</div>
                </div>
              </label>

              {/* Priority */}
              <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={needExpressDelivery}
                  onChange={(e) => setNeedExpressDelivery(e.target.checked)}
                  className="mt-0.5 accent-cyan-400"
                />
                <div>
                  <div className="font-semibold text-white">Priority Delivery</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Accelerated timeline with dedicated focus</div>
                </div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Ready to turn this estimate into a live project?
              </span>
              <button
                onClick={handleApplyEstimate}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors"
              >
                Apply Estimate to Inquiry Form
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => {
            const isCustom = plan.basePriceUSD === null;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-[#0f182c] border-cyan-500/60 shadow-xl shadow-cyan-500/5'
                    : 'bg-[#0c1220]/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular highlight indicator */}
                {plan.isPopular && (
                  <div className="absolute -top-3 left-8 bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 text-[11px] font-bold font-mono px-3 py-0.5 rounded-full shadow-sm">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  {/* Plan Name & Audience */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <span className="text-xs font-mono text-slate-400">
                      {isCustom ? 'Tailored' : 'Fixed Scope'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-6 font-medium">
                    {plan.targetAudience}
                  </p>

                  {/* Price display */}
                  <div className="mb-8 pb-6 border-b border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-white tracking-tight tabular-nums">
                        {formatPrice(plan.basePriceUSD)}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono mt-1 block">
                      {isCustom ? 'Scoped to requirements' : `Starting baseline in ${currency}`}
                    </span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                      Included Deliverables
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan CTA */}
                <div>
                  <button
                    onClick={() => onSelectPlan(plan.name, formatPrice(plan.basePriceUSD))}
                    className={`w-full py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      plan.isPopular
                        ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mandatory Pricing Disclaimer */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center text-xs text-slate-400 font-normal max-w-3xl mx-auto leading-relaxed">
          {PRICING_DISCLAIMER}
        </div>

      </div>
    </section>
  );
};
