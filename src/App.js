import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialPage from "./components/InitialPage";
import MovieTime from "./components/MovieTime";
import MovieSession from "./MovieSession";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/movie:idmovie" element={<MovieTime />} />
        <Route path="/session:idsession" element={<MovieSession />} />
      </Routes>
    </BrowserRouter>
  );
}
