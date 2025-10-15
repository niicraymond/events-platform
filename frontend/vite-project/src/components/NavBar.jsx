import {Link} from "react-router-dom"

function NavBar() {
    return (
        <nav className="p-4 flex gap-4 bg-gray-100">
        <Link to="/">Home</Link>
        <Link to="/add-event">Add Event</Link>
        <Link to="/login">Login</Link>
      </nav>
    )
}

export default NavBar