'use client';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

const GOALS = [
  { id: 'vegetarian', label: 'Vegetarian', emoji: '🥦', desc: 'Remove all meat, keep full flavor', color: 'border-green-500/40 hover:border-green-400 hover:bg-green-500/10' },
  { id: 'vegan', label: 'Vegan', emoji: '🌱', desc: 'Plant-based, zero animal products', color: 'border-lime-500/40 hover:border-lime-400 hover:bg-lime-500/10' },
  { id: 'keto', label: 'Keto', emoji: '🥑', desc: 'High fat, low carb, ketogenic', color: 'border-orange-500/40 hover:border-orange-400 hover:bg-orange-500/10' },
  { id: 'diabetic-friendly', label: 'Diabetic Friendly', emoji: '💉', desc: 'Low GI, blood sugar optimized', color: 'border-blue-500/40 hover:border-blue-400 hover:bg-blue-500/10' },
  { id: 'low-carbon', label: 'Low Carbon', emoji: '🌍', desc: 'Minimize environmental footprint', color: 'border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-500/10' },
  { id: 'heart-healthy', label: 'Heart Healthy', emoji: '❤️', desc: 'Low sodium, low saturated fat', color: 'border-red-500/40 hover:border-red-400 hover:bg-red-500/10' },
  { id: 'high-protein', label: 'High Protein', emoji: '💪', desc: 'Muscle building, protein-rich', color: 'border-yellow-500/40 hover:border-yellow-400 hover:bg-yellow-500/10' },
  { id: 'gluten-free', label: 'Gluten Free', emoji: '🌾', desc: 'Remove all gluten-containing ingredients', color: 'border-purple-500/40 hover:border-purple-400 hover:bg-purple-500/10' },
];

export default function PersonalizePage() {
  const router = useRouter();

  function handleGoalSelect(goalId: string) {
    storage.setGoal(goalId);
    router.push('/results');
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-900">
        <button onClick={() => router.push('/')} className="font-black text-xl tracking-tight">
          <span className="text-emerald-400">F</span>LAVOLUTION
        </button>
        <button onClick={() => router.push('/')} className="text-gray-500 text-sm hover:text-white transition-colors">
          ← Back to search
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">Step 2 of 2</div>
          <h1 className="text-4xl font-black mb-3">Choose Your Evolution Goal</h1>
          <p className="text-gray-500">Select how you want to mutate this recipe. Our AI will evolve all 4 genome dimensions.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GOALS.map((goal) => (
            <button
              key={goal.id}
              onClick={() => handleGoalSelect(goal.id)}
              className={`bg-gray-950 border rounded-2xl p-6 text-left transition-all transform hover:scale-105 hover:shadow-lg ${goal.color}`}
            >
              <div className="text-3xl mb-3">{goal.emoji}</div>
              <div className="font-bold text-white text-sm mb-1">{goal.label}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{goal.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}