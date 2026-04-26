'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

function Ring({ score, color, size = 90 }: { score: number; color: string; size?: number }) {
  const r = size * 0.37;
  const circ = 2 * Math.PI * r;
  const dash = Math.min((score / 100) * circ, circ);
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={c} cy={c} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
      <circle cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth="7"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${c} ${c})`}
        style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.34,1.56,0.64,1)', filter: `drop-shadow(0 0 6px ${color}50)` }} />
      <text x={c} y={c + 5} textAnchor="middle" fill="white" fontSize={size * 0.2} fontWeight="900">{score}</text>
    </svg>
  );
}

function GenomePanel({ title, genome, accent }: { title: string; genome: any; accent: string }) {
  if (!genome) return null;
  return (
    <div className="rounded-3xl overflow-hidden flex flex-col" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${accent}20` }}>
      <div className="px-6 py-4" style={{ background: `${accent}10`, borderBottom: `1px solid ${accent}15` }}>
        <div className="font-bold text-sm" style={{ color: accent }}>{title}</div>
      </div>
      <div className="p-6 flex-1">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { key: 'flavor', label: 'Flavor', color: '#f472b6', icon: '👅' },
            { key: 'nutrition', label: 'Nutrition', color: '#60a5fa', icon: '⚗️' },
            { key: 'health', label: 'Health', color: '#facc15', icon: '❤️' },
            { key: 'sustainability', label: 'Eco', color: '#4ade80', icon: '🌍' },
          ].map(({ key, label, color, icon }) => (
            <div key={key} className="flex flex-col items-center gap-1">
              <Ring score={genome[key]?.score ?? 0} color={color} size={80} />
              <span className="text-xs" style={{ color: '#6b7280' }}>{icon} {label}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {[
            { label: 'Calories', val: `${genome.nutrition?.calories ?? 0} kcal` },
            { label: 'Protein', val: `${genome.nutrition?.protein ?? 0}g` },
            { label: 'Carbs', val: `${genome.nutrition?.carbs ?? 0}g` },
            { label: 'Fat', val: `${genome.nutrition?.fat ?? 0}g` },
            { label: 'Fiber', val: `${genome.nutrition?.fiber ?? 0}g` },
            { label: 'Eco Score', val: genome.sustainability?.ecoScore ?? '-' },
            { label: 'CO₂/serving', val: `${genome.sustainability?.carbonFootprint ?? 0} kg` },
            { label: 'Glycemic Index', val: genome.health?.glycemicIndex ?? '-' },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center text-xs">
              <span style={{ color: '#6b7280' }}>{row.label}</span>
              <span className="font-bold text-white">{row.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const GOAL_META: Record<string, { label: string; emoji: string; color: string }> = {
  'vegetarian': { label: 'Vegetarian', emoji: '🥦', color: '#4ade80' },
  'vegan': { label: 'Vegan', emoji: '🌱', color: '#86efac' },
  'keto': { label: 'Keto', emoji: '🥑', color: '#fb923c' },
  'diabetic-friendly': { label: 'Diabetic Friendly', emoji: '💉', color: '#60a5fa' },
  'low-carbon': { label: 'Low Carbon', emoji: '🌍', color: '#34d399' },
  'heart-healthy': { label: 'Heart Healthy', emoji: '❤️', color: '#f87171' },
  'high-protein': { label: 'High Protein', emoji: '💪', color: '#fbbf24' },
  'gluten-free': { label: 'Gluten Free', emoji: '🌾', color: '#c084fc' },
};

export default function ResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);
  const [originalGenome, setOriginalGenome] = useState<any>(null);
  const [originalRecipe, setOriginalRecipe] = useState<any>(null);
  const [goal, setGoal] = useState('');

  useEffect(() => {
    const recipe = storage.getRecipe();
    const genome = storage.getGenome();
    const g = storage.getGoal();
    if (!recipe || !genome || !g) { router.push('/'); return; }
    setOriginalRecipe(recipe);
    setOriginalGenome(genome);
    setGoal(g);

    const cached = storage.getMutationResult();
    if (cached && cached.goal === g && cached.recipeId === recipe.id) {
      setResult(cached); setLoading(false); return;
    }

    fetch('/api/mutate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipe, genome, goal: g }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        const m = { ...data, goal: g, recipeId: recipe.id };
        storage.setMutationResult(m);
        setResult(m);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const meta = GOAL_META[goal] ?? { label: goal, emoji: '🧬', color: '#4ade80' };

  const diff = (key: string) => {
    if (!result?.mutatedGenome || !originalGenome) return null;
    const b = originalGenome[key]?.score ?? 0;
    const a = result.mutatedGenome[key]?.score ?? 0;
    return { before: b, after: a, diff: a - b };
  };

  return (
    <main className="min-h-screen text-white" style={{
      background: 'linear-gradient(135deg, #020c0f 0%, #030f10 60%, #060d06 100%)',
      fontFamily: "'DM Sans', system-ui, sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;500;700;900&family=Cormorant+Garamond:ital,wght@0,700;1,600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes countUp { from { opacity:0; transform:scale(0.5); } to { opacity:1; transform:scale(1); } }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .count-up { animation: countUp 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      `}</style>

      {/* Teal blobs */}
      <div style={{ position: 'fixed', top: '0', left: '0', width: '50vw', height: '50vh', background: 'radial-gradient(circle, rgba(20,184,166,0.07), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '0', right: '0', width: '40vw', height: '40vh', background: 'radial-gradient(circle, rgba(6,182,212,0.05), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <button onClick={() => router.push('/')} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #0f766e, #2dd4bf)' }}>🧬</div>
          <div>
            <div className="font-bold text-base leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Flavolution</div>
            <div className="text-xs" style={{ color: '#2dd4bf' }}>Mutation Results</div>
          </div>
        </button>
        <div className="flex gap-3">
          <button onClick={() => router.push('/personalize')} className="text-xs px-4 py-2 rounded-xl" style={{ color: '#6b7280', border: '1px solid rgba(255,255,255,0.06)' }}>
            ← Change Goal
          </button>
          <button onClick={() => { storage.clear(); router.push('/'); }} className="text-xs px-4 py-2 rounded-xl font-bold" style={{ background: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.2)' }}>
            New Recipe
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

        {/* LOADING */}
        {loading && (
          <div className="text-center py-32">
            <div className="inline-flex flex-col items-center gap-5">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(45,212,191,0.15)' }} />
                <div className="absolute inset-2 rounded-full animate-spin border-2 border-transparent" style={{ borderTopColor: '#2dd4bf' }} />
                <div className="absolute inset-0 flex items-center justify-center text-3xl">🧬</div>
              </div>
              <div>
                <div className="font-bold text-lg mb-1" style={{ color: '#2dd4bf' }}>
                  Mutating for {meta.emoji} {meta.label}...
                </div>
                <div className="text-sm" style={{ color: '#4b5563' }}>AI is evolving all 4 genome dimensions</div>
              </div>
            </div>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto px-8 py-6 rounded-2xl" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <div className="text-2xl mb-3">⚠️</div>
              <div className="font-bold mb-2 text-red-400">Mutation Failed</div>
              <div className="text-sm mb-4" style={{ color: '#6b7280' }}>{error}</div>
              <button onClick={() => router.push('/')} className="px-6 py-2 rounded-xl text-sm font-bold" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {result && !loading && (
          <div className="space-y-6 fade-up">

            {/* Success header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold mb-5" style={{ background: `${meta.color}12`, border: `1px solid ${meta.color}25`, color: meta.color }}>
                ✓ Mutation Complete · {meta.emoji} {meta.label}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {originalRecipe?.title}
                <span className="mx-3" style={{ color: '#374151' }}>→</span>
                <em style={{ color: meta.color }}>{result.mutatedRecipe?.title}</em>
              </h1>
            </div>

            {/* Score delta pills */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { key: 'flavor', label: 'Flavor', color: '#f472b6', icon: '👅' },
                { key: 'nutrition', label: 'Nutrition', color: '#60a5fa', icon: '⚗️' },
                { key: 'health', label: 'Health', color: '#facc15', icon: '❤️' },
                { key: 'sustainability', label: 'Eco', color: '#4ade80', icon: '🌍' },
              ].map(({ key, label, color, icon }) => {
                const d = diff(key);
                if (!d) return null;
                return (
                  <div key={key} className="rounded-2xl p-4 text-center count-up" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="text-xs mb-1" style={{ color: '#6b7280' }}>{icon} {label}</div>
                    <div className="text-2xl font-black" style={{ color }}>{d.after}</div>
                    <div className="text-xs font-bold mt-1" style={{ color: d.diff >= 0 ? '#4ade80' : '#f87171' }}>
                      {d.diff >= 0 ? '↑' : '↓'} {Math.abs(d.diff)} pts
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Before / After */}
            <div className="grid md:grid-cols-2 gap-5">
              <GenomePanel title="⚪ Before — Original Recipe" genome={originalGenome} accent="#6b7280" />
              <GenomePanel title={`${meta.emoji} After — ${meta.label} Evolution`} genome={result.mutatedGenome} accent={meta.color} />
            </div>

            {/* Key mutations */}
            {result.mutatedRecipe?.keyChanges?.length > 0 && (
              <div className="rounded-2xl p-6" style={{ background: `${meta.color}08`, border: `1px solid ${meta.color}18` }}>
                <div className="text-xs font-bold tracking-widest mb-4" style={{ color: meta.color }}>KEY MUTATIONS APPLIED</div>
                <div className="space-y-3">
                  {result.mutatedRecipe.keyChanges.map((c: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">→</span>
                      <p className="text-sm leading-relaxed" style={{ color: '#d1d5db' }}>{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Evolved ingredients */}
            {result.mutatedRecipe?.ingredients?.length > 0 && (
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="text-xs font-bold tracking-widest mb-4" style={{ color: '#6b7280' }}>EVOLVED INGREDIENTS</div>
                <div className="flex flex-wrap gap-2">
                  {result.mutatedRecipe.ingredients.map((ing: string, i: number) => (
                    <span key={i} className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.06)' }}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            {result.mutatedRecipe?.instructions && (
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="text-xs font-bold tracking-widest mb-4" style={{ color: '#6b7280' }}>EVOLVED COOKING METHOD</div>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{result.mutatedRecipe.instructions}</p>
              </div>
            )}

            {/* Bottom actions */}
            <div className="flex flex-wrap gap-4 justify-center pt-6 pb-8">
              <button onClick={() => router.push('/personalize')} className="px-8 py-4 rounded-2xl font-bold text-sm" style={{ background: 'rgba(255,255,255,0.05)', color: '#e5e7eb', border: '1px solid rgba(255,255,255,0.08)' }}>
                Try Another Goal
              </button>
              <button onClick={() => { storage.clear(); router.push('/'); }} className="px-8 py-4 rounded-2xl font-bold text-sm text-black" style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)`, boxShadow: `0 0 30px ${meta.color}25` }}>
                Evolve New Recipe →
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}