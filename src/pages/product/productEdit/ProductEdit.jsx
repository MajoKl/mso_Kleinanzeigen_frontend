//React
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Stylesheets
import "../../../main.scss";
import "../newProducts/newproducts.scss";
//Api_&_Store
import { onChange, onChangeToast } from "../../../api/store/newProductSlice";
//Primereact
import { Toast } from "primereact/toast";
//Components
import ProductFormik from "../../../components/formik/ProductFormik";
import { getBackend } from "../../../api/api";

function ProductEdit() {
  const [product, setProduct] = useState("");
  const newproduct = useSelector((state) => state.newProduct);
  const dispatch = useDispatch();

  const toast = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const requestBackend = async () => {
      const response = await getBackend("/api/users/articles?article_id=" + id);
      setProduct(response[0]);
    };
    requestBackend();
  }, []); // eslint-disable-line

  useEffect(() => {
    return product !== "" ? setNewProductState() : null;
  }, [product]); // eslint-disable-line

  const additionalData = [
    {
      name: "article_type",
      value: product.article_type,
    },
    {
      name: "Name",
      value: product.Name,
    },
    {
      name: "detailtName",
      value: product.detailtName,
    },
    {
      name: "categories",
      value: product.categories,
    },
    {
      name: "count",
      value: product.count,
    },
    {
      name: "ISBN",
      value: product.ISBN,
    },
    {
      name: "basis_fornegotioations",
      value: product?.basis_fornegotioations,
    },
    {
      name: "price",
      value: product.price,
    },
    {
      name: "discription",
      value: product.discription,
    },
    {
      name: "_id",
      value: product._id,
    },
    {
      name: "private",
      value: product.private,
    },
  ];

  const setNewProductState = () => {
    additionalData.map((i) => handleChange(i.name, i.value));
  };

  const handleChange = (name, event) => {
    let value = "";
    name === "basis_fornegotioations" ? (value = event) : (value = event);
    dispatch(onChange({ value, name: name }));
  };

  useEffect(() => {
    return newproduct.toast.setToast === true
      ? (setTimeout(() => {
        dispatch(onChangeToast(false));
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
        <h1>Artikel Bearbeiten</h1>
        <hr />
        <ProductFormik
          data={newproduct}
          type="put"
          buttonname="Anzeige speichern"
        />
      </div>
    </React.Fragment>
  );
}

export default ProductEdit;
