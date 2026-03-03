import { useState, KeyboardEvent } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus } from "lucide-react";
import { useIngredients } from "../context/IngredientsContext";

export function FridgeInput() {
  const navigate = useNavigate();
  const { ingredients, addIngredient, removeIngredient } = useIngredients();
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddIngredient = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !ingredients.includes(trimmedValue)) {
      addIngredient(trimmedValue);
      setInputValue("");
      setErrorMessage("");
    } else if (ingredients.includes(trimmedValue)) {
      console.log('⚠️ Ingredient already added:', trimmedValue);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    removeIngredient(ingredient);
  };

  const handleFindRecipes = () => {
    console.log('🔍 Find Recipes clicked');
    console.log('📋 Ingredients being passed:', ingredients);
    console.log('📊 Ingredients count:', ingredients.length);
    
    if (ingredients.length === 0) {
      setErrorMessage('Add at least one ingredient first!');
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    
    navigate("/results");
  };

  return (
    <div
      className="min-h-full w-full flex flex-col"
      style={{ backgroundColor: "#F0EAD8", paddingLeft: "20px", paddingRight: "20px" }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-1 flex flex-col"
      >
        {/* Title with proper spacing */}
        <div className="text-center mb-6 mt-6">
          <h1
            className="text-4xl mb-2"
            style={{ color: "#6F6C43", fontFamily: "Fredoka One", lineHeight: "1.2" }}
          >
            What's in your fridge? 🧊
          </h1>
          <p
            className="text-xl"
            style={{ color: "#99ABA6", fontFamily: "Baloo 2" }}
          >
            Add anything else you have!
          </p>
        </div>

        {/* Input field with proper spacing */}
        <div className="relative mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type an ingredient..."
            className="w-full px-5 py-4 pr-14 rounded-2xl shadow-lg text-lg border-3 focus:outline-none"
            style={{
              backgroundColor: "white",
              color: "#6F6C43",
              borderColor: inputValue ? "#ACB090" : "transparent",
              fontFamily: "Baloo 2",
            }}
          />
          <motion.button
            whileTap={{ 
              scale: [1, 0.95, 1.05, 1],
              transition: { duration: 0.3 }
            }}
            whileHover={{ scale: 1.05 }}
            onClick={handleAddIngredient}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl"
            style={{ backgroundColor: "#6F6C43" }}
          >
            <Plus className="w-5 h-5" style={{ color: "#F0EAD8" }} />
          </motion.button>
        </div>

        {/* Ingredients pills with even spacing */}
        <div className="flex-1 mb-6">
          <AnimatePresence mode="popLayout">
            {ingredients.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {ingredients.map((ingredient, index) => (
                  <motion.div
                    key={ingredient}
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 10, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      delay: index * 0.05,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ 
                      scale: [1, 0.95, 1.05, 1],
                      transition: { duration: 0.3 }
                    }}
                    className="flex items-center gap-2 px-4 py-3 rounded-full shadow-md"
                    style={{
                      backgroundColor: "#ACB090",
                      fontFamily: "Baloo 2",
                      fontSize: "16px",
                      color: "#F0EAD8",
                      border: "2px solid #99ABA6",
                    }}
                  >
                    <span>{ingredient}</span>
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => handleRemoveIngredient(ingredient)}
                      className="p-0 bg-transparent border-0 cursor-pointer"
                    >
                      <X className="w-4 h-4" style={{ color: "#F0EAD8" }} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p
                  style={{
                    color: "#99ABA6",
                    fontFamily: "Baloo 2",
                    fontSize: "18px",
                  }}
                >
                  Start adding ingredients to see recipe ideas!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Find recipes button - centered with bouncy animation */}
        <div className="pb-6 flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ 
              scale: [1, 0.95, 1.05, 1],
              transition: { duration: 0.3 }
            }}
            onClick={handleFindRecipes}
            disabled={ingredients.length === 0}
            className="px-10 py-4 rounded-full shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: ingredients.length > 0 ? "#6F6C43" : "#ACB090",
              color: "#F0EAD8",
              fontFamily: "Fredoka One",
              fontSize: "22px",
              border: "none",
              cursor: ingredients.length > 0 ? "pointer" : "not-allowed",
            }}
          >
            Find Recipes! 🔍
          </motion.button>
          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mt-3"
              style={{
                color: "#6F6C43",
                fontFamily: "Baloo 2",
                fontSize: "16px",
                backgroundColor: "#FAF8F2",
                padding: "12px 20px",
                borderRadius: "12px",
                border: "2px solid #ACB090",
              }}
            >
              {errorMessage}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}