import { useParams } from "react-router-dom";
import { mockEvents } from "../data";

function EventDetails() {
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === Number(id));

  if (!event) return <h2>Event not found.</h2>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>
        {event.date} • {event.location}
      </p>
      <p>{event.description}</p>
      <img src={event.image} alt={event.title} />
      <button>{event.isPaid ? "Pay Now" : "Sign Up"}</button>
    </div>
  );
}
export default EventDetails;
