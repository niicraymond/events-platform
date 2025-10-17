import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/events/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete event");

      alert("Event deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error deleting event");
    }
  };

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="p-6 max-w-lg mx-auto border rounded">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-400 text-white px-4 py-2 rounded mb-4"
      >
        ← Back to Events
      </button>

      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-2">
        {event.date} • {event.location}
      </p>
      <p className="mb-4">{event.description}</p>

      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full rounded mb-4"
        />
      )}

      <div className="flex gap-3 mt-3">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {event.isPaid ? "Pay Now" : "Sign Up"}
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete Event
        </button>
      </div>
    </div>
  );
}

export default EventDetails;
