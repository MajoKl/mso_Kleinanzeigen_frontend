import React from "react";
import "../../../main.scss";
import "./newproducts.scss";

import ToastMessages from "../../../components/ToastMessages";
import ProductFormik from "../../../components/formik/ProductFormik";

import { useSelector } from "react-redux";

function NewProducts() {
  const newproduct = useSelector((state) => state.newProduct);

  return (
    <React.Fragment>
      {newproduct.status.severity !== "" ? (
        <ToastMessages
          severity={newproduct.status.severity}
          summary={newproduct.status.summary}
          detail={newproduct.status.detail}
          life={newproduct.status.life}
          sticky={newproduct.status.sticky}
        />
      ) : null}

      <div className="container">
        <h1>Artikel Inserieren</h1>
        <hr />
        <ProductFormik
          data={newproduct}
          type="push"
          buttonname="Anzeige aufgeben"
        />
      </div>
    </React.Fragment>
  );
}

export default NewProducts;
