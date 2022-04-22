import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
import Start from "./pages/start/Start.jsx";
import Login from "./pages/login/Login.jsx";
import NewProduct from "./pages/newProducts/NewProducts.jsx";
import ProductDetail from "./pages/productDetail/ProductDetail.jsx";
import Search from "./pages/search/Search.jsx";

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
// import Footer from "./components/navbar/Footer.jsx";

import Yeee from "./Yeee.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <QueryClientProvider client={queryClient}>
            <Topbar />
            <Routes>
              {/* general-pages */}
              <Route path="/" element={<Start />} />
              <Route path="/login" element={<Login />} />
              <Route path="/newproduct" element={<NewProduct />} />
              <Route path="/productDetails/:id" element={<ProductDetail />} />
              <Route path="/search/:searchentry" element={<Search />} />
              {/* user-pages */}
              <Route path="/me" element={<Me />} />
              <Route path="/myproducts" element={<MyProducts />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />

              {/* other */}
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/yeee" element={<Yeee />} />
            </Routes>
            {/* <Footer /> */}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
