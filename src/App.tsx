import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import AppRoutes from "./routes";
import FloatingIcon from "./components/FloatingIcon/FloatingIcon";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
      <FloatingIcon />
    </BrowserRouter>
  );
}
