import { NavLink } from "react-router-dom";

const Header = ({ searchItem, setSearchItem }) => {
  return (
    <header className="container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid container">
          <NavLink to="/" className="navbar-brand">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaAOSQXN5h0TDgobojjZoyciJNrxpN_eue4g&s"
              alt="Meetup Logo"
              style={{ height: "60px", width: "100px" }}
            />
          </NavLink>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by title and tags"
              aria-label="Search"
              value={searchItem}
              onChange={(event) => setSearchItem(event.target.value)}
            />
          </form>
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
