import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import TrainPage from "./pages/TrainPage";

function App() {
  return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:trainNumber" element={<TrainPage />} />
      </Routes>
  );
}

export default App;
