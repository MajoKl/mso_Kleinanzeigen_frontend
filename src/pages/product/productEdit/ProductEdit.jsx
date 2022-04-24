import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../../main.scss";
import "../newProducts/newproducts.scss";
import { onChange, onChangeStatus } from "../../../api/store/newProductSlice";
import ToastMessages from "../../../components/ToastMessages";
import ProductFormik from "../../../components/formik/ProductFormik";

import { useDispatch, useSelector } from "react-redux";

function ProductEdit() {
  const [product, setProduct] = useState("");
  const newproduct = useSelector((state) => state.newProduct);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(newproduct);
  console.log(product);

  useEffect(() => {
    requestBackend();
  }, []); // eslint-disable-line

  const requestBackend = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/articles?article_id=${id}`,
      { withCredentials: true },
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://kleinanzeigen_api.jonaslbgtt.live:8080",
        },
      }
    );
    setProduct(response.data[0]);
  };

  useEffect(() => {
    return product !== "" ? (setNewProductState(), setNewStatusState()) : null;
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
      name: "pictures",
      value: product.pictures,
    },
    {
      name: "",
      value: newproduct.status.severity,
    },
  ];

  const setNewProductState = () => {
    additionalData.map(
      (i) => handleChange(i.name, i.value)
      // {
      //   console.log(i.name + " - " + i.value);
      //   return ;
      //       }
    );
  };
  const setNewStatusState = () => {
    dispatch(onChangeStatus());
    console.log(newproduct.status);
  };

  const handleChange = (name, event) => {
    let value = "";
    name === "basis_fornegotioations" ? (value = event) : (value = event);
    dispatch(onChange({ value, name: name }));
  };

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
