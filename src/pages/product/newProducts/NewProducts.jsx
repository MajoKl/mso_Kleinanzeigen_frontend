//React
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Stylesheets
import "../../../main.scss";
import "./newproducts.scss";
//Api_&_Store
import { onChangeToast } from "../../../api/store/newProductSlice";
//Primereact
import { Toast } from "primereact/toast";
//Components
import ProductFormik from "../../../components/formik/ProductFormik";

function NewProducts() {
  const newproduct = useSelector((state) => state.newProduct);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return newproduct.toast.setToast === true
      ? (setTimeout(() => {
          dispatch(onChangeToast(false));
          navigate("/");
        }, newproduct.status.life),
        toast.current.show({
          severity: newproduct.status.severity,
          summary: newproduct.status.summary,
          detail: newproduct.status.detail,
          life: newproduct.status.life,
        }))
      : null;
  }, [newproduct.toast.setToast]); // eslint-disable-line

  return (
    <React.Fragment>
      <Toast ref={toast} />
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
