'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

function GenomeRing({ label, score, color, details }: { label: string; score: number; color: string; details: string[] }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#1f2937" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
        <text x="50" y="54" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">{score}</text>
      </svg>
      <div className="text-center">
        <div className="text-white font-bold text-sm">{label}</div>
        <div className="mt-1 flex flex-col gap-1">
          {details.map((d, i) => (
            <div key={i} className="text-gray-400 text-xs">{d}</div>
          ))}
        </div>
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

  async function handleAnalyze() {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setRecipe(null);
    setGenome(null);

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

  function handleGoal() {
    router.push('/personalize');
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-900">
        <button onClick={() => router.push('/landing')} className="font-black text-xl tracking-tight">
          <span className="text-emerald-400">F</span>LAVOLUTION
        </button>
        <span className="text-gray-500 text-sm">Recipe DNA Analyzer</span>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Search */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-3">Decode Any Recipe's DNA</h1>
          <p className="text-gray-500 mb-8">Enter a recipe name to analyze its 4-dimensional genome</p>

          <div className="flex gap-3 max-w-xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="e.g. Butter Chicken, Avocado Toast..."
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 text-sm"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !query.trim()}
              className="bg-emerald-400 text-black font-bold px-6 py-4 rounded-xl hover:bg-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
            >
              {loading ? 'Analyzing...' : 'Analyze DNA'}
            </button>
          </div>

          {error && (
            <div className="mt-4 text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 text-sm max-w-xl mx-auto">
              {error}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 text-emerald-400">
              <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              <span className="font-medium">Sequencing recipe genome...</span>
            </div>
          </div>
        )}

        {/* Results */}
        {recipe && genome && !loading && (
          <div className="space-y-8 animate-fade-in">
            {/* Recipe header */}
            <div className="flex gap-6 items-start bg-gray-950 border border-gray-800 rounded-2xl p-6">
              {recipe.image && (
                <img src={recipe.image} alt={recipe.title} className="w-32 h-32 object-cover rounded-xl flex-shrink-0" />
              )}
              <div>
                <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Genome Detected</div>
                <h2 className="text-2xl font-black mb-2">{recipe.title}</h2>
                <div className="flex gap-4 text-sm text-gray-400">
                  {recipe.readyInMinutes && <span>⏱ {recipe.readyInMinutes} min</span>}
                  {recipe.servings && <span>🍽 {recipe.servings} servings</span>}
                  {recipe.cuisines?.length > 0 && <span>🌍 {recipe.cuisines[0]}</span>}
                </div>
              </div>
            </div>

            {/* 4 Genome rings */}
            <div>
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6 text-center">4-Dimensional Recipe Genome</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-gray-950 border border-gray-800 rounded-2xl p-8">
                <GenomeRing
                  label="Flavor"
                  score={genome.flavor?.score ?? 0}
                  color="#f472b6"
                  details={[
                    genome.flavor?.dominant ?? '',
                    `Complexity: ${genome.flavor?.complexity ?? 0}`,
                  ]}
                />
                <GenomeRing
                  label="Nutrition"
                  score={genome.nutrition?.score ?? 0}
                  color="#60a5fa"
                  details={[
                    `${genome.nutrition?.calories ?? 0} kcal`,
                    `P: ${genome.nutrition?.protein ?? 0}g`,
                  ]}
                />
                <GenomeRing
                  label="Health"
                  score={genome.health?.score ?? 0}
                  color="#facc15"
                  details={[
                    `GI: ${genome.health?.glycemicIndex ?? ''}`,
                    genome.health?.diabeticFriendly ? 'Diabetic ✓' : 'Diabetic ✗',
                  ]}
                />
                <GenomeRing
                  label="Sustainability"
                  score={genome.sustainability?.score ?? 0}
                  color="#34d399"
                  details={[
                    `Eco: ${genome.sustainability?.ecoScore ?? ''}`,
                    `${genome.sustainability?.carbonFootprint ?? 0} kg CO₂`,
                  ]}
                />
              </div>
            </div>

            {/* Molecules */}
            {genome.flavor?.molecules?.length > 0 && (
              <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Flavor Molecules Detected</h3>
                <div className="flex flex-wrap gap-2">
                  {genome.flavor.molecules.map((m: string) => (
                    <span key={m} className="bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs px-3 py-1 rounded-full">{m}</span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="text-center pt-4">
              <button
                onClick={handleGoal}
                className="bg-emerald-400 text-black font-black text-lg px-12 py-5 rounded-full hover:bg-emerald-300 transition-all transform hover:scale-105 shadow-lg shadow-emerald-400/25"
              >
                Choose Your Evolution Goal →
              </button>
              <p className="text-gray-600 text-sm mt-3">8 mutation goals available</p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!recipe && !loading && (
          <div className="text-center py-20 text-gray-700">
            <div className="text-6xl mb-4">🧬</div>
            <p className="text-lg font-medium">Search for a recipe to begin sequencing</p>
            <p className="text-sm mt-2">Try "Butter Chicken", "Caesar Salad", or "Chocolate Cake"</p>
          </div>
        )}
      </div>
    </main>
  );
}