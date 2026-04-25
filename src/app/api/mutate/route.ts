import { NextRequest, NextResponse } from 'next/server';
import { mutateRecipe } from '@/lib/api/openai';

export async function POST(req: NextRequest) {
  try {
    const { recipe, genome, goal } = await req.json();

    if (!recipe || !genome || !goal) {
      return NextResponse.json({ error: 'recipe, genome and goal are required' }, { status: 400 });
    }

    const result = await mutateRecipe(recipe, genome, goal);

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Mutate API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}