import { BrowserRouter, Link, Route } from "react-router-dom";
import React from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import { Menubar } from "primereact/menubar";

//Links
import Start from "./start/start.jsx";
import Login from "./login/Login.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <React.Fragment>
          {/* Links: */}
          <Link to="/start">Startseite</Link>
          <Link to="/login">LogIn</Link>

          {/* Routes: */}
          <div>
            <Route path="/start">
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
