//React
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//Stylesheets
import "./Sidebar.scss";
//Api_&_Store
import axios from "axios";
//Primereact
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
//Components

//Quelle: https://www.primefaces.org/primereact/sidebar/
function Sidebarr() {
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [content, setContent] = useState([]);

  useEffect(() => {
    console.log("im use");
    async function fetchData() {
      const response = await axios("/data/SidebarData.json");
      console.log(response);
      setContent(response.data.data);
    }
    fetchData();
  }, []); // eslint-disable-line

  return (
    <>
      <Button
        icon="pi pi-bars"
        onClick={() => setVisibleLeft(true)}
        className="p-button-outlined buttooon"
        style={{ color: "white" }}
      />
      <Sidebar
        visible={visibleLeft}
        position="left"
        onHide={() => setVisibleLeft(false)}
        className="sidebar-menu"
      >
        {/* Content */}
        <Link to="/" className="sidebar-logo-link">
          <img
            src="./data/images/MSOKleinanzeigenLogo.png"
            alt="MSO-Kleinanzeigen-Logo"
            height="230"
          />
        </Link>
        <Link to="/me" className="sidebar-avatar-link">
          <Avatar
            icon="pi pi-user"
            className="sidebar-avatar"
            size="xlarge"
            shape="circle"
          />
        </Link>
        <div className="sidebar-menu-items">
          <ul>
            {content.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={item.path}>
                    <i className={item.icon}></i>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li>
              <a href="https://www.marienschule.com">
                <i className="pi pi-external-link"></i>
                <span>Zur Homepage</span>
              </a>
            </li>
          </ul>
          <div className="sidebar-menu-links">
            <Link to="/faq" className="sidebar-menu-links">
              FAQ
            </Link>
            <Link to="/contact" className="sidebar-menu-links">
              Fehler melden
            </Link>
          </div>
        </div>
      </Sidebar>
    </>
  );
}

export default Sidebarr;
