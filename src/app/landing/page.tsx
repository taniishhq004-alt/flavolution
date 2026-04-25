'use client';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,150,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,150,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-black font-black text-sm">F</div>
          <span className="font-black text-xl tracking-tight">FLAVOLUTION</span>
        </div>
        <button
          onClick={() => router.push('/')}
          className="border border-emerald-400 text-emerald-400 px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-400 hover:text-black transition-all"
        >
          Launch App →
        </button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32">
        <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/30 rounded-full px-4 py-2 text-emerald-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Computational Gastronomy Platform
        </div>

        <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-6">
          Recipes Have
          <br />
          <span className="text-emerald-400">DNA.</span>
        </h1>

        <p className="text-gray-400 text-xl max-w-xl mb-12 leading-relaxed">
          We decode every recipe into a 4-dimensional genome — flavor, nutrition, health, and sustainability — then evolve it toward your goals.
        </p>

        <button
          onClick={() => router.push('/')}
          className="bg-emerald-400 text-black font-black text-lg px-10 py-5 rounded-full hover:bg-emerald-300 transition-all transform hover:scale-105 shadow-lg shadow-emerald-400/30"
        >
          Start Evolving →
        </button>
      </section>

      {/* 4 Genome Dimension Cards */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Flavor Genome', desc: 'Molecules, pairing compatibility & dominant flavor families', color: 'from-pink-500/20 to-pink-500/5', border: 'border-pink-500/30', dot: 'bg-pink-400' },
            { label: 'Nutrition Chromosomes', desc: 'Macros, micros, allergens & caloric density', color: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30', dot: 'bg-blue-400' },
            { label: 'Health Alleles', desc: 'GI index, inflammation score & condition compatibility', color: 'from-yellow-500/20 to-yellow-500/5', border: 'border-yellow-500/30', dot: 'bg-yellow-400' },
            { label: 'Sustainability Traits', desc: 'Carbon footprint, water usage & eco-score', color: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
          ].map((card) => (
            <div key={card.label} className={`bg-gradient-to-b ${card.color} border ${card.border} rounded-2xl p-5`}>
              <div className={`w-3 h-3 rounded-full ${card.dot} mb-4`} />
              <h3 className="font-bold text-white text-sm mb-2">{card.label}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-32 text-center">
        <h2 className="text-3xl font-black mb-12 text-gray-300">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          {[
            { step: '01', title: 'Search', desc: 'Enter any recipe name' },
            { step: '02', title: 'Analyze', desc: 'We decode its 4D genome' },
            { step: '03', title: 'Choose Goal', desc: 'Keto, Vegan, Low-Carbon...' },
            { step: '04', title: 'Evolve', desc: 'See the before/after genome' },
          ].map((s, i) => (
            <div key={s.step} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="text-emerald-400 font-black text-xs mb-1">{s.step}</div>
                <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-center min-w-[100px]">
                  <div className="font-bold text-white text-sm">{s.title}</div>
                  <div className="text-gray-500 text-xs mt-1">{s.desc}</div>
                </div>
              </div>
              {i < 3 && <div className="text-gray-700 font-bold hidden md:block">→</div>}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}