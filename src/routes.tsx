import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Projetos from "./Pages/Projetos/Projetos";
import Contatos from "./Pages/Contatos/Contatos";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projetos" element={<Projetos />} />
      <Route path="/contatos" element={<Contatos />} />
    </Routes>
  );
}
