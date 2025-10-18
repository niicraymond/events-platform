import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../config";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchMyEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users/${userId}/events`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching my events:", err);
      }
    };

    fetchMyEvents();
  }, [userId, navigate]);

  if (!userId) return null;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Events</h1>

      {events.length === 0 ? (
        <p>You haven't signed up for any events yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-1">
                {event.date} • {event.location}
              </p>
              <p className="text-sm mb-2">{event.description?.slice(0, 80)}...</p>
              <p className="text-gray-500 text-sm mb-3">
                👥 {event.attendees?.length || 0} attending
              </p>

              <Link
                to={`/event/${event._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
              >
                View Event
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEvents;
