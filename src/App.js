import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import store from "./api/store/store";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeflex/primeflex.css"; // flex
import "primeicons/primeicons.css"; //icons

//Links
//general-pages
import Start from "./pages/start/Start.jsx";
import Login from "./pages/login/Login.jsx";
import NewProduct from "./pages/product/newProducts/NewProducts.jsx";
import ProductDetail from "./pages/product/productDetail/ProductDetail.jsx";
import Search from "./pages/search/Search.jsx";
import ProductEdit from "./pages/product/productEdit/ProductEdit.jsx";

//user-pages
import Me from "./pages/me/Me.jsx";
import MyProducts from "./pages/product/myproducts/Myproducts.jsx";
import Messages from "./pages/messages/Messages.jsx";
import Settings from "./pages/settings/Settings.jsx";

//other
import FAQ from "./pages/FAQ.jsx";
import Contact from "./pages/Contact.jsx";

//components
import Topbar from "./components/navbar/Topbar.jsx";
// import Footer from "./components/navbar/Footer.jsx";

import PageNotFound from "./components/PageNotFound.jsx";

// const queryClient = new QueryClient();

function App() {
  // require("halfmoon/css/halfmoon-variables.min.css");
  // require("halfmoon/css/halfmoon.min.css");
  // const halfmoon = require("halfmoon");
  // halfmoon.onDOMContentLoaded();

  // const toggleDemo = () => {
  //   halfmoon.toggleDarkMode();
  // };
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          {/* <QueryClientProvider client={queryClient}> */}
          <Topbar />
          {/* <button onClick={toggleDemo}>hallo</button> */}
          <Routes>
            {/* general-pages */}
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/productDetails/:id" element={<ProductDetail />} />
            <Route path="/search/:searchentry" element={<Search />} />
            <Route path="/product/edit/:id" element={<ProductEdit />} />
            {/* user-pages */}
            <Route path="/me" element={<Me />} />
            <Route path="/myproducts" element={<MyProducts />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />

            {/* other */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
          {/* <Footer /> */}
          {/* <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider> */}
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
