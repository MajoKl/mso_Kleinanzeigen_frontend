import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
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
        <h3>Left Sidebar</h3>
        <ul className="sidebar-menu-items">
          {SidebarData.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
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
