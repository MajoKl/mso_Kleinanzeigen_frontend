import React from "react";

// import { RootState } from "../../api/store/store";
// import { ProgressSpinner } from "primereact/progressspinner";

import Products from "../../components/products/Products";
// import ToastMessages from "../../components/ToastMessages";

function Myproducts() {
  return (
    <React.Fragment>
      {/* {products.status.severity !== "" ? (
        <ToastMessages
          severity={products.status.severity}
          summary={products.status.summary}
          detail={products.status.detail}
          life={products.status.life}
        /> */}
      {/* ) : ( */}
      <div className="container">
        <h1>Meine Produkte</h1>
        <Products searchoption="me" otheroptions="" />
      </div>
      {/* )} */}
    </React.Fragment>
  );
}

export default Myproducts;
