import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AddEvent from "./pages/AddEvent";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <Router>
      <nav className="p-4 flex gap-4 bg-gray-100">
        <Link to="/">Home</Link>
        <Link to="/add-event">Add Event</Link>
        <Link to="/login">Login</Link>
      </nav>
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
