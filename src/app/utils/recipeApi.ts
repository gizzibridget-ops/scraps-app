interface GeneratedRecipe {
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

interface ClaudeRecipe {
  name: string;
  description: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  emoji: string;
  ingredients: Array<{ name: string; quantity: string; have: boolean }>;
  steps: string[];
  tags: string[];
}

export async function generateRecipes(ingredients: string[]): Promise<GeneratedRecipe[]> {
  console.log('🔧 generateRecipes called');
  console.log('📥 Received ingredients:', ingredients);
  console.log('📊 Ingredients count:', ingredients.length);

  if (ingredients.length === 0) {
    console.log('❌ No ingredients provided - throwing error');
    throw new Error('No ingredients provided');
  }

  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  console.log('🔑 API key check:', apiKey ? 'API key found' : 'No API key - using fallback');

  if (!apiKey || apiKey === 'YOUR_ANTHROPIC_API_KEY_HERE') {
    console.log('📚 Using fallback recipe generator');
    return generateFallbackRecipes(ingredients);
  }

  try {
      const response = await fetch('/api/recipes', {      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        messages: [
          {
            role: 'user',
            content: `The user ONLY has these ingredients available: ${ingredients.join(', ')}.

You are a creative world-class chef. Generate exactly 12 recipes they can make using ONLY these ingredients. Think outside the box — consider breakfast, lunch, dinner, snacks, and different cuisines from around the world. Even with just 1-2 ingredients, get creative (for example, just eggs could become: Japanese tamagoyaki, shakshuka, egg drop soup, French omelette, Korean egg rice, baked egg cups).

Every single ingredient in every recipe MUST come only from this list: ${ingredients.join(', ')}. The only exceptions allowed are: salt, pepper, olive oil, water, and basic spices — these are always assumed to be in any kitchen.

Make the 6 recipes as varied as possible:
- Different meal types (breakfast, lunch, dinner, snack, dessert)
- Different cuisines (Asian, Mediterranean, American, European, etc.)
- Different cooking methods (fried, baked, raw, boiled, etc.)
- Different difficulty levels (some easy, some medium)

Even if the user only has 1 or 2 ingredients, still generate 12 creative recipes. Be inventive.

Return ONLY a valid JSON array with no extra text, markdown, or explanation. Use this exact format:

[
  {
    "name": "Recipe Name",
    "description": "Short 3-4 word catchy description",
    "cookTime": "15 min",
    "servings": 2,
    "difficulty": "Easy",
    "emoji": "🍳",
    "tags": ["Quick", "Easy"],
    "ingredients": [
      {"name": "eggs", "quantity": "3 eggs", "have": true},
      {"name": "salt", "quantity": "pinch", "have": true}
    ],
    "steps": [
      "First step here",
      "Second step here",
      "Third step here"
    ]
  }
]

Rules:
- Every ingredient must come from the user's list or be salt, pepper, olive oil, water, or basic spices
- ALL ingredients should have "have": true since they only come from the user's list
- Include 4-8 steps per recipe
- difficulty must be "Easy", "Medium", or "Hard"
- tags can include: "Quick", "Easy", "Vegetarian", "Healthy", "Comfort Food" (choose 1-3 relevant tags)
- Use appropriate food emojis
- Make recipes realistic, practical, and genuinely delicious
- Make all 6 recipes feel completely different from each other`
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      return generateFallbackRecipes(ingredients);
    }

    const data = await response.json();
    const content = data.content[0].text;

    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const recipes: ClaudeRecipe[] = JSON.parse(cleanedContent);

    return recipes.map((recipe, index) => ({
      id: index + 1,
      title: recipe.name,
      emoji: recipe.emoji,
      time: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      description: recipe.description,
      tags: recipe.tags || [],
      ingredients: recipe.ingredients || [],
      steps: recipe.steps || [],
    }));
  } catch (error) {
    console.error('Error generating recipes:', error);
    return generateFallbackRecipes(ingredients);
  }
}

function generateFallbackRecipes(userIngredients: string[]): GeneratedRecipe[] {
  const ingredientsLower = userIngredients.map(i => i.toLowerCase());

  const allRecipes: Array<GeneratedRecipe & { matchIngredients: string[] }> = [
    {
      id: 1,
      title: "Classic Scrambled Eggs",
      emoji: "🍳",
      time: "10 min",
      servings: 2,
      difficulty: "Easy",
      description: "Fluffy and delicious",
      tags: ["Quick", "Easy"],
      matchIngredients: ["eggs", "egg", "milk", "butter", "cheese"],
      ingredients: [
        { name: "eggs", quantity: "4 eggs", have: true },
        { name: "butter", quantity: "2 tbsp", have: true },
        { name: "salt", quantity: "pinch", have: true },
      ],
      steps: [
        "Crack eggs into a bowl and whisk well",
        "Heat butter in a non-stick pan over medium heat",
        "Pour eggs into pan and gently stir",
        "Cook until just set and fluffy, about 3-4 minutes",
      ],
    },
    {
      id: 2,
      title: "Fresh Garden Salad",
      emoji: "🥗",
      time: "15 min",
      servings: 2,
      difficulty: "Easy",
      description: "Crisp and refreshing",
      tags: ["Quick", "Easy", "Vegetarian", "Healthy"],
      matchIngredients: ["lettuce", "tomato", "tomatoes", "cucumber", "carrot", "carrots", "onion"],
      ingredients: [
        { name: "lettuce", quantity: "1 head", have: true },
        { name: "tomatoes", quantity: "2 medium", have: true },
        { name: "olive oil", quantity: "3 tbsp", have: true },
        { name: "lemon", quantity: "1", have: true },
      ],
      steps: [
        "Wash and chop lettuce into bite-sized pieces",
        "Dice tomatoes and add to bowl",
        "Mix olive oil and lemon juice for dressing",
        "Toss salad with dressing and serve",
      ],
    },
    {
      id: 3,
      title: "Garlic Butter Toast",
      emoji: "🍞",
      time: "10 min",
      servings: 2,
      difficulty: "Easy",
      description: "Crispy and savory",
      tags: ["Quick", "Easy", "Vegetarian"],
      matchIngredients: ["bread", "butter", "garlic"],
      ingredients: [
        { name: "bread", quantity: "4 slices", have: true },
        { name: "butter", quantity: "3 tbsp", have: true },
        { name: "garlic", quantity: "2 cloves", have: true },
      ],
      steps: [
        "Mince garlic finely",
        "Mix garlic into softened butter",
        "Spread garlic butter generously on bread",
        "Toast in oven at 375F for 8 minutes until golden",
      ],
    },
    {
      id: 4,
      title: "Veggie Stir Fry",
      emoji: "🥘",
      time: "20 min",
      servings: 2,
      difficulty: "Easy",
      description: "Colorful and healthy",
      tags: ["Quick", "Easy", "Vegetarian", "Healthy"],
      matchIngredients: ["broccoli", "carrot", "carrots", "pepper", "peppers", "onion", "garlic"],
      ingredients: [
        { name: "mixed vegetables", quantity: "2 cups", have: true },
        { name: "garlic", quantity: "2 cloves", have: true },
        { name: "olive oil", quantity: "2 tbsp", have: true },
        { name: "salt", quantity: "to taste", have: true },
      ],
      steps: [
        "Heat oil in a large wok or pan",
        "Add minced garlic and stir for 30 seconds",
        "Add vegetables and stir fry for 5 minutes",
        "Season with salt and pepper and serve hot",
      ],
    },
    {
      id: 5,
      title: "Hearty Tomato Soup",
      emoji: "🍲",
      time: "30 min",
      servings: 4,
      difficulty: "Medium",
      description: "Warm and comforting",
      tags: ["Comfort Food", "Vegetarian"],
      matchIngredients: ["tomato", "tomatoes", "onion", "garlic", "carrot", "celery"],
      ingredients: [
        { name: "tomatoes", quantity: "6 large", have: true },
        { name: "onion", quantity: "1 medium", have: true },
        { name: "garlic", quantity: "3 cloves", have: true },
        { name: "olive oil", quantity: "2 tbsp", have: true },
      ],
      steps: [
        "Sauté diced onion and garlic until soft",
        "Add chopped tomatoes and cook for 10 minutes",
        "Add water and simmer for 15 minutes",
        "Blend until smooth",
        "Season with salt and pepper to taste",
      ],
    },
    {
      id: 6,
      title: "Cheese Omelette",
      emoji: "🧀",
      time: "15 min",
      servings: 1,
      difficulty: "Easy",
      description: "Melted perfection",
      tags: ["Quick", "Easy"],
      matchIngredients: ["eggs", "egg", "cheese", "butter", "milk"],
      ingredients: [
        { name: "eggs", quantity: "3 eggs", have: true },
        { name: "cheese", quantity: "1/2 cup shredded", have: true },
        { name: "butter", quantity: "1 tbsp", have: true },
        { name: "salt", quantity: "pinch", have: true },
      ],
      steps: [
        "Whisk eggs with salt in a bowl",
        "Melt butter in a pan over medium heat",
        "Pour in eggs and let set slightly",
        "Add cheese on one half",
        "Fold omelette and serve immediately",
      ],
    },
  ];

  const scoredRecipes = allRecipes.map(recipe => {
    let score = 0;
    recipe.matchIngredients.forEach(recipeIng => {
      if (ingredientsLower.some(userIng =>
        userIng.includes(recipeIng) || recipeIng.includes(userIng)
      )) {
        score++;
      }
    });
    return { ...recipe, score };
  });

  const topRecipes = scoredRecipes
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((recipe, index) => {
      const updatedIngredients = recipe.ingredients.map(ing => ({
        ...ing,
        have: ingredientsLower.some(userIng =>
          userIng.includes(ing.name.toLowerCase()) ||
          ing.name.toLowerCase().includes(userIng)
        ) || ['salt', 'pepper', 'olive oil', 'water', 'spices'].includes(ing.name.toLowerCase()),
      }));

      return {
        id: index + 1,
        title: recipe.title,
        emoji: recipe.emoji,
        time: recipe.time,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        description: recipe.description,
        tags: recipe.tags,
        ingredients: updatedIngredients,
        steps: recipe.steps,
      };
    });

  return topRecipes;
}
