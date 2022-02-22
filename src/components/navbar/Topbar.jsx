import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Topbar.scss";
import Sidebarr from "./Sidebarr.jsx";
import Searchbar from "../Searchbar.jsx";

function Topbar() {
  //   const [click, setClick] = useState(false);
  //   const [dropdown, setDropdown] = useState(false);

  const [searchresults, setSearchResults] = useState([]);

  //   const handleClick = () => setClick(!click);
  //   const closeMobileMenu = () => setClick(false);

  const handleSearchSubmit = async (term) => {
    // const response = await nameoffileinfolderapi.get(
    //   "/endpfad zum searchen/undso/weiter",
    //   {
    //     params: { query: term },
    //   }
    // );
    // setSearchResults({ searchresults: response.data.results });
  };
  //shjwehjfhf

  //   const onMouseEnter = () => {
  //     if (window.innerWidth < 960) {
  //       setDropdown(false);
  //     } else {
  //       setDropdown(true);
  //     }
  //   };

  //   const onMouseLeave = () => {
  //     if (window.innerWidth < 960) {
  //       setDropdown(false);
  //     } else {
  //       setDropdown(false);
  //     }
  //   };

  return (
    <>
      {/* <nav className="navbar"> */}
      <div className="navbar">
        <span className="p-coll">
          <Sidebarr />
        </span>
        <span className="p-coll hallo">
          <Searchbar onSubmit={handleSearchSubmit} />
        </span>
        <span className="p-coll">
          <Link to="/" className="navbar-logo-link">
            <img
              src="./data/images/MSOKleinanzeigenLogo.png"
              alt="MSO-Kleinanzeigen-Logo"
              height="50"
            />
            {/* <i className="pi pi-apple" /> */}
          </Link>
        </span>
      </div>

      {/* <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "pi pi-times" : "pi pi-bars"} />
        </div> */}

      {/* <ul className={click ? "nav-menu active" : "nav-menu"}> */}
      {/* <div className="nav-item">
          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            Home
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/products" className="nav-links" onClick={closeMobileMenu}>
            Products
          </Link>
        </div> */}
      {/* </nav> */}
    </>
  );
}

export default Topbar;
