import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Heading } from "./components/Heading";
import { SignUp } from "./pages/SignUp";
import { Signin } from "./pages/Signin";
import { DashBoard } from "./pages/DashBoard";
import { SendMoney } from "./pages/SendMoney";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
      <Heading />
    </div>
  );
}

export default App;
