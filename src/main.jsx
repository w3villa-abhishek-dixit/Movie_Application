import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./Context/ThemeContext"; 

// import { LanguageProvider } from "./context/LanguageContext"; 
// import "./i18n"; // Import i18n setup

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <LanguageProvider> */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    {/* </LanguageProvider> */}
  </React.StrictMode>
);
