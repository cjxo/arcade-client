import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import App from "./App.jsx";
import TitleScreen from "./routes/TitleScreen.jsx";
import GameList from "./routes/GameList.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <TitleScreen />
      },
      {
        path: "/games",
        element: <GameList />
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
