import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./productDetail.scss";

import { Fieldset } from "primereact/fieldset";

import Galleria from "../../components/Galleriaa";

function ProductDetail(props) {
  const [product, setProduct] = useState("");
  const products = useSelector((state) => state.products);

  useEffect(() => {
    console.log(props.match.params.id);
    for (let i = 0; i < products.products.length; i++) {
      if (products.products[i]._id === props.match.params.id) {
        console.log("Gefunden!");
        setProduct(products.products[i]);
      }
    }
  });
  console.log(product);
  return (
    <div className="container product-container">
      <h1>Name des Artikels!</h1>
      <hr />
      <div className="product-card card">
        <div className="product-card-img card">
          Bilder
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
        <div className="card">ectra</div>
      </div>
    </div>
  );
}

export default ProductDetail;
