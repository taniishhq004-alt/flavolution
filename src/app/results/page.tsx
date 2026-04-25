'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

function Ring({ score, color, size = 80 }: { score: number; color: string; size?: number }) {
  const r = size * 0.38;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={c} cy={c} r={r} fill="none" stroke="#1f2937" strokeWidth="6" />
      <circle cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${c} ${c})`}
        style={{ transition: 'stroke-dasharray 1s ease' }}
      />
      <text x={c} y={c + 5} textAnchor="middle" fill="white" fontSize={size * 0.18} fontWeight="bold">{score}</text>
    </svg>
  );
}

function GenomeCard({ label, genome, color }: { label: string; genome: any; color: string }) {
  if (!genome) return null;
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
      <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-5">{label}</div>
      <div className="grid grid-cols-2 gap-6 mb-5">
        <div className="flex flex-col items-center gap-2">
          <Ring score={genome.flavor?.score ?? 0} color="#f472b6" />
          <span className="text-xs text-gray-400">Flavor</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Ring score={genome.nutrition?.score ?? 0} color="#60a5fa" />
          <span className="text-xs text-gray-400">Nutrition</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Ring score={genome.health?.score ?? 0} color="#facc15" />
          <span className="text-xs text-gray-400">Health</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Ring score={genome.sustainability?.score ?? 0} color="#34d399" />
          <span className="text-xs text-gray-400">Eco</span>
        </div>
      </div>
      <div className="space-y-2 text-xs border-t border-gray-800 pt-4">
        <div className="flex justify-between text-gray-400">
          <span>Calories</span>
          <span className="text-white font-bold">{genome.nutrition?.calories ?? 0} kcal</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Protein</span>
          <span className="text-white font-bold">{genome.nutrition?.protein ?? 0}g</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Carbs</span>
          <span className="text-white font-bold">{genome.nutrition?.carbs ?? 0}g</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>CO₂</span>
          <span className="text-white font-bold">{genome.sustainability?.carbonFootprint ?? 0} kg</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Eco Score</span>
          <span className="font-bold" style={{ color }}>{genome.sustainability?.ecoScore ?? ''}</span>
        </div>
      </div>
    </div>
  );
}

const GOAL_LABELS: Record<string, string> = {
  'vegetarian': 'Vegetarian',
  'vegan': 'Vegan',
  'keto': 'Keto',
  'diabetic-friendly': 'Diabetic Friendly',
  'low-carbon': 'Low Carbon',
  'heart-healthy': 'Heart Healthy',
  'high-protein': 'High Protein',
  'gluten-free': 'Gluten Free',
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
    const selectedGoal = storage.getGoal();

    if (!recipe || !genome || !selectedGoal) {
      router.push('/');
      return;
    }

    setOriginalRecipe(recipe);
    setOriginalGenome(genome);
    setGoal(selectedGoal);

    // Check cache
    const cached = storage.getMutationResult();
    if (cached && cached.goal === selectedGoal && cached.recipeId === recipe.id) {
      setResult(cached);
      setLoading(false);
      return;
    }

    // Run mutation
    fetch('/api/mutate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipe, genome, goal: selectedGoal }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        const withMeta = { ...data, goal: selectedGoal, recipeId: recipe.id };
        storage.setMutationResult(withMeta);
        setResult(withMeta);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const scoreDiff = (key: string) => {
    if (!result?.mutatedGenome || !originalGenome) return null;
    const before = originalGenome[key]?.score ?? 0;
    const after = result.mutatedGenome[key]?.score ?? 0;
    const diff = after - before;
    return { before, after, diff };
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-900">
        <button onClick={() => router.push('/')} className="font-black text-xl tracking-tight">
          <span className="text-emerald-400">F</span>LAVOLUTION
        </button>
        <div className="flex gap-4">
          <button onClick={() => router.push('/personalize')} className="text-gray-500 text-sm hover:text-white transition-colors">
            ← Change Goal
          </button>
          <button onClick={() => { storage.clear(); router.push('/'); }} className="text-gray-500 text-sm hover:text-white transition-colors">
            New Recipe
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {loading && (
          <div className="text-center py-32">
            <div className="inline-flex items-center gap-3 text-emerald-400">
              <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              <span className="font-medium text-lg">Mutating genome for {GOAL_LABELS[goal] ?? goal}...</span>
            </div>
            <p className="text-gray-600 text-sm mt-3">AI is evolving all 4 dimensions simultaneously</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <div className="text-red-400 bg-red-400/10 border border-red-400/20 rounded-2xl px-8 py-6 max-w-md mx-auto">
              <div className="font-bold mb-2">Mutation failed</div>
              <div className="text-sm">{error}</div>
              <button onClick={() => router.push('/')} className="mt-4 bg-red-400 text-black font-bold px-6 py-2 rounded-xl text-sm">
                Try Again
              </button>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/30 rounded-full px-4 py-2 text-emerald-400 text-sm font-medium mb-4">
                ✓ Mutation Complete — {GOAL_LABELS[goal] ?? goal}
              </div>
              <h1 className="text-3xl font-black">{originalRecipe?.title} → {result.mutatedRecipe?.title}</h1>
            </div>

            {/* Score deltas */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { key: 'flavor', label: 'Flavor', color: '#f472b6' },
                { key: 'nutrition', label: 'Nutrition', color: '#60a5fa' },
                { key: 'health', label: 'Health', color: '#facc15' },
                { key: 'sustainability', label: 'Eco', color: '#34d399' },
              ].map(({ key, label, color }) => {
                const d = scoreDiff(key);
                if (!d) return null;
                return (
                  <div key={key} className="bg-gray-950 border border-gray-800 rounded-xl p-4 text-center">
                    <div className="text-xs text-gray-500 mb-1">{label}</div>
                    <div className="text-xl font-black" style={{ color }}>{d.after}</div>
                    <div className={`text-xs font-bold mt-1 ${d.diff >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {d.diff >= 0 ? '+' : ''}{d.diff}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Before / After Genomes */}
            <div className="grid md:grid-cols-2 gap-6">
              <GenomeCard label="Before — Original" genome={originalGenome} color="#9ca3af" />
              <GenomeCard label={`After — ${GOAL_LABELS[goal] ?? goal}`} genome={result.mutatedGenome} color="#34d399" />
            </div>

            {/* Key changes */}
            {result.mutatedRecipe?.keyChanges?.length > 0 && (
              <div className="bg-gray-950 border border-emerald-500/20 rounded-2xl p-6">
                <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">Key Mutations Applied</h3>
                <ul className="space-y-2">
                  {result.mutatedRecipe.keyChanges.map((change: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-emerald-400 font-bold mt-0.5">→</span>
                      <span className="text-gray-300">{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mutated Ingredients */}
            {result.mutatedRecipe?.ingredients?.length > 0 && (
              <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Evolved Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {result.mutatedRecipe.ingredients.map((ing: string, i: number) => (
                    <span key={i} className="bg-gray-800 border border-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">{ing}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            {result.mutatedRecipe?.instructions && (
              <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Evolved Instructions</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{result.mutatedRecipe.instructions}</p>
              </div>
            )}

            {/* Try again */}
            <div className="text-center pt-4">
              <button
                onClick={() => router.push('/personalize')}
                className="bg-gray-800 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-700 transition-all mr-4 text-sm"
              >
                Try Another Goal
              </button>
              <button
                onClick={() => { storage.clear(); router.push('/'); }}
                className="bg-emerald-400 text-black font-bold px-8 py-4 rounded-full hover:bg-emerald-300 transition-all text-sm"
              >
                Evolve New Recipe →
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}