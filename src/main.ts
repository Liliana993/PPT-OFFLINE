import './style.css'
import { handleRoute } from "./router/router";
import "./components/button";
import "./components/buttonHands";
import "./components/counter";
import "./pages/Home";
import "./pages/Rules";
import "./pages/Game";
import "./pages/Results";
//TODO Arrancamos el programa y analizamos la ruta
window.addEventListener("load", () => {
  handleRoute(location.pathname);
});