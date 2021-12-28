import { BrowserRouter, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
import React from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

//Links
import Start from "./start/start.jsx";
import Login from "./login/Login.jsx";
// import Sidebarr from "./navbar/Sidebarr.jsx";
import Topbar from "./navbar/Topbar.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <React.Fragment>
          {/* Links: */}
          {/* <Link to="/">Startseite</Link>
          <Link to="/login">LogIn</Link> */}

          <Topbar />

          <div>
            {/* Routes: */}
            <Route path="/">
              <h1>Startseite</h1>
              <div>
                <Start />
                Willkommen auf der Seite!
              </div>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </div>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
