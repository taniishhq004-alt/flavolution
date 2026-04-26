'use client';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

const GOALS = [
  { id: 'vegetarian', label: 'Vegetarian', emoji: '🥦', desc: 'Remove all meat, keep full flavor & satisfaction', color: '#4ade80', bg: 'rgba(74,222,128,0.07)', border: 'rgba(74,222,128,0.2)', tag: 'Plant-Based' },
  { id: 'vegan', label: 'Vegan', emoji: '🌱', desc: 'Zero animal products — plants only', color: '#86efac', bg: 'rgba(134,239,172,0.07)', border: 'rgba(134,239,172,0.2)', tag: 'Ethical' },
  { id: 'keto', label: 'Keto', emoji: '🥑', desc: 'High fat, ultra-low carb, ketogenic', color: '#fb923c', bg: 'rgba(251,146,60,0.07)', border: 'rgba(251,146,60,0.2)', tag: 'Fat Adapted' },
  { id: 'diabetic-friendly', label: 'Diabetic Friendly', emoji: '💉', desc: 'Low GI, blood sugar optimized meals', color: '#60a5fa', bg: 'rgba(96,165,250,0.07)', border: 'rgba(96,165,250,0.2)', tag: 'Medical' },
  { id: 'low-carbon', label: 'Low Carbon', emoji: '🌍', desc: 'Minimize environmental footprint', color: '#34d399', bg: 'rgba(52,211,153,0.07)', border: 'rgba(52,211,153,0.2)', tag: 'Eco' },
  { id: 'heart-healthy', label: 'Heart Healthy', emoji: '❤️', desc: 'Low sodium, low saturated fat', color: '#f87171', bg: 'rgba(248,113,113,0.07)', border: 'rgba(248,113,113,0.2)', tag: 'Cardio' },
  { id: 'high-protein', label: 'High Protein', emoji: '💪', desc: 'Optimized for muscle building & recovery', color: '#fbbf24', bg: 'rgba(251,191,36,0.07)', border: 'rgba(251,191,36,0.2)', tag: 'Athletic' },
  { id: 'gluten-free', label: 'Gluten Free', emoji: '🌾', desc: 'Remove all gluten-containing ingredients', color: '#c084fc', bg: 'rgba(192,132,252,0.07)', border: 'rgba(192,132,252,0.2)', tag: 'Allergy' },
];

export default function PersonalizePage() {
  const router = useRouter();

  function handleGoal(id: string) {
    storage.setGoal(id);
    router.push('/results');
  }

  return (
    <main className="min-h-screen text-white" style={{
      background: 'linear-gradient(135deg, #080612 0%, #0d0a1a 60%, #060d12 100%)',
      fontFamily: "'DM Sans', system-ui, sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;500;700;900&family=Cormorant+Garamond:ital,wght@0,700;1,600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .goal-card { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s; }
        .goal-card:hover { transform: translateY(-8px) scale(1.02); }
        .stagger-1 { animation: fadeUp 0.5s ease 0.05s both; }
        .stagger-2 { animation: fadeUp 0.5s ease 0.1s both; }
        .stagger-3 { animation: fadeUp 0.5s ease 0.15s both; }
        .stagger-4 { animation: fadeUp 0.5s ease 0.2s both; }
        .stagger-5 { animation: fadeUp 0.5s ease 0.25s both; }
        .stagger-6 { animation: fadeUp 0.5s ease 0.3s both; }
        .stagger-7 { animation: fadeUp 0.5s ease 0.35s both; }
        .stagger-8 { animation: fadeUp 0.5s ease 0.4s both; }
      `}</style>

      {/* Purple blob */}
      <div style={{ position: 'fixed', top: '0', left: '20%', width: '60vw', height: '50vh', background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '0', right: '10%', width: '40vw', height: '40vh', background: 'radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <button onClick={() => router.push('/')} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #4c1d95, #8b5cf6)' }}>🧬</div>
          <div>
            <div className="font-bold text-base leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Flavolution</div>
            <div className="text-xs" style={{ color: '#8b5cf6' }}>Goal Selection</div>
          </div>
        </button>

        {/* Step indicator */}
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(139,92,246,0.15)', color: '#6b7280' }}>1</div>
          <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(139,92,246,0.3)', color: '#a78bfa' }}>2</div>
          <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(255,255,255,0.04)', color: '#374151' }}>3</div>
        </div>

        <button onClick={() => router.push('/')} className="text-sm px-4 py-2 rounded-xl" style={{ color: '#6b7280', border: '1px solid rgba(255,255,255,0.06)' }}>
          ← Back
        </button>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#a78bfa' }}>
            Step 2 of 3 — Choose Your Mutation Goal
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            How Should We<br /><em style={{ color: '#a78bfa' }}>Evolve This Recipe?</em>
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: '#6b7280' }}>
            Our AI will mutate all 4 genome dimensions simultaneously based on your goal.
          </p>
        </div>

        {/* Goals grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GOALS.map((g, i) => (
            <button key={g.id} onClick={() => handleGoal(g.id)}
              className={`goal-card stagger-${i + 1} text-left rounded-2xl p-5`}
              style={{ background: g.bg, border: `1px solid ${g.border}` }}>
              <div className="text-3xl mb-3">{g.emoji}</div>
              <div className="font-bold text-sm mb-1 text-white">{g.label}</div>
              <div className="text-xs leading-relaxed mb-4" style={{ color: '#6b7280' }}>{g.desc}</div>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${g.color}15`, color: g.color, border: `1px solid ${g.color}30` }}>
                {g.tag}
              </span>
            </button>
          ))}
        </div>

        <p className="text-center text-xs mt-8" style={{ color: '#374151' }}>
          AI-powered mutation via LLaMA 3.3 · All 4 genome dimensions update simultaneously
        </p>
      </div>
    </main>
  );
}