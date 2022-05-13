//React
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//Stylesheets
import "./Topbar.scss";
//Api_&_Store
//Primereact
//Components
import Sidebarr from "./Sidebarr.jsx";
import Searchbar from "../Searchbar.jsx";

//Quelle: Udemy-Kurs Abschnitt 7, (Lektion: 94)
function Topbar() {
  const navigate = useNavigate();

  const handleSearchSubmit = (term) => {
    navigate("/search/" + term);
  };

  return (
    <>
      <div className="navbar" id="top">
        <span className="p-coll">
          <Sidebarr />
        </span>
        <span className="p-coll">
          <Searchbar onSubmit={handleSearchSubmit} />
        </span>
        <span className="p-coll">
          <Link to="/" className="navbar-logo-link">
            <img
              src="./data/images/MSOKleinanzeigenLogo.png"
              alt="MSO-Kleinanzeigen-Logo"
              height="50"
            />
          </Link>
        </span>
      </div>
    </>
  );
}

export default Topbar;
