import { useState } from "react";

function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    isPaid: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New event submitted:", formData);
    alert("Event submitted");
  };

  return (
    <div>
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="isPaid"
            checked={formData.isPaid}
            onChange={handleChange}
          />
          Paid Event?
        </label>
        <button type="submit">Submit Event</button>
      </form>
    </div>
  );
}

export default AddEvent;
