import React, { useEffect, useRef } from "react";
import "../../../main.scss";
import "./newproducts.scss";

import { Toast } from "primereact/toast";
import ProductFormik from "../../../components/formik/ProductFormik";

import { useDispatch, useSelector } from "react-redux";

import { onChangeToast } from "../../../api/store/newProductSlice";

function NewProducts() {
  const newproduct = useSelector((state) => state.newProduct);
  const toast = useRef(null);
  const dispatch = useDispatch();
  console.log(newproduct.toast.setToast);

  useEffect(() => {
    return newproduct.toast.setToast === true
      ? (setTimeout(() => {
          dispatch(onChangeToast(false));
          console.log("Auf flase");
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
      {/* {console.log(newproduct.toast.setToast)}
      {newproduct.toast.setToast === true
        ? (setTimeout(() => {
            dispatch(onChangeToast(false));
          }, 4000),
          (
            <ToastMessages
              severity={newproduct.status.severity}
              summary={newproduct.status.summary}
              detail={newproduct.status.detail}
              life={newproduct.status.life}
            />
          ))
        : console.log("lol")} */}

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
