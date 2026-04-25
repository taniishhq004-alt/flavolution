export const storage = {
  setRecipe: (recipe: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentRecipe', JSON.stringify(recipe));
    }
  },
  setGenome: (genome: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentGenome', JSON.stringify(genome));
    }
  },
  setGoal: (goal: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedGoal', goal);
    }
  },
  getRecipe: () => {
    if (typeof window !== 'undefined') {
      const d = localStorage.getItem('currentRecipe');
      return d ? JSON.parse(d) : null;
    }
    return null;
  },
  getGenome: () => {
    if (typeof window !== 'undefined') {
      const d = localStorage.getItem('currentGenome');
      return d ? JSON.parse(d) : null;
    }
    return null;
  },
  getGoal: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedGoal');
    }
    return null;
  },
  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentRecipe');
      localStorage.removeItem('currentGenome');
      localStorage.removeItem('selectedGoal');
      localStorage.removeItem('mutationResult');
    }
  },
  setMutationResult: (result: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mutationResult', JSON.stringify(result));
    }
  },
  getMutationResult: () => {
    if (typeof window !== 'undefined') {
      const d = localStorage.getItem('mutationResult');
      return d ? JSON.parse(d) : null;
    }
    return null;
  },
};