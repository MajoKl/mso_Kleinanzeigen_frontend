import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import store from "./api/store/store";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeflex/primeflex.css"; // flex
import "primeicons/primeicons.css"; //icons

//Links
//general-pages
import Start from "./pages/start/start.jsx";
import Login from "./pages/login/Login.jsx";
import NewProduct from "./pages/newProducts/NewProducts.jsx";

//user-pages
import Me from "./pages/me/Me.jsx";
import MyProducts from "./pages/myproducts/Myproducts.jsx";
import Messages from "./pages/messages/Messages.jsx";
import Settings from "./pages/settings/Settings.jsx";

//other
import FAQ from "./pages/FAQ.jsx";
import Contact from "./pages/Contact.jsx";

//components
import Topbar from "./components/navbar/Topbar.jsx";

import Yeee from "./Yeee.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <QueryClientProvider client={queryClient}>
            <Topbar />
            <Switch>
              {/* general-pages */}
              <Route path="/" exact component={Start} />
              <Route path="/login" component={Login} />
              <Route path="/newproduct" component={NewProduct} />

              {/* user-pages */}
              <Route path="/me" component={Me} />
              <Route path="/myproducts" component={MyProducts} />
              <Route path="/messages" component={Messages} />
              <Route path="/settings" component={Settings} />

              {/* other */}
              <Route path="/faq" component={FAQ} />
              <Route path="/contact" component={Contact} />

              <Route path="/yeee" component={Yeee} />
            </Switch>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
