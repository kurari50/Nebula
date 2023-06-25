// The App component is the main component that renders the entire application. It contains a navbar and a Router element that will render different components depending on the URL path.
// The navbar contains links to the home page, login page, and profile page. If the user is logged in, it also contains a logout link.
// The logout link calls a logout function, which clears the user token from local storage and sets the user state to null.

import { Routes, Route, } from "react-router-dom";
import Navbar from './Navbar';
import './App.css';
import Home from "./routes/Home";
import Issues from "./routes/Issues";
import ChatWithGPT from "./ChatWithGPT";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/ai" element={<ChatWithGPT />} />
      </Routes>
    </div>
  );
}

export default App;
