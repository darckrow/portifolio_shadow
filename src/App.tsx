import { BrowserRouter } from "react-router-dom";
import _Navbar from './componets/_NavBar/_NavBar.tsx';
import AppRoutes from "./routes";
import FloatingIcon from "./componets/FloatingIcon/FloatingIcon";

export default function App() {
  return (
    <BrowserRouter>
      <_Navbar />
      <AppRoutes />
      <FloatingIcon />
    </BrowserRouter>
  );
}
