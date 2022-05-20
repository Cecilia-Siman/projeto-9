import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialPage from "./components/InitialPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InitialPage />} />
      </Routes>
    </BrowserRouter>
  );
}
