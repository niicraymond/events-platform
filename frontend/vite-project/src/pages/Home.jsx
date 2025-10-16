import { useEffect, useState } from "react";

function Home({ refreshEvents }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [refreshEvents]);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div>
          {events.map((event) => (
            <div key={event._id} className="border p-4 rounded mb-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p>{event.date} • {event.location}</p>
              <p>{event.description}</p>
              <button className="bg-blue-500 text-white px-3 py-1 rounded mt-2">
                {event.isPaid ? "Pay Now" : "Sign Up"}
              </button>
              <hr className="my-3" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
