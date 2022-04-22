import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./productDetail.scss";

import { Fieldset } from "primereact/fieldset";

import Galleria from "../../components/Galleriaa";

function ProductDetail() {
  const [product, setProduct] = useState("");
  const { id } = useParams();

  // const products = useSelector((state) => state.products);

  //Fehler beim neuladen der Seite. Is so naja aber schwer zu fixen
  // useEffect(() => {
  //   console.log("In UseEffekt");
  //   console.log(products.products[0]._id + " === " + id);
  //   for (let i = 0; i < products.products.length; i++) {
  //     if (products.products[i]._id === id) {
  //       console.log("Gefunden!");
  //       setProduct(products.products[i]);
  //     }
  //   }
  // }, [products]); // eslint-disable-line

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
  console.log(product);

  useEffect(() => {
    requestBackend();
  }, []); // eslint-disable-line

  return (
    <div className="container product-container">
      <h1>Name des Artikels!</h1>
      <hr />
      <div className="product-card card">
        <div className="product-card-img card">
          <Galleria />
        </div>

        <div className="product-card-content card">
          <h2>Informationen</h2>
          <h4 className="product-name">{product.Name}</h4>
          <h4 className="product-det-name">{product.detailtName}</h4>
          <Fieldset legend="Header">
            <p>{product.discription}</p>
          </Fieldset>
          <span>{product._id}</span>
          <span>{product.categories}</span>
          <span>{product.count}</span>
          <span>{product.price}</span>
          <span>{product.createtedAt}</span>
          Content
        </div>
        <div className="card">extra</div>
      </div>
    </div>
  );
}

export default ProductDetail;
