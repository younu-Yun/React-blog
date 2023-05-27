import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar bg-dark" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Home
                </Link>
                <ul style={{ flexDirection: "row", gap: "10px" }} className="navbar-nav ">
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} aria-current="page" to="/admin">
                            Admin
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} aria-current="page" to="/blogs">
                            Blogs
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
