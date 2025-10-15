import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AddEvent from "./pages/AddEvent";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <Router>
      <NavBar/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/add-event" element={<AddEvent/>}/>
          <Route path="/event/:id" element={<EventDetails/>}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
