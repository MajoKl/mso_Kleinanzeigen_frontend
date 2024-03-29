//React
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

//Api_&_Store
import { Provider } from "react-redux";
import store from "./api/store/store";

//Primeract
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
import PageNotFound from "./components/PageNotFound.jsx";
import CheckLogin from "./components/CheckLogin";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <CheckLogin />
          <Topbar />
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
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
