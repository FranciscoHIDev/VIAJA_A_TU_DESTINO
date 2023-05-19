import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="bg-[#1f1a1add;]">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
