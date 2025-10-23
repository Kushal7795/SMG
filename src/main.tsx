import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// 🎯 ADD THIS IMPORT
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")!).render(
  // 🎯 ADD THE ThemeProvider WRAPPER
  <ThemeProvider 
    attribute="class" 
    defaultTheme="system" 
    enableSystem 
    disableTransitionOnChange
  >
    <App />
  </ThemeProvider>
);