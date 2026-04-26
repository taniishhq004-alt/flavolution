'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const FOOD_RECIPES = [
  { name: 'Butter Chicken', cuisine: 'Indian', emoji: '🍛', cal: '420 kcal', tag: 'High Protein' },
  { name: 'Avocado Toast', cuisine: 'American', emoji: '🥑', cal: '280 kcal', tag: 'Vegan' },
  { name: 'Sushi Platter', cuisine: 'Japanese', emoji: '🍣', cal: '350 kcal', tag: 'Low Fat' },
  { name: 'Caesar Salad', cuisine: 'Italian', emoji: '🥗', cal: '190 kcal', tag: 'Keto' },
  { name: 'Chocolate Cake', cuisine: 'French', emoji: '🎂', cal: '520 kcal', tag: 'Indulgent' },
  { name: 'Pad Thai', cuisine: 'Thai', emoji: '🍜', cal: '380 kcal', tag: 'Gluten Free' },
  { name: 'Greek Bowl', cuisine: 'Mediterranean', emoji: '🫙', cal: '310 kcal', tag: 'Heart Healthy' },
  { name: 'Mushroom Risotto', cuisine: 'Italian', emoji: '🍄', cal: '440 kcal', tag: 'Vegetarian' },
  { name: 'Acai Bowl', cuisine: 'Brazilian', emoji: '🫐', cal: '240 kcal', tag: 'Superfood' },
  { name: 'Tacos Al Pastor', cuisine: 'Mexican', emoji: '🌮', cal: '390 kcal', tag: 'Spicy' },
  { name: 'Tom Yum Soup', cuisine: 'Thai', emoji: '🍲', cal: '160 kcal', tag: 'Low Calorie' },
  { name: 'Shakshuka', cuisine: 'Middle Eastern', emoji: '🍳', cal: '290 kcal', tag: 'Diabetic Friendly' },
  { name: 'Mango Lassi', cuisine: 'Indian', emoji: '🥭', cal: '180 kcal', tag: 'Probiotic' },
  { name: 'Falafel Wrap', cuisine: 'Lebanese', emoji: '🫓', cal: '320 kcal', tag: 'Vegan' },
  { name: 'BBQ Ribs', cuisine: 'American', emoji: '🍖', cal: '610 kcal', tag: 'High Protein' },
  { name: 'Green Smoothie', cuisine: 'Modern', emoji: '🥤', cal: '140 kcal', tag: 'Detox' },
];

const FLOATERS = ['🍎','🥦','🍋','🥕','🍇','🌿','🍓','🥑','🫐','🍊','🌾','🥝','🫑','🍅','🧄','🫚'];

export default function LandingPage() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setActiveIdx(i => (i + 1) % FOOD_RECIPES.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{
      background: '#060d06',
      fontFamily: "'DM Sans', system-ui, sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,700&family=Cormorant+Garamond:ital,wght@0,700;1,600&display=swap');
        @keyframes floatUp {
          0%   { transform: translateY(110vh) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.7; }
          92%  { opacity: 0.4; }
          100% { transform: translateY(-60px) rotate(720deg); opacity: 0; }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 40px rgba(74,222,128,0.15); }
          50%       { box-shadow: 0 0 80px rgba(74,222,128,0.35); }
        }
        @keyframes textShimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .floater { position: fixed; pointer-events: none; z-index: 0; animation: floatUp linear infinite; }
        .shimmer { background: linear-gradient(90deg, #86efac 0%, #4ade80 30%, #bbf7d0 60%, #4ade80 80%, #86efac 100%); background-size: 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: textShimmer 4s linear infinite; }
        .glow-btn { animation: glowPulse 2.5s ease-in-out infinite; }
        .card-hover { transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s; }
        .card-hover:hover { transform: translateY(-6px) scale(1.03); }
        .recipe-row { transition: all 0.3s ease; }
        .fade-slide { animation: fadeSlide 0.6s ease forwards; }
      `}</style>

      {/* Floating food bg */}
      {mounted && FLOATERS.map((f, i) => (
        <span key={i} className="floater" style={{
          left: `${(i / FLOATERS.length) * 100}%`,
          fontSize: `${1.2 + (i % 3) * 0.4}rem`,
          animationDuration: `${10 + i * 1.3}s`,
          animationDelay: `${i * 0.6}s`,
          opacity: 0,
        }}>{f}</span>
      ))}

      {/* Mesh gradient blobs */}
      <div style={{ position: 'fixed', top: '-10%', left: '-10%', width: '60vw', height: '60vh', background: 'radial-gradient(circle at 30% 40%, rgba(22,163,74,0.12), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '10%', right: '-5%', width: '50vw', height: '50vh', background: 'radial-gradient(circle at 70% 60%, rgba(202,138,4,0.07), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg, #166534, #4ade80)' }}>🧬</div>
          <div>
            <div className="font-bold text-xl leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-0.02em' }}>Flavolution</div>
            <div className="text-xs font-medium" style={{ color: '#4ade80' }}>Recipe DNA Engine</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-sm px-3 py-1 rounded-full" style={{ background: 'rgba(74,222,128,0.08)', color: '#86efac', border: '1px solid rgba(74,222,128,0.15)' }}>
            {FOOD_RECIPES.length} recipes ready
          </span>
          <button onClick={() => router.push('/')} className="glow-btn px-6 py-2.5 rounded-2xl font-bold text-sm text-black" style={{ background: 'linear-gradient(135deg, #4ade80, #16a34a)' }}>
            Launch App →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Left: copy */}
          <div className="md:col-span-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8" style={{ background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.25)', color: '#4ade80' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Computational Gastronomy · AI-Powered Mutations
            </div>

            <h1 className="text-6xl md:text-8xl font-bold leading-none mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-0.03em' }}>
              Every Recipe<br />
              <span className="shimmer">Has DNA.</span>
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: '#9ca3af' }}>
              We decode every dish into a 4-dimensional genome — flavor, nutrition, health & sustainability — then mutate it toward your personal goals in real time.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button onClick={() => router.push('/')} className="glow-btn px-8 py-4 rounded-2xl font-bold text-black text-base" style={{ background: 'linear-gradient(135deg, #4ade80, #16a34a)' }}>
                Decode a Recipe 🧬
              </button>
              <button className="px-8 py-4 rounded-2xl font-bold text-base" style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#e5e7eb' }}>
                See How It Works →
              </button>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: '🧬', val: '4D', label: 'Genome Rings' },
                { icon: '⚡', val: '8+', label: 'Mutation Goals' },
                { icon: '🆓', val: '100%', label: 'Free to Use' },
                { icon: '🤖', val: 'AI', label: 'Powered by LLaMA' },
              ].map(s => (
                <div key={s.val} className="flex items-center gap-2 px-4 py-2 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span>{s.icon}</span>
                  <span className="font-black text-green-400 text-sm">{s.val}</span>
                  <span className="text-gray-500 text-xs">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live recipe feed */}
          <div className="md:col-span-2">
            <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(22,163,74,0.08), rgba(6,13,6,0.9))', border: '1px solid rgba(74,222,128,0.12)' }}>
              <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(74,222,128,0.1)' }}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-xs font-bold tracking-wider" style={{ color: '#4ade80' }}>LIVE — RECIPE FEED</span>
                </div>
              </div>
              <div className="p-3 space-y-1.5 max-h-96 overflow-y-auto">
                {FOOD_RECIPES.map((r, i) => (
                  <div key={r.name} onClick={() => router.push('/')}
                    className="recipe-row flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer"
                    style={{
                      background: activeIdx === i ? 'rgba(74,222,128,0.1)' : 'transparent',
                      border: `1px solid ${activeIdx === i ? 'rgba(74,222,128,0.2)' : 'transparent'}`,
                    }}>
                    <span className="text-xl">{r.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-white truncate">{r.name}</div>
                      <div className="text-xs" style={{ color: '#6b7280' }}>{r.cuisine} · {r.cal}</div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full shrink-0" style={{ background: 'rgba(74,222,128,0.08)', color: '#86efac', border: '1px solid rgba(74,222,128,0.12)' }}>
                      {r.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALL RECIPES GRID */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Evolve Any of These</h2>
            <p className="mt-1 text-sm" style={{ color: '#6b7280' }}>Click any recipe to start analyzing its genome</p>
          </div>
          <div className="text-sm font-bold px-4 py-2 rounded-2xl" style={{ background: 'rgba(74,222,128,0.08)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.15)' }}>
            {FOOD_RECIPES.length} Recipes
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {FOOD_RECIPES.map((r, i) => (
            <div key={r.name} onClick={() => router.push('/')}
              className="card-hover rounded-2xl p-4 cursor-pointer group"
              style={{ background: 'linear-gradient(135deg, #0d180d, #0a120a)', border: '1px solid rgba(74,222,128,0.08)' }}>
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{r.emoji}</div>
              <div className="font-bold text-sm text-white mb-0.5">{r.name}</div>
              <div className="text-xs mb-3" style={{ color: '#6b7280' }}>{r.cuisine} · {r.cal}</div>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: 'rgba(74,222,128,0.08)', color: '#86efac', border: '1px solid rgba(74,222,128,0.12)' }}>
                🧬 {r.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4 GENOME DIMENSIONS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <h2 className="text-4xl font-bold text-center mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>The 4 Genome Dimensions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Flavor Genome', desc: 'Molecules, pairing & dominant flavor families', icon: '👅', color: '#f472b6', bg: 'rgba(236,72,153,0.07)', border: 'rgba(236,72,153,0.15)' },
            { label: 'Nutrition DNA', desc: 'Macros, micros, allergens & caloric density', icon: '⚗️', color: '#60a5fa', bg: 'rgba(96,165,250,0.07)', border: 'rgba(96,165,250,0.15)' },
            { label: 'Health Alleles', desc: 'GI index, inflammation & condition scores', icon: '❤️', color: '#facc15', bg: 'rgba(250,204,21,0.07)', border: 'rgba(250,204,21,0.15)' },
            { label: 'Eco Traits', desc: 'Carbon footprint, water & eco-score', icon: '🌍', color: '#4ade80', bg: 'rgba(74,222,128,0.07)', border: 'rgba(74,222,128,0.15)' },
          ].map(d => (
            <div key={d.label} className="card-hover rounded-2xl p-5" style={{ background: d.bg, border: `1px solid ${d.border}` }}>
              <div className="text-3xl mb-3">{d.icon}</div>
              <div className="font-bold text-sm mb-2" style={{ color: d.color }}>{d.label}</div>
              <div className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{d.desc}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button onClick={() => router.push('/')} className="glow-btn px-14 py-5 rounded-2xl font-black text-xl text-black" style={{ background: 'linear-gradient(135deg, #4ade80, #16a34a)' }}>
            Start Evolving Your Recipe 🧬
          </button>
          <p className="mt-3 text-sm" style={{ color: '#4b5563' }}>Free forever · No signup needed · Powered by AI</p>
        </div>
      </section>
    </main>
  );
}