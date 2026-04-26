'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

const FOOD_RECIPES = [
  { name: 'Butter Chicken', cuisine: 'Indian', emoji: '🍛', cal: '420 kcal', tag: 'High Protein', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80' },
  { name: 'Avocado Toast', cuisine: 'American', emoji: '🥑', cal: '280 kcal', tag: 'Vegan', img: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400&q=80' },
  { name: 'Sushi Platter', cuisine: 'Japanese', emoji: '🍣', cal: '350 kcal', tag: 'Low Fat', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80' },
  { name: 'Caesar Salad', cuisine: 'Italian', emoji: '🥗', cal: '190 kcal', tag: 'Keto', img: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80' },
  { name: 'Chocolate Cake', cuisine: 'French', emoji: '🎂', cal: '520 kcal', tag: 'Indulgent', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80' },
  { name: 'Pad Thai', cuisine: 'Thai', emoji: '🍜', cal: '380 kcal', tag: 'Gluten Free', img: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&q=80' },
  { name: 'Greek Bowl', cuisine: 'Mediterranean', emoji: '🫙', cal: '310 kcal', tag: 'Heart Healthy', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
  { name: 'Mushroom Risotto', cuisine: 'Italian', emoji: '🍄', cal: '440 kcal', tag: 'Vegetarian', img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80' },
  { name: 'Acai Bowl', cuisine: 'Brazilian', emoji: '🫐', cal: '240 kcal', tag: 'Superfood', img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80' },
  { name: 'Tacos Al Pastor', cuisine: 'Mexican', emoji: '🌮', cal: '390 kcal', tag: 'Spicy', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80' },
  { name: 'Tom Yum Soup', cuisine: 'Thai', emoji: '🍲', cal: '160 kcal', tag: 'Low Calorie', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80' },
  { name: 'Shakshuka', cuisine: 'Middle Eastern', emoji: '🍳', cal: '290 kcal', tag: 'Diabetic Friendly', img: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=400&q=80' },
  { name: 'Mango Lassi', cuisine: 'Indian', emoji: '🥭', cal: '180 kcal', tag: 'Probiotic', img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80' },
  { name: 'Falafel Wrap', cuisine: 'Lebanese', emoji: '🫓', cal: '320 kcal', tag: 'Vegan', img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80' },
  { name: 'BBQ Ribs', cuisine: 'American', emoji: '🍖', cal: '610 kcal', tag: 'High Protein', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
  { name: 'Green Smoothie', cuisine: 'Modern', emoji: '🥤', cal: '140 kcal', tag: 'Detox', img: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80' },
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

  // Click recipe → go to search page with query param → auto-analyze
  function handleRecipeClick(recipeName: string) {
    router.push(`/?q=${encodeURIComponent(recipeName)}`);
  }

  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{
      background: '#060d06',
      fontFamily: "'DM Sans', system-ui, sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;0,9..40,900&family=Cormorant+Garamond:ital,wght@0,700;1,600&display=swap');
        @keyframes floatUp {
          0%   { transform: translateY(110vh) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.6; }
          92%  { opacity: 0.3; }
          100% { transform: translateY(-60px) rotate(720deg); opacity: 0; }
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
        .recipe-row { transition: all 0.3s ease; }
      `}</style>

      {mounted && FLOATERS.map((f, i) => (
        <span key={i} className="floater" style={{
          left: `${(i / FLOATERS.length) * 100}%`,
          fontSize: `${1.2 + (i % 3) * 0.4}rem`,
          animationDuration: `${10 + i * 1.3}s`,
          animationDelay: `${i * 0.6}s`,
          opacity: 0,
        }}>{f}</span>
      ))}

      <div style={{ position: 'fixed', top: '-10%', left: '-10%', width: '60vw', height: '60vh', background: 'radial-gradient(circle at 30% 40%, rgba(22,163,74,0.12), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '10%', right: '-5%', width: '50vw', height: '50vh', background: 'radial-gradient(circle at 70% 60%, rgba(202,138,4,0.07), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg, #166534, #4ade80)' }}>🧬</div>
          <div>
            <div className="font-bold text-xl leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Flavolution</div>
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
          <div className="md:col-span-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8" style={{ background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.25)', color: '#4ade80' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Computational Gastronomy · AI-Powered Mutations
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-none mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-0.03em' }}>
              Every Recipe<br /><span className="shimmer">Has DNA.</span>
            </h1>
            <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: '#9ca3af' }}>
              We decode every dish into a 4-dimensional genome — flavor, nutrition, health & sustainability — then mutate it toward your personal goals in real time.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button onClick={() => router.push('/')} className="glow-btn px-8 py-4 rounded-2xl font-bold text-black text-base" style={{ background: 'linear-gradient(135deg, #4ade80, #16a34a)' }}>
                Decode a Recipe 🧬
              </button>
            </div>
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

          {/* Live feed - clicking auto-analyzes */}
          <div className="md:col-span-2">
            <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(22,163,74,0.08), rgba(6,13,6,0.9))', border: '1px solid rgba(74,222,128,0.12)' }}>
              <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(74,222,128,0.1)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-xs font-bold tracking-wider" style={{ color: '#4ade80' }}>LIVE — CLICK TO ANALYZE</span>
                  </div>
                  <span className="text-xs" style={{ color: '#374151' }}>tap any recipe →</span>
                </div>
              </div>
              <div className="p-3 space-y-1.5 max-h-96 overflow-y-auto">
                {FOOD_RECIPES.map((r, i) => (
                  <div key={r.name}
                    onClick={() => handleRecipeClick(r.name)}
                    className="recipe-row flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer group"
                    style={{
                      background: activeIdx === i ? 'rgba(74,222,128,0.1)' : 'transparent',
                      border: `1px solid ${activeIdx === i ? 'rgba(74,222,128,0.2)' : 'transparent'}`,
                    }}>
                    <span className="text-xl">{r.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-white truncate">{r.name}</div>
                      <div className="text-xs" style={{ color: '#6b7280' }}>{r.cuisine} · {r.cal}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full shrink-0" style={{ background: 'rgba(74,222,128,0.08)', color: '#86efac', border: '1px solid rgba(74,222,128,0.12)' }}>
                        {r.tag}
                      </span>
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#4ade80' }}>🧬</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D RECIPE CARDS GRID */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Evolve Any of These</h2>
            <p className="mt-1 text-sm" style={{ color: '#6b7280' }}>Click any card → auto-analyzes instantly 🧬</p>
          </div>
          <div className="text-sm font-bold px-4 py-2 rounded-2xl" style={{ background: 'rgba(74,222,128,0.08)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.15)' }}>
            {FOOD_RECIPES.length} Recipes
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {FOOD_RECIPES.map((r) => (
            <div key={r.name} onClick={() => handleRecipeClick(r.name)} className="cursor-pointer">
              <CardContainer className="inter-var w-full">
                <CardBody
                  className="relative group/card w-full h-auto rounded-2xl p-4"
                  style={{
                    background: 'linear-gradient(135deg, #0d180d, #0a120a)',
                    border: '1px solid rgba(74,222,128,0.1)',
                    width: '100%',
                  }}
                >
                  <CardItem translateZ="80" className="w-full">
                    <img
                      src={r.img}
                      alt={r.name}
                      className="w-full h-32 object-cover rounded-xl"
                      style={{ border: '1px solid rgba(74,222,128,0.1)' }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </CardItem>

                  <CardItem translateZ="100" translateX={10} translateY={-10} className="absolute top-2 right-2 text-3xl">
                    {r.emoji}
                  </CardItem>

                  <CardItem translateZ="50" className="mt-3 font-bold text-sm text-white w-full block">
                    {r.name}
                  </CardItem>

                  <CardItem as="p" translateZ="40" className="text-xs mt-1 w-full" style={{ color: '#6b7280' }}>
                    {r.cuisine} · {r.cal}
                  </CardItem>

                  <CardItem translateZ="60" className="mt-3 flex items-center justify-between w-full">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: 'rgba(74,222,128,0.08)', color: '#86efac', border: '1px solid rgba(74,222,128,0.12)' }}>
                      🧬 {r.tag}
                    </span>
                    <span className="text-xs font-bold" style={{ color: '#4ade80' }}>Analyze →</span>
                  </CardItem>
                </CardBody>
              </CardContainer>
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
            <div key={d.label} className="rounded-2xl p-5 transition-all hover:scale-105" style={{ background: d.bg, border: `1px solid ${d.border}` }}>
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