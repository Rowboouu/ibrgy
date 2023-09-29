import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
