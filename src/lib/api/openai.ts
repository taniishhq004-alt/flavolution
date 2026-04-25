import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function buildGenome(recipe: any) {
  const prompt = `
You are a food scientist. Analyze this recipe and return a JSON genome object.

Recipe: ${recipe.title}
Ingredients: ${recipe.extendedIngredients?.map((i: any) => i.original).join(', ')}
Nutrition: ${JSON.stringify(recipe.nutrition?.nutrients?.slice(0, 10))}

Return ONLY valid JSON (no markdown) with this exact shape:
{
  "flavor": {
    "score": <0-100>,
    "dominant": "<e.g. Umami, Sweet, Spicy>",
    "molecules": ["<molecule1>", "<molecule2>", "<molecule3>"],
    "complexity": <0-100>
  },
  "nutrition": {
    "score": <0-100>,
    "calories": <number>,
    "protein": <grams>,
    "carbs": <grams>,
    "fat": <grams>,
    "fiber": <grams>
  },
  "health": {
    "score": <0-100>,
    "glycemicIndex": <low|medium|high>,
    "inflammatoryScore": <-10 to 10, negative=anti-inflammatory>,
    "heartScore": <0-100>,
    "diabeticFriendly": <true|false>
  },
  "sustainability": {
    "score": <0-100>,
    "carbonFootprint": <kg CO2 per serving>,
    "waterUsage": <liters per serving>,
    "landUse": <m2 per serving>,
    "ecoScore": <A|B|C|D|E>
  }
}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  const text = res.choices[0].message.content ?? '{}';
  return JSON.parse(text);
}

export async function mutateRecipe(recipe: any, genome: any, goal: string) {
  const prompt = `
You are a computational gastronomy expert. Mutate this recipe for the goal: "${goal}".

Original Recipe: ${recipe.title}
Ingredients: ${recipe.extendedIngredients?.map((i: any) => i.original).join(', ')}
Instructions: ${recipe.instructions ?? 'Standard cooking method'}
Current genome: ${JSON.stringify(genome)}

Return ONLY valid JSON (no markdown) with this exact shape:
{
  "mutatedRecipe": {
    "title": "<mutated recipe title>",
    "ingredients": ["<ingredient 1>", "<ingredient 2>", ...],
    "instructions": "<brief instructions>",
    "keyChanges": ["<change 1>", "<change 2>", "<change 3>"]
  },
  "mutatedGenome": {
    "flavor": {
      "score": <0-100>,
      "dominant": "<flavor>",
      "molecules": ["<mol1>", "<mol2>", "<mol3>"],
      "complexity": <0-100>
    },
    "nutrition": {
      "score": <0-100>,
      "calories": <number>,
      "protein": <grams>,
      "carbs": <grams>,
      "fat": <grams>,
      "fiber": <grams>
    },
    "health": {
      "score": <0-100>,
      "glycemicIndex": "<low|medium|high>",
      "inflammatoryScore": <-10 to 10>,
      "heartScore": <0-100>,
      "diabeticFriendly": <true|false>
    },
    "sustainability": {
      "score": <0-100>,
      "carbonFootprint": <number>,
      "waterUsage": <number>,
      "landUse": <number>,
      "ecoScore": "<A|B|C|D|E>"
    }
  }
}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
  });

  const text = res.choices[0].message.content ?? '{}';
  return JSON.parse(text);
}