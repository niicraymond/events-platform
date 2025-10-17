import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AddEvent from "./pages/AddEvent";
import EventDetails from "./pages/EventDetails";
import EditEvent from "./pages/EditEvent";
import Register from "./pages/Register";
import { useState } from "react";

function App() {
  const [refreshEvents, setRefreshEvents] = useState(false);
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home refreshEvents={refreshEvents} />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/add-event"
            element={<AddEvent setRefreshEvents={setRefreshEvents} />}
          />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
