import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

if (typeof window !== "undefined" && !window.__scrollResetListenersAdded) {
  const resetScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  };

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  window.addEventListener("load", resetScroll);
  window.addEventListener("beforeunload", resetScroll);
  resetScroll();
  window.__scrollResetListenersAdded = true;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
