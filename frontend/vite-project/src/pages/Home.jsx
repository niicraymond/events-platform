import { mockEvents } from "../data";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = mockEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Upcoming Events</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div>
        {filteredEvents.map((event) => (
          <div key={event.id}>
            <img src={event.image} alt={event.title} />
            <Link to={`/event/${event.id}`}>
              <h2>{event.title}</h2>
            </Link>
            <p>
              {event.date} • {event.location}
            </p>
            <p>{event.description}</p>
            <button>{event.isPaid ? "Pay Now" : "Sign Up"}</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
