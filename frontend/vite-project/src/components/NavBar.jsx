import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>

        {role === "staff" && (
          <Link to="/add-event" className="hover:underline">Add Event</Link>
        )}
      </div>

      <div className="flex gap-4">
        {!token ? (
          <Link to="/login" className="hover:underline">Login</Link>
        ) : (
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
