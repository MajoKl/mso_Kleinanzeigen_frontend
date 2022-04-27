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

function Topbar() {
  //   const [click, setClick] = useState(false);
  //   const [dropdown, setDropdown] = useState(false);

  // const [searchresults, setSearchResults] = useState([]);

  //   const handleClick = () => setClick(!click);
  //   const closeMobileMenu = () => setClick(false);

  //Source: Udemy-Kurs Abschnitt 7, (Lektion: 94)
  //Hier dann an Jonas anbinden
  const navigate = useNavigate();

  const handleSearchSubmit = (term) => {
    // <Link to={`productDetails/${data._id}`}></Link>;
    console.log(term + "!");
    navigate("/search/" + term);

    // Source: Udemy-Kurs Abschnitt 8

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
