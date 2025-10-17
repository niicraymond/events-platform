import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found.</p>;
  
  const handleSignUp = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/events/${id}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setMessage(data.message || "Unknown response");
    } catch (err) {
      console.error("Error signing up:", err);
      setMessage("Error signing up for event");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto border rounded">
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

      <button
        onClick={handleSignUp}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {event.isPaid ? "Pay Now" : "Sign Up"}
      </button>

      {message && <p className="mt-3 text-center">{message}</p>}

      <button
        onClick={() => navigate(-1)}
        className="block mt-4 text-blue-600 underline"
      >
        ← Back
      </button>
    </div>
  );
}

export default EventDetails;
