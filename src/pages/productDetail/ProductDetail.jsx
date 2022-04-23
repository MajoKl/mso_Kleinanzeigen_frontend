import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./productDetail.scss";

import { Panel } from "primereact/panel";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

import Galleria from "../../components/Galleriaa";
import Infotable from "../../components/infotable/Infotable";

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

  const setDate = (data) => {
    let date = new Date(data);
    return (
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    );
  };

  const InfotableData = [
    {
      icon: "pi pi-tag",
      tag: "Kategorie",
      value: product.categories !== undefined ? product.categories[0] : null,
    },
    {
      icon: "pi pi-sort-alt",
      tag: "Typ",
      value: product.article_type,
    },
    {
      icon: "pi pi-sort-amount-up-alt",
      tag: "Anzahl",
      value: product.count,
    },
    {
      icon: "barcode icon",
      tag: "ISBN",
      value: product.ISBN,
    },
    {
      icon: "pi pi-calendar",
      tag: "Erstellt am",
      value: setDate(product.createdAt),
    },
    {
      icon: "pi pi-info-circle",
      tag: "ID",
      value: product._id,
    },
    {
      icon: "pi pi-user",
      tag: "Erstellt von",
      value: product.owner?.name,
    },
  ];

  const leftContents = (
    <React.Fragment>
      <Button
        label="Bearbeiten"
        icon="pi pi-pencil"
        className="p-button-rounded p-button-help"
      />
    </React.Fragment>
  );

  const rightContents = (
    <React.Fragment>
      <Button
        label="Löschen"
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
      />
    </React.Fragment>
  );

  return (
    <div className="container product-container">
      <h1>{product.Name}</h1>
      <hr />
      <div className="product-card card">
        <div className="product-card-content">
          <Galleria />
        </div>

        <div className="product-card-content card">
          <h2 className="product-headline">Informationen</h2>
          <div className="product-info-head">
            <div>
              <span>{product.Name}</span>
            </div>
            <div>
              <span className="product-price">
                {product.price === 0 ? "Zu Verschenken" : product.price + "€"}
                {product.basis_fornegotioations === "Verhandlungsbasis"
                  ? " VB"
                  : ""}
              </span>
            </div>
          </div>
          <br />
          <br />
          <Panel header="Beschreibung">
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: product.discription }}
            ></div>
          </Panel>
          <br />
          <br />
          <Infotable data={InfotableData} />
        </div>

        <div className="product-card-content card">
          <h2 className="product-headline">Aktionen</h2>
          <Toolbar left={leftContents} right={rightContents} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
