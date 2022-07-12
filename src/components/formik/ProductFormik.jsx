//React
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
//Stylesheets
import "../../main.scss";
import "../../pages/product/newProducts/newproducts.scss";
//Api_&_Store
import axios from "axios";
import { putBackend } from "../../api/api";
import {
  onChange,
  pushProduct,
  onChangeToastMessage,
  onChangeToast,
} from "../../api/store/newProductSlice";
//Primereact
import { useFormik } from "formik";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { CascadeSelect } from "primereact/cascadeselect";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
//Components
import Upload from "../UploadData.jsx";

//Quelle: https://www.primefaces.org/primereact/formik/ abgeändert
function ProductFormik(props) {
  const [pricing, setPricing] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newproduct = props.data;

  useEffect(() => {
    // Quelle: Udemy-Kurs Abschnitt 8
    async function fetchAdditionalData() {
      const response = await axios("/data/newProductData.json");
      setPricing(response.data.pricing);
      setCategories(response.data.categories);
    }
    fetchAdditionalData();
  }, []); //eslint-disable-line

  const handleChange = (name, event) => {
    let value = "";
    name === "categories" ||
    name === "price" ||
    name === "discription" ||
    name === "count" ||
    name === "basis_fornegotioations"
      ? (value = event)
      : (value = event.target.value);
    dispatch(onChange({ value, name: name }));
  };

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    );
  };
  const header = renderHeader();

  const formik = useFormik({
    initialValues: {},
    validate: () => {
      const data = newproduct.product;
      let errors = {};

      if (!data.Name) {
        errors.Name = "Titel ist notwendig.";
      } else if (data.Name.length < 10) {
        errors.Name = "Der Titel ist zu kurz. Min. 10 Zeichen.";
      } else if (data.Name.length > 40) {
        errors.Name = "Der Titel ist zu lang. Max. 40 Zeichen.";
      }

      if (!data.categories) {
        errors.categories = "Eine Kategorie ist notwendig.";
      }

      if (data.price > 1000) {
        errors.price = "Preis zu hoch. (Bei Fragen, spreche mit dem Support)";
      } else if (data.price < 0) {
        errors.price = "Der Preis kann nicht im negativen Bereich sein.";
      } else if (
        data.basis_fornegotioations === "Zu Verschenken" ||
        data.article_type === "Ich tausche"
      ) {
        if (data.price !== 0) {
          errors.price =
            "Der Preis muss 0 sein, wenn du einen Artikel verschenken willst.";
        }
      } else if (data.price === 0) {
        if (
          data.basis_fornegotioations !== "Zu Verschenken" ||
          data.article_type !== "Ich tausche"
        ) {
          errors.price = "Preis ist notwenig.";
        }
      }

      if (data.basis_fornegotioations[0] === undefined) {
        errors.basis_fornegotioations = "Preiskategorie ist notwenig.";
      }
      if (!data.discription) {
        errors.discription = "Eine Beschreibung ist notwenig.";
      } else if (data.discription.length > 500) {
        errors.discription =
          "Die Beschreibung kann nicht größer als 500 Zeichen sein.";
      }

      return errors;
    },

    onSubmit: () => {
      return props.type !== "put"
        ? dispatch(pushProduct(newproduct))
        : setPutProduct(newproduct.product);
    },
  });

  const setPutProduct = async (data) => {
    let response = "";
    try {
      response = await putBackend(data);
    } catch (error) {
      console.log(error);
    }
    console.log(response);
    dispatch(onChangeToastMessage({ value: "success", name: "severity" }));
    dispatch(
      onChangeToastMessage({
        value: "Anzeige erfolgreich gespeichert!",
        name: "summary",
      })
    );
    dispatch(
      onChangeToastMessage({
        value:
          "Deine Anzeige wurde erfolgreich gespeichert. Andere können deine Änderungen jetzt sehen.",
        name: "detail",
      })
    );
    dispatch(onChangeToastMessage({ value: "4000", name: "life" }));
    dispatch(onChangeToast(true));
    setTimeout(() => {
      navigate("/");
    }, 2500);
  };

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return <small className="p-error">{formik.errors[name]}</small>;
  };
  return (
    <React.Fragment>
      <div className="newproduct card">
        <form onSubmit={formik.handleSubmit}>
          {/* General Information */}
          <h2>Informationen</h2>
          <div className="field first">
            {/* Typ */}
            <div className="p-field-radiobutton p-grid">
              <div className="p-col">
                <RadioButton
                  inputId="typ1"
                  name="typ"
                  value="Ich biete"
                  onChange={(e) => handleChange("article_type", e)}
                  checked={newproduct.product.article_type === "Ich biete"}
                />
                <label htmlFor="typ1">Ich biete</label>
              </div>
              <div className="p-col">
                <RadioButton
                  inputId="typ2"
                  name="typ"
                  value="Ich Suche"
                  onChange={(e) => handleChange("article_type", e)}
                  checked={newproduct.product.article_type === "Ich Suche"}
                />
                <label htmlFor="typ2">Ich suche</label>
              </div>
              <div className="p-col">
                <RadioButton
                  inputId="typ3"
                  name="typ"
                  value="Ich tausche"
                  onChange={(e) => {
                    handleChange("article_type", e);
                    handleChange("price", 0);
                  }}
                  checked={newproduct.product.article_type === "Ich tausche"}
                />
                <label htmlFor="typ3">Ich tausche</label>
              </div>
            </div>
            {/* Name */}
            <div className="p-field fieldinput">
              <span className="p-float-label">
                <InputText
                  id="Name"
                  name="Name"
                  aria-describedby="name-help"
                  value={newproduct.product.Name}
                  onChange={(e) => handleChange("Name", e)}
                  className={
                    (classNames({
                      "p-invalid": isFormFieldValid("Name"),
                    }),
                    "p-d-block block")
                  }
                />
                <label
                  htmlFor="Name"
                  className={classNames({
                    "p-error": isFormFieldValid("Name"),
                  })}
                >
                  Titel*
                </label>
              </span>
              <small id="name-help" className="p-d-block">
                Verwende einen knappen, aber verständlichen Titel
              </small>
              {getFormErrorMessage("Name")}
            </div>
            <div className="p-field fieldinput">
              <span className="p-float-label">
                <InputText
                  id="titleDetail"
                  aria-describedby="title-detail-help"
                  className="p-d-block block"
                  value={newproduct.product.detailtName}
                  onChange={(e) => handleChange("detailtName", e)}
                />
                <label htmlFor="titleDetail">Detaillierter Titel</label>
              </span>
              <small id="title-detail-help" className="p-d-block">
                Beschreibe dein Artikel mit kurzen Worten, um Personen
                aufmerksam zu machen.
              </small>
            </div>

            {/* Category */}
            <div className="p-field fieldcategory">
              <span className="p-float-label">
                <CascadeSelect
                  value={
                    newproduct.product.categories
                      ? {
                          name: newproduct.product.categories,
                        }
                      : null
                  }
                  options={categories} //ist ein object array mit allen unterkategorien
                  optionLabel={"name"}
                  optionGroupLabel={"groupName"}
                  optionGroupChildren={["opt1", "opt2", "opt3"]}
                  id="categories"
                  className="block"
                  onChange={(e) => handleChange("categories", e.value.name)}
                />
                <label
                  htmlFor="categories"
                  className={classNames({
                    "p-error": isFormFieldValid("categories"),
                  })}
                >
                  Kategorie*
                </label>
              </span>
              {/* </span> */}
              {getFormErrorMessage("categories")}
            </div>
            <div>
              {newproduct.product.categories === "Lebensmittel" ? (
                <span className="p-error">
                  Bitte stelle sicher, dass Du keine abgelaufenen oder
                  schlechten Lebensmittel anbietest. <br />
                  Schreib das Ablaufdatum bitte immer in die Beschreibung mit
                  dazu.
                </span>
              ) : null}
            </div>
            <br />
            {/* Count */}
            <div className="p-field fieldcategory">
              <span className="p-float-label">
                <InputNumber
                  inputId="count"
                  aria-describedby="count-help"
                  value={newproduct.product.count}
                  onChange={(e) => handleChange("count", e.value)}
                  suffix=" Stück"
                />
              </span>
              <small id="count-help" className="p-d-block">
                Gebe gegebenenfalls eine Stückzahl an.
              </small>
            </div>

            {/* ISBN */}
            {newproduct.product.categories === "Schulbücher" ||
            newproduct.product.categories === "Schullektüren" ||
            newproduct.product.categories === "Fachliteratur" ||
            newproduct.product.categories === "Freizeitbücher" ||
            newproduct.product.categories === "Comics/Zeitschriften" ||
            newproduct.product.categories === "Sonstiges" ||
            newproduct.product.categories === "Bücher" ? (
              <div className="p-field fieldcategory">
                <span className="p-float-label">
                  <InputText
                    id="ISBN"
                    name="ISBN"
                    aria-describedby="isbn-help"
                    value={newproduct.product.ISBN}
                    onChange={(e) => handleChange("ISBN", e)}
                  />
                  <label
                    htmlFor="ISBN"
                    className={classNames({
                      "p-error": isFormFieldValid("isbn"),
                    })}
                  >
                    ISBN
                  </label>
                </span>

                <small id="isbn-help" className="p-d-block">
                  Gebe gegebenfalls eine ISBN Nummer an. <br />
                  Dein Artikel kann besser gefunden werden.
                </small>
                {getFormErrorMessage("ISBN")}
              </div>
            ) : null}

            <hr />

            {/* Price */}
            <div className="p-grid p-fluid">
              <div className="p-field fieldprice">
                <label
                  htmlFor="price-help"
                  style={{ marginButtom: 0 }}
                  className={classNames({
                    "p-error": isFormFieldValid("price"),
                  })}
                >
                  Preis*
                </label>
                {newproduct.product.basis_fornegotioations ===
                  "Zu Verschenken" ||
                newproduct.product.article_type === "Ich tausche" ? (
                  <InputNumber
                    disabled
                    inputId="price-help"
                    mode="currency"
                    currency="EUR"
                    locale="de-DE"
                    id="price"
                    value={newproduct.product.price}
                    onChange={(e) => handleChange("price", e.value)}
                  />
                ) : (
                  <InputNumber
                    inputId="price-help"
                    mode="currency"
                    currency="EUR"
                    locale="de-DE"
                    id="price"
                    value={newproduct.product.price}
                    onChange={(e) => handleChange("price", e.value)}
                  />
                )}

                {getFormErrorMessage("price")}
              </div>
              <div className="p-field fieldprice">
                <span className="p-float-label">
                  <Dropdown
                    value={
                      newproduct.product?.basis_fornegotioations[0] !==
                      undefined
                        ? {
                            name: newproduct.product.basis_fornegotioations,
                          }
                        : null
                    }
                    options={pricing}
                    optionLabel="name"
                    className="block"
                    id="basis_fornegotioations"
                    onChange={(e) => {
                      handleChange("basis_fornegotioations", e.value.name);
                      return e.value.name === "Zu Verschenken"
                        ? handleChange("price", 0)
                        : null;
                    }}
                  />
                  <label
                    htmlFor="basis_fornegotioations"
                    className={classNames({
                      "p-error": isFormFieldValid("basis_fornegotioations"),
                    })}
                  >
                    Preiskategorie*
                  </label>
                </span>
              </div>
            </div>
            {getFormErrorMessage("basis_fornegotioations")}
          </div>
          {/* Beschreibung */}
          <h2>Details</h2>
          <div className="field">
            <div className="p-field fieldeditor">
              <Editor
                headerTemplate={header}
                value={newproduct.product.discription}
                onTextChange={(e) => handleChange("discription", e.htmlValue)}
                placeholder="Beschreibung*"
                className="editor"
                id="discription"
              />
              {/* </span> */}
              {getFormErrorMessage("discription")}
            </div>
            {/* Images */}
            {/* Quelle: https://www.primefaces.org/primereact/fileupload/ */}
            <Upload />
            {/* End */}
          </div>
          <div className="field">
            <div className="p-field fieldbutton">
              <span>Die Felder mit * müssen angegeben werden.</span>
              {/* <Link to="/messages" className="linkbutton">
                <Button
                  label="Vorschau (login)"
                  className="p-button-outlined p-button-success"
                />
              </Link> */}
            </div>

            <div className="p-field fieldbutton">
              <a href="#top">
                <Button
                  type="submit"
                  label={props.buttonname}
                  className="p-button-raised p-button-warning submitbutton"
                />
              </a>
            </div>
            {/* </div> */}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default ProductFormik;
