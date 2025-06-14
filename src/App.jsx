import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import Proposal from "./components/Proposal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Proposal />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
