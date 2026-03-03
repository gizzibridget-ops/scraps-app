import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Recipe {
  id: number;
  title: string;
  emoji: string;
  time: string;
  servings: number;
  difficulty: string;
  description: string;
  tags: string[];
  ingredients: Array<{ name: string; quantity: string; have: boolean }>;
  steps: string[];
}

interface IngredientsContextType {
  ingredients: string[];
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  setIngredients: (ingredients: string[]) => void;
  clearIngredients: () => void;
  cachedRecipes: Recipe[];
  setCachedRecipes: (recipes: Recipe[]) => void;
  cachedForIngredients: string[];
  setCachedForIngredients: (ingredients: string[]) => void;
}

const IngredientsContext = createContext<IngredientsContextType | undefined>(undefined);

const STORAGE_KEY = 'fridge_ingredients';

export function IngredientsProvider({ children }: { children: ReactNode }) {
  // Load ingredients from localStorage on first render
  const [ingredients, setIngredientsState] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cachedRecipes, setCachedRecipes] = useState<Recipe[]>([]);
  const [cachedForIngredients, setCachedForIngredients] = useState<string[]>([]);

  // Save to localStorage whenever ingredients change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ingredients));
      console.log('💾 Saved ingredients to localStorage:', ingredients);
    } catch {
      console.log('Could not save to localStorage');
    }
  }, [ingredients]);

  const addIngredient = (ingredient: string) => {
    const trimmed = ingredient.trim().toLowerCase();
    if (trimmed && !ingredients.map(i => i.toLowerCase()).includes(trimmed)) {
      const newIngredients = [...ingredients, ingredient.trim()];
      setIngredientsState(newIngredients);
      console.log('✅ Ingredient added:', trimmed);
    }
  };

  const removeIngredient = (ingredient: string) => {
    const newIngredients = ingredients.filter(i => i !== ingredient);
    setIngredientsState(newIngredients);
    console.log('🗑️ Ingredient removed:', ingredient);
  };

  const setIngredients = (newIngredients: string[]) => {
    setIngredientsState(newIngredients);
    console.log('📝 Ingredients updated:', newIngredients);
  };

  const clearIngredients = () => {
    setIngredientsState([]);
    localStorage.removeItem(STORAGE_KEY);
    console.log('🧹 Ingredients cleared');
  };

  return (
    <IngredientsContext.Provider
      value={{
        ingredients,
        addIngredient,
        removeIngredient,
        setIngredients,
        clearIngredients,
        cachedRecipes,
        setCachedRecipes,
        cachedForIngredients,
        setCachedForIngredients,
      }}
    >
      {children}
    </IngredientsContext.Provider>
  );
}

export function useIngredients() {
  const context = useContext(IngredientsContext);
  if (context === undefined) {
    throw new Error('useIngredients must be used within an IngredientsProvider');
  }
  return context;
}
