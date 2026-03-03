import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { PhoneFrame } from "./components/PhoneFrame";
import { IngredientsProvider } from "./context/IngredientsContext";

export default function App() {
  return (
    <IngredientsProvider>
      <PhoneFrame>
        <RouterProvider router={router} />
      </PhoneFrame>
    </IngredientsProvider>
  );
}