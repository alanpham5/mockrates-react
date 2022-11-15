import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Chat } from "./pages/Chat";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "settings",
      element: <Settings />,
    },
    {
      path: "chat",
      element: <Chat />,
    },
  ]);
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
