import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import AppRoutes from "./routes";
import FloatingIcon from "./components/FloatingIcon/FloatingIcon";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <AppRoutes />
      <FloatingIcon />
    </BrowserRouter>
  );
}
