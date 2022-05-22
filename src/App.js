import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialPage from "./components/InitialPage";
import MovieTime from "./components/MovieTime";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/:idmovie" element={<MovieTime />} />
      </Routes>
    </BrowserRouter>
  );
}
