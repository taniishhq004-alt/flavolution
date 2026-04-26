'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

function GenomeRing({ label, score, color, icon, details }: any) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const dash = Math.min((score / 100) * circ, circ);
  return (
    <div className="flex flex-col items-center gap-3 group">
      <div className="relative">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="7"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            transform="rotate(-90 50 50)" style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.34,1.56,0.64,1)', filter: `drop-shadow(0 0 8px ${color}60)` }} />
          <text x="50" y="46" textAnchor="middle" fill="white" fontSize="18" fontWeight="900">{score}</text>
          <text x="50" y="60" textAnchor="middle" fill={color} fontSize="8" fontWeight="600">/100</text>
        </svg>
        <div className="absolute -top-2 -right-2 text-lg">{icon}</div>
      </div>
      <div className="text-center">
        <div className="font-bold text-sm text-white mb-1">{label}</div>
        {details.map((d: string, i: number) => (
          <div key={i} className="text-xs" style={{ color: '#6b7280' }}>{d}</div>
        ))}
      </div>
    </div>
  );
}

export default function MainPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recipe, setRecipe] = useState<any>(null);
  const [genome, setGenome] = useState<any>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  async function handleAnalyze() {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setRecipe(null);
    setGenome(null);
    setActiveStep(null);
    try {
      const res = await fetch('/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRecipe(data.recipe);
      setGenome(data.genome);
      storage.setRecipe(data.recipe);
      storage.setGenome(data.genome);
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  // Parse instructions into steps
  const parseSteps = (instructions: string): string[] => {
    if (!instructions) return [];
    // Remove HTML tags
    const clean = instructions.replace(/<[^>]+>/g, '').trim();
    // Split by numbered steps or sentences
    const numbered = clean.match(/\d+\.\s+[^.!?]+[.!?]*/g);
    if (numbered && numbered.length > 1) return numbered.map(s => s.replace(/^\d+\.\s*/, '').trim());
    // Split by sentences
    return clean.split(/(?<=[.!?])\s+/).filter(s => s.length > 10).slice(0, 8);
  };

  const steps = recipe ? parseSteps(recipe.instructions) : [];

  return (
    <main className="min-h-screen text-white" style={{
      background: 'linear-gradient(135deg, #0c0800 0%, #0f0d00 50%, #080c08 100%)',
      fontFamily: "'DM Sans', system-ui, sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;500;700;900&family=Cormorant+Garamond:ital,wght@0,700;1,600&display=swap');
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .step-card { transition: all 0.3s ease; }
        .step-card:hover { transform: translateX(6px); }
        .search-glow:focus-within { box-shadow: 0 0 0 2px rgba(251,191,36,0.4), 0 0 40px rgba(251,191,36,0.1); }
      `}</style>

      {/* Amber blob */}
      <div style={{ position: 'fixed', top: '20%', right: '10%', width: '40vw', height: '40vh', background: 'radial-gradient(circle, rgba(217,119,6,0.08), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <button onClick={() => router.push('/landing')} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #92400e, #fbbf24)' }}>🧬</div>
          <div>
            <div className="font-bold text-base leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Flavolution</div>
            <div className="text-xs" style={{ color: '#fbbf24' }}>DNA Analyzer</div>
          </div>
        </button>
        <div className="flex items-center gap-2 text-sm" style={{ color: '#6b7280' }}>
          <span>Step</span>
          <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: 'rgba(251,191,36,0.2)', color: '#fbbf24' }}>1</span>
          <span style={{ color: '#374151' }}>→</span>
          <span>2</span>
          <span style={{ color: '#374151' }}>→</span>
          <span>3</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* SEARCH */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Decode Any<br /><em style={{ color: '#fbbf24' }}>Recipe's DNA</em>
          </h1>
          <p className="mb-8 text-base" style={{ color: '#6b7280' }}>Enter any dish name to analyze its 4-dimensional genome</p>

          <div className="search-glow flex gap-3 max-w-lg mx-auto rounded-2xl p-1.5 transition-all" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <input type="text" value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
              placeholder="e.g. Butter Chicken, Avocado Toast..."
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-600 outline-none text-sm" />
            <button onClick={handleAnalyze} disabled={loading || !query.trim()}
              className="px-6 py-3 rounded-xl font-bold text-sm text-black disabled:opacity-40 transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #fbbf24, #d97706)' }}>
              {loading ? '⏳ Analyzing...' : '🧬 Analyze DNA'}
            </button>
          </div>

          {error && (
            <div className="mt-4 max-w-lg mx-auto px-4 py-3 rounded-2xl text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl animate-bounce" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>🧬</div>
              <div className="font-bold" style={{ color: '#fbbf24' }}>Sequencing recipe genome...</div>
              <div className="text-sm" style={{ color: '#4b5563' }}>Analyzing flavor, nutrition, health & sustainability</div>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {recipe && genome && !loading && (
          <div className="space-y-6 fade-up">

            {/* Recipe card */}
            <div className="rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(251,191,36,0.12)' }}>
              <div className="flex gap-6 p-6">
                {recipe.image && (
                  <img src={recipe.image} alt={recipe.title} className="w-28 h-28 rounded-2xl object-cover flex-shrink-0" style={{ border: '2px solid rgba(251,191,36,0.2)' }} />
                )}
                <div className="flex-1">
                  <div className="text-xs font-bold tracking-widest mb-2" style={{ color: '#fbbf24' }}>GENOME DETECTED ✓</div>
                  <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{recipe.title}</h2>
                  <div className="flex flex-wrap gap-3 text-xs">
                    {recipe.readyInMinutes && <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(251,191,36,0.08)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.15)' }}>⏱ {recipe.readyInMinutes} min</span>}
                    {recipe.servings && <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.08)' }}>🍽 {recipe.servings} servings</span>}
                    {recipe.cuisines?.[0] && <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.08)' }}>🌍 {recipe.cuisines[0]}</span>}
                    {recipe.vegan && <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(74,222,128,0.08)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.15)' }}>🌱 Vegan</span>}
                    {recipe.glutenFree && <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(96,165,250,0.08)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.15)' }}>🌾 Gluten Free</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* 4D Genome rings */}
            <div className="rounded-3xl p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(251,191,36,0.1)' }}>
              <div className="text-xs font-bold tracking-widest mb-8 text-center" style={{ color: '#6b7280' }}>4-DIMENSIONAL RECIPE GENOME</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <GenomeRing label="Flavor" score={genome.flavor?.score ?? 0} color="#f472b6" icon="👅"
                  details={[genome.flavor?.dominant ?? '', `Complexity ${genome.flavor?.complexity ?? 0}`]} />
                <GenomeRing label="Nutrition" score={genome.nutrition?.score ?? 0} color="#60a5fa" icon="⚗️"
                  details={[`${genome.nutrition?.calories ?? 0} kcal`, `Protein ${genome.nutrition?.protein ?? 0}g`]} />
                <GenomeRing label="Health" score={genome.health?.score ?? 0} color="#facc15" icon="❤️"
                  details={[`GI: ${genome.health?.glycemicIndex ?? ''}`, genome.health?.diabeticFriendly ? '✓ Diabetic OK' : '✗ Diabetic']} />
                <GenomeRing label="Eco" score={genome.sustainability?.score ?? 0} color="#4ade80" icon="🌍"
                  details={[`Score: ${genome.sustainability?.ecoScore ?? ''}`, `${genome.sustainability?.carbonFootprint ?? 0} kg CO₂`]} />
              </div>
            </div>

            {/* Flavor molecules */}
            {genome.flavor?.molecules?.length > 0 && (
              <div className="rounded-2xl p-5" style={{ background: 'rgba(244,114,182,0.05)', border: '1px solid rgba(244,114,182,0.12)' }}>
                <div className="text-xs font-bold tracking-widest mb-3" style={{ color: '#f472b6' }}>FLAVOR MOLECULES DETECTED</div>
                <div className="flex flex-wrap gap-2">
                  {genome.flavor.molecules.map((m: string) => (
                    <span key={m} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: 'rgba(244,114,182,0.08)', color: '#f9a8d4', border: '1px solid rgba(244,114,182,0.15)' }}>
                      🔬 {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* STEP-BY-STEP RECIPE */}
            {steps.length > 0 && (
              <div className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xs font-bold tracking-widest mb-5" style={{ color: '#6b7280' }}>STEP-BY-STEP INSTRUCTIONS</div>
                <div className="space-y-3">
                  {steps.map((step, i) => (
                    <div key={i} onClick={() => setActiveStep(activeStep === i ? null : i)}
                      className="step-card flex gap-4 p-4 rounded-2xl cursor-pointer"
                      style={{
                        background: activeStep === i ? 'rgba(251,191,36,0.08)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${activeStep === i ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)'}`,
                      }}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                        style={{ background: activeStep === i ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.06)', color: activeStep === i ? '#fbbf24' : '#6b7280' }}>
                        {i + 1}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: activeStep === i ? '#e5e7eb' : '#9ca3af' }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {recipe.extendedIngredients?.length > 0 && (
              <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xs font-bold tracking-widest mb-4" style={{ color: '#6b7280' }}>INGREDIENTS ({recipe.extendedIngredients.length})</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {recipe.extendedIngredients.map((ing: any) => (
                    <div key={ing.id} className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', color: '#9ca3af' }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#fbbf24' }} />
                      {ing.original}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="text-center pt-4 pb-8">
              <button onClick={() => router.push('/personalize')}
                className="px-12 py-5 rounded-2xl font-black text-lg text-black transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #fbbf24, #d97706)', boxShadow: '0 0 50px rgba(251,191,36,0.2)' }}>
                Choose Evolution Goal →
              </button>
              <p className="text-xs mt-2" style={{ color: '#4b5563' }}>8 mutation goals available</p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!recipe && !loading && (
          <div className="text-center py-24" style={{ color: '#374151' }}>
            <div className="text-7xl mb-4 opacity-60">🍽️</div>
            <p className="text-lg font-medium mb-2" style={{ color: '#4b5563' }}>Search for a recipe to begin</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['Butter Chicken', 'Caesar Salad', 'Avocado Toast', 'Pad Thai', 'Shakshuka'].map(s => (
                <button key={s} onClick={() => { setQuery(s); }}
                  className="text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105"
                  style={{ background: 'rgba(251,191,36,0.06)', color: '#78716c', border: '1px solid rgba(251,191,36,0.1)' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}