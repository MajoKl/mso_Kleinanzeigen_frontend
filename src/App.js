import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { useEffect, useState } from "react";
import React from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeflex/primeflex.css"; // flex
import "primeicons/primeicons.css"; //icons

//Links
import Start from "./start/start.jsx";
import Login from "./login/Login.jsx";
import Yeee from "./Yeee.jsx";
import NewProduct from "./products/NewProducts.jsx";
import Me from "./me/Me.jsx";
import Edit from "./sites/Edit.jsx";
import FAQ from "./sites/FAQ.jsx";
import Contact from "./sites/Contact.jsx";

import Topbar from "./navbar/Topbar.jsx";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <Router>
        <React.Fragment>
          <QueryClientProvider client={queryClient}>
            {/* Links: */}
            {/* <Link to="/">Startseite</Link>
          <Link to="/login">LogIn</Link> */}

            <Topbar />

            {/* <div>
            {/* Routes: */}
            {/* <Route path="/">
              <h1>Startseite</h1>
              <div>
                <Start />
                Willkommen auf der Seite!
              </div>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </div> */}
            <Switch>
              <Route path="/" exact component={Start} />
              <Route path="/login" component={Login} />
              <Route path="/newproduct" component={NewProduct} />
              <Route path="/yeee" component={Yeee} />
              <Route path="/me" component={Me} />
              <Route path="/edit" component={Edit} />
              <Route path="/faq" component={FAQ} />
              <Route path="/contact" component={Contact} />
            </Switch>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
