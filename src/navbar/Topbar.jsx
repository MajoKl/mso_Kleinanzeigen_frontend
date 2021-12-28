import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Topbar.scss";
import Sidebarr from "./Sidebarr.jsx";

import { InputText } from "primereact/inputtext";

function Topbar() {
  //   const [click, setClick] = useState(false);
  //   const [dropdown, setDropdown] = useState(false);

  const [valueSearch, setValueSearch] = useState("");

  //   const handleClick = () => setClick(!click);
  //   const closeMobileMenu = () => setClick(false);

  const handleKeyDown = (event) => {
    //make something with the Data from the Search input
    if (event.key === "Enter") {
      console.log("Sjdjfbjhef");
    }
  };

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
      <nav className="navbar">
        <div class="navbar-menusidebar">
          <Sidebarr />
        </div>
        <div>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.value)}
              placeholder="Search"
              className="nav-search"
              onKeyDown={handleKeyDown}
            />
          </span>
        </div>
        <Link to="/" className="navbar-logo">
          MSO-Kleinanzeigen
          {/* <i class="pi pi-apple" /> */}
        </Link>

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
      </nav>
    </>
  );
}

export default Topbar;
