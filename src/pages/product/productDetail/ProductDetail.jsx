// React
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Stylesheets
import "./productDetail.scss";
//Api_&_Store
import axios from "axios";
import { requestUser } from "../../../api/store/userSlice";
//Primereact
import { Panel } from "primereact/panel";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { ToggleButton } from 'primereact/togglebutton';
//Components
import Galleria from "../../../components/Galleriaa";
import Infotable from "../../../components/infotable/Infotable";
import { putBackend } from "../../../api/api";

function ProductDetail() {
  const username = useSelector((state) => state.user.user.name);
  const [product, setProduct] = useState("");
  const { id } = useParams();
  const toast = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    setTimeout(() => {
      setProduct(response.data[0]);
    }, 10);
  };

  useEffect(() => {
    requestBackend();
    if (username === "") {
      dispatch(requestUser("/api/me"));
    }
  }, []); // eslint-disable-line

  const setDate = (data) => {
    let date = new Date(data);
    return (
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    );
  };

  const onDeleteClick = () => {
    //https://www.primefaces.org/primereact/confirmdialog/
    confirmDialog({
      message:
        "Bist du Dir sicher dass du die Anzeige löschen willst? \n Dieser Schritt kann nicht wieder rückgängig gemacht werden!",
      header: "Löschen bestätigen",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: onDelete,
      reject: reject,
    });
  };
  const reject = () => {
    toast.current.show({
      severity: "info",
      summary: "Abgelehnt",
      detail: "Die Anzeige wurde nicht gelöscht.",
      life: 3000,
    });
  };
  const onDelete = () => {
    requestDelete();
  };
  const requestDelete = () => {
    const config = {
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/me/articles?article=${id}`,
      withCredentials: true,
      headers: {
        headers: {
          "Access-Control-Allow-Origin":
            "http://kleinanzeigen_api.jonaslbgtt.live:8080",
        },
      },
    };

    axios(config)
      .then((response) => {
        setError(JSON.stringify(response.data));
      })
      .catch(function (error) {
        toast.current.show({
          severity: "error",
          summary: "Error!",
          detail:
            "Request to Backend failed... Article can't be deleted. Please try again.",
          life: 8000,
        });
      });
  };
  const setError = (data) => {
    return data !== '{"deletedCount":1}'
      ? toast.current.show({
        severity: "error",
        summary: "Error!",
        detail:
          "Request to Backend failed... Article can't be deleted. Please try again.",
        life: 8000,
      })
      : (setTimeout(() => {
        navigate("/");
      }, 5000),
        toast.current.show({
          severity: "success",
          summary: "Fertig!",
          detail: "Die Anzeige wurde erfolgreich gelöscht.",
          life: 4000,
        }));
  };

  const onEditClick = () => {
    navigate("/product/edit/" + id);
  };
  const onPrivateClick = (toggle) => {
    try {
      setProduct(prevState => ({
        ...prevState,
        private: toggle
      }));
    } catch (error) {
      console.log(error);
    }
    putBackend({ _id: product._id, private: toggle });
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
    {
      icon: "pi pi-eye-slash",
      tag: "Deaktiviert",
      value: product.private ? "Ja" : "Nein",
    },
  ];

  const leftContents = (
    <React.Fragment>
      <Button
        label="Bearbeiten"
        id="edit"
        icon="pi pi-pencil"
        className="p-button-rounded p-button-help"
        onClick={onEditClick}
      />
      <ToggleButton
        checked={product.private}
        onChange={(e) => onPrivateClick(e.value)}//wird zu true oder zu false
        onLabel="Deaktiviert"
        offLabel="Aktiviert"
        onIcon="pi pi-eye-slash"
        offIcon="pi pi-eye"
        className="p-button-rounded p-button-help"
        style={{ width: '10em' }}
      // aria-label="Confirmation"
      />

    </React.Fragment>
  );

  const rightContents = (
    <React.Fragment>
      <Button
        label="Löschen"
        id="delete"
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={onDeleteClick}
      />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Toast ref={toast} />
      <div className="container product-container">
        <h1>{product.Name}</h1>
        <hr />
        <div className="product-card card">
          <div className="product-card-content">
            {console.log(product._id)}
            {product._id !== "" ? (
              <Galleria images={product.pictures} articleID={product._id} />
            ) : (
              "lol"
            )}
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
          {product !== "" ? (
            username === product.owner?.name ? (
              <div className="product-card-content card">
                <h2 className="product-headline">Aktionen</h2>
                {/* Quelle: https://www.primefaces.org/primereact/toolbar/ */}
                <Toolbar left={leftContents} right={rightContents} />
              </div>
            ) : null
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductDetail;
