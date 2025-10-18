import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../config";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Community Events</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {event.image && (
              <div className="h-40 overflow-hidden rounded mb-3 bg-gray-100">
                <img
                  src={
                    event.image && event.image.trim() !== ""
                      ? event.image
                      : "https://placehold.co/400x200?text=No+Image"
                  }
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/400x200?text=Image+Not+Found";
                  }}
                />
              </div>
            )}
            <h2 className="text-xl font-bold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-1">
              {event.date} • {event.location}
            </p>
            <p className="text-sm mb-2">{event.description?.slice(0, 80)}...</p>

            <p className="font-semibold mb-2">
              {event.isPaid ? "Paid Event" : "Free Event"}
            </p>

            <p className="text-gray-500 text-sm mb-3">
              👥 {event.attendees?.length || 0} attending
            </p>

            <Link
              to={`/event/${event._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
            >
              See More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
