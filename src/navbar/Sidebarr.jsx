import { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { SidebarData } from "./SidebarData";
import "./Sidebar.scss";

function Sidebarr() {
  // const [sidebar, setSidebar] = useState(false);
  const [visibleLeft, setVisibleLeft] = useState(false);
  // const showSidebar = () => setSidebar(!sidebar);

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
            label="C"
            className="sidebar-avatar"
            size="xlarge"
            shape="circle"
          />
        </Link>
        <div className="sidebar-menu-items">
          <ul>
            {/* <h3>Left Sidebar</h3> */}
            {SidebarData.map((item, index) => {
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
            <Link to="#" className="sidebar-menu-links">
              FAQ
            </Link>
            <Link to="#" className="sidebar-menu-links">
              Fehler melden
            </Link>
          </div>
        </div>
      </Sidebar>
    </>
  );
}

export default Sidebarr;

// {
//   <Button icon=""></Button>
//         <Button
//           className="facebook p-p-0"
//           type="button"
//           onClick={(e) => {
//             e.preventDefault();
//             window.location.href = "http://google.com";
//           }}
//         >
//           <i className="pi pi-facebook p-px-2"></i>
//           <span className="p-px-3">Facebook</span>
//         </Button>
// }
