import { BrowserRouter, Link, Route} from "react-router-dom";
import React from "react";

//Links
import Start from "./start/start.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <React.Fragment>
          {/* Links: */}
          <Link to="/start">Startseite</Link>

          {/* Routes: */}
          <div>
            <Route path="/start">
              <h1>Startseite</h1>
              <div>
                <Start/>
                Willkommen auf der Seite!
              </div>
            </Route>
          </div>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;