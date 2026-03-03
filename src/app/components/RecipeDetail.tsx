import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Clock, Users, Check } from "lucide-react";

const recipeData: Record<number, any> = {
  1: {
    title: "Classic Scrambled Eggs",
    emoji: "🍳",
    time: "10 min",
    servings: 2,
    difficulty: "Easy",
    description: "Fluffy, creamy scrambled eggs that melt in your mouth.",
    ingredients: [
      { name: "egg", quantity: "4 eggs", have: true },
      { name: "butter", quantity: "2 tbsp butter", have: true },
      { name: "milk", quantity: "2 tbsp milk", have: true },
      { name: "salt", quantity: "Salt to taste", have: false },
      { name: "pepper", quantity: "Black pepper", have: false },
    ],
    steps: [
      "Crack eggs into a bowl and whisk with milk, salt, and pepper",
      "Heat butter in a non-stick pan over medium-low heat",
      "Pour in egg mixture and let it sit for 20 seconds",
      "Gently stir with a spatula, creating soft curds",
      "Remove from heat while slightly undercooked",
      "Let residual heat finish cooking. Serve immediately!",
    ],
  },
  2: {
    title: "Cheese Omelette",
    emoji: "🧇",
    time: "15 min",
    servings: 1,
    difficulty: "Easy",
    description: "A fluffy omelette filled with melted cheese.",
    ingredients: [
      { name: "egg", quantity: "3 eggs", have: true },
      { name: "cheese", quantity: "1/2 cup cheese", have: true },
      { name: "butter", quantity: "1 tbsp butter", have: true },
      { name: "salt", quantity: "Pinch of salt", have: false },
      { name: "chives", quantity: "Fresh chives", have: false },
    ],
    steps: [
      "Beat eggs with salt in a bowl",
      "Heat butter in a pan over medium heat",
      "Pour eggs and tilt pan to spread evenly",
      "Cook until edges set but center is runny",
      "Sprinkle cheese on one half",
      "Fold omelette in half and cook 1 more minute",
      "Slide onto plate and garnish",
    ],
  },
  3: {
    title: "Carrot Soup",
    emoji: "🥕",
    time: "30 min",
    servings: 4,
    difficulty: "Medium",
    description: "A warming, velvety soup with sweet carrots.",
    ingredients: [
      { name: "carrot", quantity: "6 large carrots", have: true },
      { name: "onion", quantity: "2 onions", have: true },
      { name: "butter", quantity: "3 tbsp butter", have: true },
      { name: "broth", quantity: "4 cups broth", have: false },
      { name: "cream", quantity: "1/2 cup cream", have: false },
    ],
    steps: [
      "Melt butter in a large pot",
      "Add onions and cook until soft",
      "Add carrots and cook 5 minutes",
      "Pour in broth and bring to boil",
      "Simmer for 20 minutes",
      "Blend until smooth",
      "Stir in cream and season",
      "Serve hot with fresh herbs",
    ],
  },
  4: {
    title: "Lemon Chicken",
    emoji: "🍋",
    time: "35 min",
    servings: 4,
    difficulty: "Medium",
    description: "Juicy chicken with tangy lemon butter sauce.",
    ingredients: [
      { name: "meat", quantity: "4 chicken breasts", have: true },
      { name: "lemon", quantity: "2 lemons", have: true },
      { name: "butter", quantity: "4 tbsp butter", have: true },
      { name: "garlic", quantity: "4 cloves garlic", have: false },
      { name: "wine", quantity: "1/2 cup white wine", have: false },
    ],
    steps: [
      "Season chicken with salt and pepper",
      "Heat 2 tbsp butter in skillet",
      "Cook chicken until golden, 6 min per side",
      "Remove chicken and set aside",
      "Add garlic and remaining butter",
      "Pour in wine and lemon juice",
      "Simmer sauce for 3 minutes",
      "Return chicken to pan and coat with sauce",
    ],
  },
  5: {
    title: "Grilled Cheese",
    emoji: "🧀",
    time: "8 min",
    servings: 1,
    difficulty: "Easy",
    description: "Crispy on the outside, gooey on the inside.",
    ingredients: [
      { name: "cheese", quantity: "2 slices cheese", have: true },
      { name: "bread", quantity: "2 slices bread", have: false },
      { name: "butter", quantity: "2 tbsp butter", have: true },
    ],
    steps: [
      "Butter one side of each bread slice",
      "Place cheese between slices, butter side out",
      "Heat pan over medium heat",
      "Cook sandwich 3-4 minutes per side",
      "Flip when golden brown",
      "Remove when cheese is melted",
    ],
  },
  6: {
    title: "Veggie Stir Fry",
    emoji: "🥬",
    time: "20 min",
    servings: 3,
    difficulty: "Easy",
    description: "Fresh and colorful vegetables with savory sauce.",
    ingredients: [
      { name: "lettuce", quantity: "1 head lettuce", have: true },
      { name: "carrot", quantity: "2 carrots", have: true },
      { name: "onion", quantity: "1 onion", have: true },
      { name: "soy sauce", quantity: "3 tbsp soy sauce", have: false },
      { name: "garlic", quantity: "3 cloves garlic", have: false },
    ],
    steps: [
      "Chop all vegetables into bite-sized pieces",
      "Heat oil in a wok or large pan",
      "Add garlic and onion, stir fry 1 minute",
      "Add carrots, cook 3 minutes",
      "Add remaining vegetables",
      "Pour in soy sauce and stir well",
      "Cook until vegetables are tender-crisp",
      "Serve over rice",
    ],
  },
};

export function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const recipe = location.state?.recipe;
  
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const toggleStep = (index: number) => {
    const newChecked = new Set(checkedSteps);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedSteps(newChecked);
  };

  if (!recipe) {
    return (
      <div style={{ backgroundColor: "#F0EAD8", minHeight: "100vh", padding: "20px" }}>
        <p style={{ fontFamily: "Baloo 2", color: "#6F6C43" }}>Recipe not found</p>
      </div>
    );
  }

  // Use recipe from state if available, otherwise fallback to recipeData
  const fullRecipe = recipe.ingredients && recipe.steps ? recipe : recipeData[Number(id)] || recipe;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-full w-full"
      style={{
        backgroundColor: "#F0EAD8",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "30px",
        // Subtle paper texture effect via gradient
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(111, 108, 67, 0.02) 2px,
            rgba(111, 108, 67, 0.02) 4px
          )
        `,
      }}
    >
      {/* Back button */}
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileTap={{ 
          scale: [1, 0.95, 1.05, 1],
          transition: { duration: 0.3 }
        }}
        onClick={() => navigate("/results")}
        className="flex items-center gap-2 mb-6 mt-4 bg-transparent border-0 cursor-pointer"
        style={{ color: "#6F6C43", fontFamily: "Baloo 2", fontSize: "16px" }}
      >
        <ArrowLeft className="w-5 h-5" />
        Back to recipes
      </motion.button>

      {/* Open recipe book layout */}
      <div className="flex flex-col">
        {/* Top section - Title and emoji like an open book */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          {/* Decorative stars in top corners */}
          <div className="relative">
            <div style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              color: "#99ABA6", 
              fontSize: "16px" 
            }}>
              ✦ ✦
            </div>
            <div style={{ 
              position: "absolute", 
              top: 0, 
              right: 0, 
              color: "#99ABA6", 
              fontSize: "16px" 
            }}>
              ✦ ✦
            </div>

            {/* Recipe title with decorative underline */}
            <h1
              className="text-center mb-2"
              style={{
                fontFamily: "Fredoka One",
                fontSize: "32px",
                color: "#6F6C43",
                lineHeight: "1.2",
                paddingTop: "20px",
              }}
            >
              {fullRecipe.title}
            </h1>
            
            {/* Hand-drawn style underline */}
            <div className="flex justify-center mb-4">
              <svg width="200" height="8" viewBox="0 0 200 8">
                <path
                  d="M 10 4 Q 50 2, 100 4 T 190 4"
                  stroke="#ACB090"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Food emoji in circular frame */}
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  border: "4px solid #ACB090",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "50px",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                {fullRecipe.emoji}
              </motion.div>
            </div>

            {/* Recipe meta info */}
            <div className="flex justify-center gap-6 mb-4">
              <div className="flex items-center gap-2" style={{ color: "#99ABA6" }}>
                <Clock className="w-5 h-5" />
                <span style={{ fontFamily: "Baloo 2", fontSize: "15px" }}>
                  {fullRecipe.time}
                </span>
              </div>
              <div className="flex items-center gap-2" style={{ color: "#99ABA6" }}>
                <Users className="w-5 h-5" />
                <span style={{ fontFamily: "Baloo 2", fontSize: "15px" }}>
                  {fullRecipe.servings} serving{fullRecipe.servings > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <p
              className="text-center mb-6"
              style={{
                fontFamily: "Baloo 2",
                fontSize: "16px",
                color: "#6F6C43",
                fontStyle: "italic",
              }}
            >
              {fullRecipe.description}
            </p>
          </div>
        </motion.div>

        {/* Ingredients section */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: "Fredoka One",
              fontSize: "24px",
              color: "#6F6C43",
            }}
          >
            Ingredients
          </h2>
          <div className="space-y-3">
            {fullRecipe.ingredients?.map((ingredient: any, index: number) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileTap={{ 
                  scale: [1, 0.98, 1.02, 1],
                  transition: { duration: 0.3 }
                }}
                onClick={() => toggleIngredient(index)}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer"
                style={{
                  backgroundColor: checkedIngredients.has(index) ? "#ACB090" : "white",
                  border: "2px solid #ACB090",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "6px",
                    backgroundColor: checkedIngredients.has(index) ? "#6F6C43" : "transparent",
                    border: `2px solid ${checkedIngredients.has(index) ? "#6F6C43" : "#99ABA6"}`,
                    transition: "all 0.2s ease",
                  }}
                >
                  {checkedIngredients.has(index) && (
                    <Check className="w-4 h-4" style={{ color: "#F0EAD8" }} />
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "Baloo 2",
                    fontSize: "15px",
                    color: checkedIngredients.has(index) ? "#F0EAD8" : "#6F6C43",
                    textDecoration: checkedIngredients.has(index) ? "line-through #ACB090 2px" : "none",
                  }}
                >
                  {ingredient.name} — {ingredient.quantity}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hand-drawn divider */}
        <div className="flex justify-center mb-6">
          <svg width="100%" height="20" viewBox="0 0 300 20">
            <path
              d="M 10 10 Q 75 5, 150 10 T 290 10"
              stroke="#ACB090"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="5,5"
            />
          </svg>
        </div>

        {/* Steps section */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: "Fredoka One",
              fontSize: "24px",
              color: "#6F6C43",
            }}
          >
            Instructions
          </h2>
          <div className="space-y-3">
            {fullRecipe.steps?.map((step: string, index: number) => (
              <motion.div
                key={index}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileTap={{ 
                  scale: [1, 0.98, 1.02, 1],
                  transition: { duration: 0.3 }
                }}
                onClick={() => toggleStep(index)}
                className="flex gap-3 p-3 rounded-xl cursor-pointer"
                style={{
                  backgroundColor: checkedSteps.has(index) ? "#ACB090" : "white",
                  border: "2px solid #ACB090",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: checkedSteps.has(index) ? "#6F6C43" : "#99ABA6",
                    color: "#F0EAD8",
                    fontFamily: "Fredoka One",
                    fontSize: "14px",
                  }}
                >
                  {index + 1}
                </div>
                <span
                  style={{
                    fontFamily: "Baloo 2",
                    fontSize: "15px",
                    color: checkedSteps.has(index) ? "#F0EAD8" : "#6F6C43",
                    flex: 1,
                    lineHeight: "1.5",
                    textDecoration: checkedSteps.has(index) ? "line-through #ACB090 2px" : "none",
                  }}
                >
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Decorative bottom corners */}
        <div className="mt-8 relative">
          <div style={{ 
            position: "absolute", 
            bottom: 0, 
            left: 0, 
            color: "#99ABA6", 
            fontSize: "12px" 
          }}>
            ✦ · ✦
          </div>
          <div style={{ 
            position: "absolute", 
            bottom: 0, 
            right: 0, 
            color: "#99ABA6", 
            fontSize: "12px" 
          }}>
            ✦ · ✦
          </div>
        </div>
      </div>
    </motion.div>
  );
}