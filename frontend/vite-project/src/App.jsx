import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AddEvent from "./pages/AddEvent";
import EventDetails from "./pages/EventDetails";
import { useState } from "react";


function App() {
  const [refreshEvents, setRefreshEvents] = useState(false);
  return (
    <Router>
      <NavBar/>
      <main>
        <Routes>
          <Route path="/" element={<Home refreshEvents={refreshEvents}/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/add-event" element={<AddEvent setRefreshEvents={setRefreshEvents}/>}/>
          <Route path="/event/:id" element={<EventDetails/>}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
