import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Users, ChevronLeft } from "lucide-react";
import { generateRecipes } from "../utils/recipeApi";
import { useIngredients } from "../context/IngredientsContext";

interface Recipe {
  id: number;
  title: string;
  emoji: string;
  time: string;
  servings: number;
  difficulty: string;
  description: string;
  tags: string[];
  ingredients?: Array<{ name: string; quantity: string; have: boolean }>;
  steps?: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
  onClick: () => void;
}

function RecipeCard({ recipe, index, onClick }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 22,
      }}
      whileHover={{
        scale: 1.08,
        y: -4,
      }}
      whileTap={{ 
        scale: [1, 0.95, 1.08, 1],
        transition: { duration: 0.4 }
      }}
      onClick={onClick}
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        backgroundColor: "#FAF8F2",
        border: "2px dashed #ACB090",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        minHeight: "220px",
        height: "auto",
        padding: "12px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Book spine on left edge */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "6px",
          background: "linear-gradient(180deg, #6F6C43 0%, #5a573a 100%)",
          borderRight: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        {/* Spine lines for book effect */}
        <div style={{ 
          position: "absolute", 
          top: "20%", 
          left: 0, 
          right: 0, 
          height: "1px", 
          backgroundColor: "rgba(0,0,0,0.2)" 
        }} />
        <div style={{ 
          position: "absolute", 
          top: "80%", 
          left: 0, 
          right: 0, 
          height: "1px", 
          backgroundColor: "rgba(0,0,0,0.2)" 
        }} />
      </div>

      {/* Recipe number catalog - 10px font, top left */}
      <div
        style={{
          fontFamily: "Baloo 2",
          fontSize: "10px",
          color: "#99ABA6",
          marginBottom: "8px",
          letterSpacing: "0.5px",
        }}
      >
        Recipe No. {recipe.id}
      </div>

      {/* Food emoji in decorative frame - 72px circle, centered, 12px space below */}
      <div className="flex justify-center" style={{ marginBottom: "12px" }}>
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: "white",
            border: "3px solid #ACB090",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            flexShrink: 0,
          }}
        >
          {recipe.emoji}
        </div>
      </div>

      {/* Recipe title - centered, bold, 14px, can wrap to 2 lines */}
      <h3
        className="text-center"
        style={{
          fontFamily: "Fredoka One",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#6F6C43",
          lineHeight: "1.2",
          marginBottom: "6px",
          wordWrap: "break-word",
          
        }}
      >
        {recipe.title}
      </h3>

      {/* Description - 11px, centered, muted, 6px below title */}
      <p
        className="text-center"
        style={{
          fontFamily: "Baloo 2",
          fontSize: "11px",
          color: "#99ABA6",
          lineHeight: "1.3",
          marginBottom: "auto",
        }}
      >
        {recipe.description}
      </p>

      {/* Recipe details at bottom - 8px padding from bottom */}
      <div 
        className="flex flex-col gap-1" 
        style={{ 
          paddingBottom: "8px",
          marginTop: "8px",
        }}
      >
        <div className="flex items-center justify-center gap-1" style={{ color: "#ACB090" }}>
          <Clock className="w-3 h-3" style={{ flexShrink: 0 }} />
          <span style={{ fontFamily: "Baloo 2", fontSize: "11px" }}>
            {recipe.time}
          </span>
        </div>
        <div className="flex items-center justify-center gap-1" style={{ color: "#ACB090" }}>
          <Users className="w-3 h-3" style={{ flexShrink: 0 }} />
          <span style={{ fontFamily: "Baloo 2", fontSize: "11px" }}>
            {recipe.servings} serving{recipe.servings > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          color: "#99ABA6",
          fontSize: "8px",
        }}
      >
        ✦
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: "12px",
          color: "#99ABA6",
          fontSize: "8px",
        }}
      >
        ✦
      </div>
    </motion.div>
  );
}

export function RecipeResults() {
  const navigate = useNavigate();
  const {ingredients, cachedRecipes, setCachedRecipes, cachedForIngredients, setCachedForIngredients} = useIngredients();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
  if (
    cachedRecipes.length > 0 &&
    JSON.stringify(cachedForIngredients) === JSON.stringify(ingredients)
  ) {
    console.log('✅ Using cached recipes');
    setRecipes(cachedRecipes);
    setLoading(false);
    return;
  }

  async function fetchRecipes() {
    setLoading(true);
    setError("");
    try {
      console.log('🚀 About to call generateRecipes with:', ingredients);
      const generatedRecipes = await generateRecipes(ingredients);
      console.log('✅ Recipes generated successfully:', generatedRecipes.length);
      setRecipes(generatedRecipes);
      setCachedRecipes(generatedRecipes);
      setCachedForIngredients(ingredients);
    } catch (err: any) {
      console.error('❌ Error fetching recipes:', err);
      setError(err.message || 'Failed to generate recipes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }

  if (ingredients.length > 0) {
    fetchRecipes();
  } else {
    setRecipes([]);
    setError("No ingredients provided");
    setLoading(false);
  }
}, [JSON.stringify(ingredients)]);

  const filters = ["All", "Quick", "Easy", "Vegetarian"];

  const filteredRecipes = recipes.filter((recipe) => {
    if (selectedFilter === "All") return true;
    return recipe.tags.includes(selectedFilter);
  });

  return (
    <div
      className="min-h-full w-full flex flex-col"
      style={{ backgroundColor: "#F0EAD8", paddingLeft: "12px", paddingRight: "12px" }}
    >
      {/* Back button */}
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileTap={{ 
          scale: [1, 0.95, 1.05, 1],
          transition: { duration: 0.3 }
        }}
        onClick={() => navigate("/fridge")}
        className="flex items-center gap-2 mb-4 mt-4 bg-transparent border-0 cursor-pointer"
        style={{ color: "#6F6C43", fontFamily: "Baloo 2", fontSize: "16px" }}
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </motion.button>

      {/* Title */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6"
      >
        <h1
          style={{
            fontFamily: "Fredoka One",
            fontSize: "36px",
            color: "#6F6C43",
            lineHeight: "1.2",
            marginBottom: "8px",
          }}
        >
          Your Recipe Book 📖
        </h1>
        <p style={{ fontFamily: "Baloo 2", fontSize: "16px", color: "#99ABA6" }}>
          {loading ? "Cooking up some ideas..." : error ? "Let's find you some recipes!" : `${filteredRecipes.length} delicious recipe${filteredRecipes.length !== 1 ? 's' : ''} found`}
        </p>
      </motion.div>

      {/* Filter pills with even spacing */}
      {!loading && !error && recipes.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex gap-3 mb-6 overflow-x-auto pb-2"
          style={{ 
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 300,
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ 
                scale: [1, 0.95, 1.1, 1],
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedFilter(filter)}
              className="px-5 py-2 rounded-full whitespace-nowrap border-2"
              style={{
                backgroundColor: selectedFilter === filter ? "#6F6C43" : "transparent",
                color: selectedFilter === filter ? "#F0EAD8" : "#6F6C43",
                borderColor: "#ACB090",
                fontFamily: "Baloo 2",
                fontSize: "15px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Loading state with cute bouncing emojis */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-center items-center py-20"
          >
            <div className="flex gap-3 mb-6">
              {['🥕', '🍳', '🧀'].map((emoji, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  style={{
                    fontSize: "48px",
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                fontFamily: "Baloo 2",
                fontSize: "18px",
                color: "#6F6C43",
              }}
            >
              Finding your perfect meals...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state - ask to add ingredients */}
      <AnimatePresence>
        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 px-6"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              style={{ fontSize: "80px", marginBottom: "20px" }}
            >
              🍴
            </motion.div>
            <h2
              style={{
                fontFamily: "Fredoka One",
                fontSize: "24px",
                color: "#6F6C43",
                marginBottom: "12px",
                textAlign: "center",
              }}
            >
              {error.includes("No ingredients") ? "Oops! Empty Fridge" : "Whoops!"}
            </h2>
            <p
              style={{
                fontFamily: "Baloo 2",
                fontSize: "16px",
                color: "#99ABA6",
                textAlign: "center",
                marginBottom: "24px",
                maxWidth: "300px",
              }}
            >
              {error.includes("No ingredients") 
                ? "Please go back and add some ingredients to your fridge first!"
                : error.includes("API key")
                ? "Please add your Anthropic API key to the .env file to generate recipes."
                : "Something went wrong. Please try again!"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/fridge")}
              className="px-8 py-3 rounded-full"
              style={{
                backgroundColor: "#6F6C43",
                color: "#F0EAD8",
                fontFamily: "Baloo 2",
                fontSize: "16px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add Ingredients
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recipe grid - 2 columns with even gaps */}
      <AnimatePresence>
        {!loading && !error && recipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid pb-6"
            style={{
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            }}
          >
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={index}
                onClick={() => navigate(`/recipe/${recipe.id}`, { state: { recipe } })}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
