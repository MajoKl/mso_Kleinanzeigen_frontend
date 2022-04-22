import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./productDetail.scss";

import { Panel } from "primereact/panel";

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

  const InfotableData = [
    {
      icon: "pi pi-tag",
      tag: "Kategorie",
      value: product.categories,
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
      icon: "pi pi-clock",
      tag: "Erstellt am",
      value: product.createdAt,
    },
    {
      icon: "pi pi-info-circle",
      tag: "ID",
      value: product._id,
    },
    {
      icon: "pi pi-user",
      tag: "Erstellt von",
      value: product.owner.name,
    },
  ];

  const renderItem = (i) => {
    return i.value ? (
      <div className="ui segment" key={i.tag}>
        <div>
          <i className={i.icon} />
        </div>
        <div>
          <span className="tag">{i.tag}</span>
        </div>
        <div className="value">
          <span>{i.value}</span>
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="container product-container">
      <h1>{product.Name}</h1>
      <hr />
      <div className="product-card card">
        <div className="product-card-img">
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
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel
              eum iriure dolor in hendrerit in vulputate velit esse molestie
              consequat, vel illum dolore eu feugiat nulla facilisis at vero
              eros et accumsan et iusto odio dignissim qui blandit praesent
              luptatum zzril delenit augue duis dolore te feugait nulla
              facilisi. Lorem ipsum dolor sit amet,
            </p>
          </Panel>
          <br />
          <br />
          <div className="ui segments product-infotable">
            {InfotableData.map((line) => renderItem(line))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
