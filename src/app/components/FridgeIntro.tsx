import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useIngredients } from "../context/IngredientsContext";

const foodEmojis = [
  { id: 1, emoji: "🥚", x: 8, y: 12 },
  { id: 2, emoji: "🧀", x: 82, y: 15 },
  { id: 3, emoji: "🥛", x: 10, y: 65 },
  { id: 4, emoji: "🥕", x: 85, y: 60 },
  { id: 5, emoji: "🧅", x: 15, y: 42 },
  { id: 6, emoji: "🍋", x: 80, y: 35 },
  { id: 7, emoji: "🥩", x: 12, y: 22 },
  { id: 8, emoji: "🧈", x: 82, y: 48 },
  { id: 9, emoji: "🫙", x: 8, y: 78 },
  { id: 10, emoji: "🥬", x: 85, y: 75 },
  { id: 11, emoji: "🍅", x: 50, y: 8 },
  { id: 12, emoji: "🧄", x: 50, y: 85 },
];

export function FridgeIntro() {
  const navigate = useNavigate();
  const [doorOpen, setDoorOpen] = useState(false);
  const [tapped, setTapped] = useState(false);

  const handleFridgeTap = () => {
    if (tapped) return;
    setTapped(true);
    setDoorOpen(true);
    setTimeout(() => navigate("/fridge"), 900);
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#F0EAD8" }}
    >
      {/* Title */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center px-5 mb-8"
        style={{
          fontFamily: "Fredoka One",
          fontSize: "42px",
          color: "#6F6C43",
          lineHeight: "1.2",
          marginTop: "20px",
          zIndex: 20,
          position: "relative",
        }}
      >
        What's in your fridge?
      </motion.h1>

      {/* Floating food emojis */}
      {foodEmojis.map((food) => {
        const floatDuration = 2 + (food.id % 3) * 0.5;
        const floatDelay = food.id * 0.1;
        return (
          <motion.div
            key={food.id}
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: tapped ? 0 : 1,
              rotate: tapped ? 180 : 0,
              y: tapped ? 0 : [0, -8, 0],
              opacity: tapped ? 0 : 1,
            }}
            transition={{
              scale: tapped
                ? { duration: 0.3, delay: food.id * 0.03 }
                : { duration: 0.5, delay: floatDelay },
              rotate: { duration: 0.5, delay: floatDelay },
              opacity: tapped ? { duration: 0.3, delay: food.id * 0.03 } : { duration: 0 },
              y: tapped
                ? { duration: 0 }
                : {
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: floatDelay,
                  },
            }}
            style={{
              position: "absolute",
              left: food.x + "%",
              top: food.y + "%",
              fontSize: "40px",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            {food.emoji}
          </motion.div>
        );
      })}

      {/* Fridge */}
      <motion.div
        animate={tapped ? { scale: [1, 1.05, 1] } : { y: [0, -5, 0] }}
        transition={
          tapped
            ? { duration: 0.3 }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative"
        style={{
          width: "280px",
          height: "320px",
          flexShrink: 0,
        }}
      >
        {/* Fridge body */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#99ABA6",
            borderRadius: "20px",
            border: "6px solid #ACB090",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15), inset 0 -10px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Inside fridge glow */}
          <motion.div
            animate={{ opacity: doorOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(240,234,216,0.7) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "60px",
              zIndex: 1,
            }}
          >
            ✨🌟✨
          </motion.div>

          {/* Door */}
          <motion.div
            animate={doorOpen ? { rotateY: -85, x: -60 } : { rotateY: 0, x: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            onClick={handleFridgeTap}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
              backgroundColor: "#99ABA6",
              borderRadius: "14px",
              zIndex: 2,
              cursor: tapped ? "default" : "pointer",
            }}
          >
            {/* Door handle */}
            <div
              style={{
                position: "absolute",
                right: "30px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "12px",
                height: "60px",
                backgroundColor: "#6F6C43",
                borderRadius: "6px",
                boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
              }}
            />

            {/* Tap hint */}
            <AnimatePresence>
              {!tapped && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    pointerEvents: "none",
                  }}
                >
                  <span style={{ fontSize: "36px" }}>👆</span>
                  <span
                    style={{
                      fontFamily: "Fredoka One",
                      fontSize: "18px",
                      color: "rgba(255,255,255,0.8)",
                      textAlign: "center",
                      padding: "0 20px",
                    }}
                  >
                    tap to open!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: tapped ? 0 : 1, y: tapped ? 20 : 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          fontFamily: "Baloo 2",
          fontSize: "16px",
          color: "#99ABA6",
          marginTop: "24px",
          textAlign: "center",
        }}
      >
        see what you can cook!
      </motion.p>
    </div>
  );
}