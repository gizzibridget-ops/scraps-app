import { createBrowserRouter } from "react-router";
import { FridgeIntro } from "./components/FridgeIntro";
import { FridgeInput } from "./components/FridgeInput";
import { RecipeResults } from "./components/RecipeResults";
import { RecipeDetail } from "./components/RecipeDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: FridgeIntro,
  },
  {
    path: "/fridge",
    Component: FridgeInput,
  },
  {
    path: "/results",
    Component: RecipeResults,
  },
  {
    path: "/recipe/:id",
    Component: RecipeDetail,
  },
]);
