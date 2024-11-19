import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {


  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
          />
        </Link>
      </div>
      <ul className="navbar__links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/watchhistory">History</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        
      </ul>
      <div className="navbar__profile">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="User Profile"
          className="navbar__avatar"
        />
      </div>
    </nav>
  );
};

export default Navbar;
