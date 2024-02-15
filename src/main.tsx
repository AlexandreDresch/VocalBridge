import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";
import NotesProvider from "./providers/notes-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
    <Toaster richColors position="top-right"/>
  </React.StrictMode>
);
