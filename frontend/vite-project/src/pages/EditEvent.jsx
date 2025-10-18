import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../config";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image: "",
    isPaid: false,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/events/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update event");
      setMessage("Event updated successfully!");
      setTimeout(() => navigate(`/event/${id}`), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Error updating event");
    }
  };

  if (loading) return <p>Loading event data...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date?.substring(0, 10)}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPaid"
            checked={formData.isPaid}
            onChange={handleChange}
          />
          Paid event
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Event
        </button>
      </form>

      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}

export default EditEvent;
