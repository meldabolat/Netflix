import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserOutlined } from '@ant-design/icons';
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
          <Link to="/list">List</Link>
        </li>
        
      </ul>
      <div className="navbar__profile">
      <li>
          <Link to="/profile">
          <UserOutlined style={{ fontSize: '24px', color: 'white' }} />
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
