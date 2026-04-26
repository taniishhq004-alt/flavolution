# 🧬 Flavolution — The Recipe DNA Evolution Platform

> *Computational Gastronomy meets AI — decode any recipe's 4-dimensional genome and evolve it toward your goals.*

---

## 🎯 What is Flavolution?

Flavolution treats every recipe like a **living organism** with a genetic code. We decode dishes into a **4-dimensional genome** across flavor, nutrition, health, and sustainability — then use AI to **mutate** them toward 8 personalized goals in real time.

```
Butter Chicken  ──🧬──►  Keto Butter Chicken
    Eco: D              Eco: B
    Carbs: 38g          Carbs: 6g
    Health: 52          Health: 79
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧬 **4D Genome Rings** | Circular visualization across Flavor, Nutrition, Health & Eco |
| 🤖 **AI Mutation Engine** | LLaMA 3.3 70B via Groq rewrites recipes intelligently |
| 📊 **Before/After Comparison** | Side-by-side genome comparison with score deltas |
| 🍽️ **Step-by-Step Instructions** | Interactive recipe walkthrough |
| 🥦 **8 Mutation Goals** | Vegetarian, Vegan, Keto, Diabetic, Low-Carbon, Heart Healthy, High Protein, Gluten Free |
| 🌍 **Sustainability Scoring** | Carbon footprint, water usage & eco-score per serving |
| ⚡ **Real-time Data** | Live recipe data from Spoonacular API |

---

## 🛠️ Tech Stack

```
Frontend    →  Next.js 14 (App Router) + TypeScript
Styling     →  Tailwind CSS v4
Recipe API  →  Spoonacular API
AI Engine   →  Groq API (LLaMA 3.3 70B) — FREE
Fonts       →  Cormorant Garamond + DM Sans
Deploy      →  Vercel
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/flavolution.git
cd flavolution
```

### 2. Install dependencies
```bash
npm install
npm install groq-sdk axios
```

### 3. Set up environment variables

Create a `.env.local` file in the root:
```env
SPOONACULAR_API_KEY=your_spoonacular_key_here
GROQ_API_KEY=your_groq_key_here
```

**Get your free API keys:**
- 🍴 **Spoonacular** → [spoonacular.com/food-api](https://spoonacular.com/food-api) (free tier: 150 req/day)
- ⚡ **Groq** → [console.groq.com](https://console.groq.com) (completely free)

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
flavolution/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 🔍 Main search + genome display
│   │   ├── landing/page.tsx      # 🏠 Landing page with recipe list
│   │   ├── personalize/page.tsx  # 🎯 Goal selection (8 mutations)
│   │   ├── results/page.tsx      # 📊 Before/After comparison
│   │   └── api/
│   │       ├── recipe/route.ts   # Spoonacular + genome builder
│   │       └── mutate/route.ts   # AI mutation engine
│   └── lib/
│       ├── api/
│       │   ├── spoonacular.ts    # Recipe search & nutrition
│       │   └── openai.ts         # Groq / LLaMA integration
│       └── storage.ts            # localStorage helper
├── .env.local                    # API keys (never commit!)
└── README.md
```

---

## 🧬 The 4 Genome Dimensions

### 👅 Flavor Genome
- Dominant flavor family (Umami, Sweet, Spicy...)
- Key flavor molecules detected
- Complexity score (0-100)

### ⚗️ Nutrition DNA
- Macros: Protein, Carbs, Fat, Fiber
- Total calories per serving
- Nutrition score (0-100)

### ❤️ Health Alleles
- Glycemic Index (Low / Medium / High)
- Inflammatory score (-10 to +10)
- Heart health score
- Diabetic compatibility

### 🌍 Sustainability Traits
- Carbon footprint (kg CO₂/serving)
- Water usage (liters/serving)
- Land use (m²/serving)
- Eco Score (A–E)

---

## 🎯 8 Mutation Goals

| Goal | Focus |
|---|---|
| 🥦 Vegetarian | Remove meat, preserve flavor |
| 🌱 Vegan | Zero animal products |
| 🥑 Keto | High fat, ultra-low carbs |
| 💉 Diabetic Friendly | Low GI, blood sugar optimized |
| 🌍 Low Carbon | Minimize environmental impact |
| ❤️ Heart Healthy | Low sodium + saturated fat |
| 💪 High Protein | Optimized for muscle building |
| 🌾 Gluten Free | Remove all gluten ingredients |

---

## 🖥️ Pages & Flow

```
/landing  →  Hero + recipe list (16 recipes to explore)
    ↓
/         →  Search any recipe → 4D genome rings + step-by-step
    ↓
/personalize  →  Choose from 8 mutation goals
    ↓
/results  →  Before/After genome comparison + mutated recipe
```

---

## 🚢 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard:
- `SPOONACULAR_API_KEY`
- `GROQ_API_KEY`

---

## 📜 License

MIT License — feel free to use, modify and distribute.

---

## 👨‍💻 Author

Built with ❤️ and 🧬 for the future of food.

> *"Every recipe has DNA. We just learned to read it."*