import { BrowserRouter } from "react-router-dom";
import _Navbar from './components/_NavBar/_NavBar.tsx';
import AppRoutes from "./routes";
import FloatingIcon from "./components/FloatingIcon/FloatingIcon";

export default function App() {
  return (
    <BrowserRouter>
      <_Navbar />
      <AppRoutes />
      <FloatingIcon />
    </BrowserRouter>
  );
}
