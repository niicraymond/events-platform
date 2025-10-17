import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete event");

      alert("Event deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error deleting event");
    }
  };

  const handleSignup = async () => {
    if (!userId) {
      alert("You must be logged in to sign up for this event.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/events/${id}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      alert("You’re signed up for this event!");
      setEvent((prev) => ({
        ...prev,
        attendees: [...(prev.attendees || []), userId],
      }));
    } catch (err) {
      console.error(err);
      alert("Error signing up for event");
    }
  };

  const handlePayment = async () => {
    if (!userId) {
      alert("You must be logged in to sign up for this event.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/events/${id}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Payment successful! You’re now signed up for this event.");

      setEvent((prev) => ({
        ...prev,
        attendees: [...(prev.attendees || []), userId],
        paidUsers: [...(prev.paidUsers || []), userId],
      }));
    } catch (err) {
      console.error(err);
      alert("Error processing payment");
    }
  };

  const generateGoogleCalendarLink = (event) => {
    const startDate = event.date.replace(/-/g, "");
    const endDate = startDate;

    const baseUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const params = new URLSearchParams({
      text: event.title,
      dates: `${startDate}/${endDate}`,
      details: event.description || "",
      location: event.location || "",
    });

    return `${baseUrl}&${params.toString()}`;
  };

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found.</p>;

  const isUserSignedUp = event.attendees?.includes(userId);
  const hasUserPaid = event.paidUsers?.includes(userId);
  const canShowCalendar =
    (event.isPaid && hasUserPaid) || (!event.isPaid && isUserSignedUp);

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

      {userId ? (
        !isUserSignedUp && !hasUserPaid ? (
          event.isPaid ? (
            <button
              onClick={handlePayment}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Sign Up & Pay Now
            </button>
          ) : (
            <button
              onClick={handleSignup}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Sign Up
            </button>
          )
        ) : (
          <p className="text-green-600 font-semibold">
            {event.isPaid
              ? "Payment successful! You’re signed up!"
              : "You’re signed up for this event!"}
          </p>
        )
      ) : (
        <p className="text-red-500 font-semibold">
          Please log in to sign up for this event.
        </p>
      )}

      {canShowCalendar && (
        <a
          href={generateGoogleCalendarLink(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-500 text-white px-4 py-2 rounded mt-3 inline-block"
        >
          Add to Google Calendar
        </a>
      )}

      {localStorage.getItem("role") === "staff" && (
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded mt-3 block"
        >
          Delete Event
        </button>
      )}
    </div>
  );
}

export default EventDetails;
