import { NextRequest, NextResponse } from 'next/server';
import { searchRecipe } from '@/lib/api/spoonacular';
import { buildGenome } from '@/lib/api/openai';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const recipe = await searchRecipe(query);

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    const genome = await buildGenome(recipe);

    return NextResponse.json({ recipe, genome });
  } catch (err: any) {
    console.error('Recipe API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}