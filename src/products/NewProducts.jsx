import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../main.scss";
import "./newproducts.scss";

import { useFormik } from "formik";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { CascadeSelect } from "primereact/cascadeselect";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";

import Upload from "../components/UploadData.jsx";

function NewProducts() {
  //   const [typ, setTyp] = useState("biete");
  //   const [title, setTitle] = useState("");
  //   const [titleDetail, setTitleDetail] = useState("");
  //   const [category, setCategory] = useState(null);
  const countries = [
    {
      name: "Australia",
      code: "AU",
      states: [
        {
          name: "New South Wales",
          cities: [
            { cname: "Sydney", code: "A-SY" },
            { cname: "Newcastle", code: "A-NE" },
            { cname: "Wollongong", code: "A-WO" },
          ],
        },
        {
          name: "Queensland",
          cities: [
            { cname: "Brisbane", code: "A-BR" },
            { cname: "Townsville", code: "A-TO" },
          ],
        },
      ],
    },
    {
      name: "Canada",
      code: "CA",
      states: [
        {
          name: "Quebec",
          cities: [
            { cname: "Montreal", code: "C-MO" },
            { cname: "Quebec City", code: "C-QU" },
          ],
        },
        {
          name: "Ontario",
          cities: [
            { cname: "Ottawa", code: "C-OT" },
            { cname: "Toronto", code: "C-TO" },
          ],
        },
      ],
    },
    {
      name: "United States",
      code: "US",
      states: [
        {
          name: "California",
          cities: [
            { cname: "Los Angeles", code: "US-LA" },
            { cname: "San Diego", code: "US-SD" },
            { cname: "San Francisco", code: "US-SF" },
          ],
        },
        {
          name: "Florida",
          cities: [
            { cname: "Jacksonville", code: "US-JA" },
            { cname: "Miami", code: "US-MI" },
            { cname: "Tampa", code: "US-TA" },
            { cname: "Orlando", code: "US-OR" },
          ],
        },
        {
          name: "Texas",
          cities: [
            { cname: "Austin", code: "US-AU" },
            { cname: "Dallas", code: "US-DA" },
            { cname: "Houston", code: "US-HO" },
          ],
        },
      ],
    },
  ];
  //   const [price, setPrice] = useState(0);
  //   const [priceCategory, setPriceCategory] = useState(null);
  //   const [description, setDescription] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

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
    initialValues: {
      typ: "biete",
      title: "",
      titleDetail: "",
      category: "hf",
      price: 0,
      priceCategory: null,
      description: "fffff",
    },
    validate: (data) => {
      let errors = {};

      if (!data.title) {
        errors.title = "Titel ist notwendig.";
      } else if (data.title.length < 10) {
        errors.title = "Der Titel ist zu kurz. Min. 10 Zeichen.";
      } else if (data.title.length > 30) {
        errors.title = "Der Titel ist zu lang. Max. 30 Zeichen.";
      }

      if (!data.category) {
        errors.category = "Eine Kategorie ist notwendig.";
      }

      if (!data.price) {
        errors.price = "Preis ist notwenig.";
      } else if (data.price > 1000) {
        errors.price = "Preis zu hoch. (Bei Fragen, spreche mit dem Support)";
      } else if (data.price < 0) {
        errors.price = "Der Preis kann nicht im negativen Bereich sein.";
      }

      if (!data.priceCategory) {
        errors.priceCategory = "Preiskategorie ist notwenig.";
      }
      if (!data.description) {
        errors.description = "Eine Beschreibung ist notwenig.";
      } else if (data.description.length > 500) {
        errors.description =
          "Die Beschreibung kann nicht größer als 500 Zeichen sein.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      setShowMessage(true);

      formik.resetForm();
    },
  });
  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };
  const dialogFooter = (
    <div className="p-d-flex p-jc-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );

  return (
    <div className="container">
      <h1>Artikel Inserieren</h1>
      <hr />
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your account is registered under name <b>{formData.name}</b> ; it'll
            be valid next 30 days without activation. Please check{" "}
            <b>{formData.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog>
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
                  value="biete"
                  //   onChange={(e) => setTyp(e.value)}
                  //   value={formik.values.typ}
                  onChange={formik.handleChange}
                  checked={formik.values.typ === "biete"}
                />
                <label htmlFor="typ1">Ich biete</label>
              </div>
              <div className="p-col">
                <RadioButton
                  inputId="typ2"
                  name="typ"
                  value="suche"
                  //   onChange={(e) => setTyp(e.value)}
                  onChange={formik.handleChange}
                  checked={formik.values.typ === "suche"}
                />
                <label htmlFor="typ2">Ich suche</label>
              </div>
              <div className="p-col">
                <RadioButton
                  inputId="typ3"
                  name="typ"
                  value="tausche"
                  //   onChange={(e) => setTyp(e.value)}
                  onChange={formik.handleChange}
                  checked={formik.values.typ === "tausche"}
                />
                <label htmlFor="typ3">Ich tausche</label>
              </div>
            </div>
            {/* Title */}
            <div className="p-field fieldinput">
              <span className="p-float-label">
                <InputText
                  id="title"
                  name="title"
                  aria-describedby="title-help"
                  className="p-d-block block"
                  // value={title}
                  //   onChange={(e) => setTitle(e.target.value)}
                  // placeholder="Titel"
                  tooltip="Dieses Feld ist ein Pflichtfeld"
                  tooltipOptions={{ position: "top" }}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  autoFocus
                  // className={classNames({
                  //   "p-invalid": isFormFieldValid("title"),
                  // })}
                />
                <label
                  htmlFor="title"
                  className={classNames({
                    "p-error": isFormFieldValid("title"),
                  })}
                >
                  Titel*
                </label>
              </span>
              <small id="title-help" className="p-d-block">
                Verwende einen knappen, aber verständlichen Titel
              </small>
              {getFormErrorMessage("title")}
            </div>
            <div className="p-field fieldinput">
              <span className="p-float-label">
                <InputText
                  id="title-detail"
                  aria-describedby="title-detail-help"
                  className="p-d-block block"
                  // value={titleDetail}
                  //   onChange={(e) => setTitleDetail(e.target.value)}
                  //   placeholder="Detailierter Titel"
                  tooltip="Dieses Feld ist kein Pflichtfeld"
                  tooltipOptions={{ position: "top" }}
                  value={formik.values.titleDetail}
                  onChange={formik.handleChange}
                  autoFocus
                />
                <label htmlFor="title-detail">Detaillierter Titel</label>
              </span>
              <small id="title-detail-help" className="p-d-block">
                Beschreibe dein Artikel mit kurzen Worten, um Personen
                aufmerksam zu machen.
              </small>
            </div>
            {/* Category */}
            <div className="p-field fieldcategory">
              <Tooltip target=".selecttip" position="top" />
              <span
                className="selecttip"
                data-pr-tooltip="Dieses Feld ist ein Pflichtfeld"
              >
                <span className="p-float-label">
                  <CascadeSelect
                    // value={category}
                    options={countries} //ist object array mit allen unterkategorien
                    optionLabel={"cname"}
                    optionGroupLabel={"name"}
                    optionGroupChildren={["states", "cities"]}
                    // placeholder={"Wähle eine Kategorie aus"}
                    // onChange={(event) => setCategory(event.value)}
                    id="category"
                    className="block"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    autoFocus
                    // className={classNames({
                    //   "p-invalid": isFormFieldValid("category"),
                    // })}
                  />
                  <label
                    htmlFor="category"
                    className={classNames({
                      "p-error": isFormFieldValid("category"),
                    })}
                  >
                    Kategorie*
                  </label>
                </span>
              </span>
              {getFormErrorMessage("category")}
            </div>
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
                <InputNumber
                  inputId="price-help"
                  mode="currency"
                  currency="EUR"
                  locale="de-DE"
                  //   value={price}
                  //   onValueChange={(e) => setPrice(e.value)}
                  tooltip="Dieses Feld ist ein Pflichtfeld"
                  tooltipOptions={{ position: "top" }}
                  id="price"
                  value={formik.values.price}
                  onValueChange={formik.handleChange}
                  autoFocus
                  // className={classNames({
                  //   "p-invalid": isFormFieldValid("price"),
                  // })}
                />
                {getFormErrorMessage("price")}
              </div>
              <div className="p-field fieldprice">
                <span className="p-float-label">
                  <Dropdown
                    //   value={priceCategory}
                    options={countries}
                    //   onChange={(e) => setPriceCategory(e.value)}
                    optionLabel="name"
                    // placeholder="Preiskategorie"
                    className="block"
                    tooltip="Dieses Feld ist ein Pflichtfeld"
                    tooltipOptions={{ position: "top" }}
                    id="priceCategory"
                    value={formik.values.priceCategory}
                    onChange={formik.handleChange}
                    autoFocus
                    // className={classNames({
                    //   "p-invalid": isFormFieldValid("priceCategory"),
                    // })}
                  />
                  <label
                    htmlFor="priceCategory"
                    className={classNames({
                      "p-error": isFormFieldValid("priceCategory"),
                    })}
                  >
                    Preiskategorie*
                  </label>
                </span>
                {getFormErrorMessage("priceCategory")}
              </div>
            </div>
          </div>
          {/* Beschreibung */}
          <h2>Details</h2>
          <div className="field">
            <div className="p-field fieldeditor">
              <Tooltip target=".editortip" position="top" />
              <span
                className="editortip"
                data-pr-tooltip="Dieses Feld ist ein Pflichtfeld"
              >
                <Editor
                  headerTemplate={header}
                  //   value={description}
                  //   onTextChange={(e) => setDescription(e.htmlValue)}
                  placeholder="Beschreibung*"
                  className="editor"
                  id="description"
                  value={formik.values.description}
                  onTextChange={formik.handleChange}
                  autoFocus
                  // className={classNames({
                  //   "p-invalid": isFormFieldValid("description"),
                  // })}
                />
              </span>
              {getFormErrorMessage("description")}
            </div>
            {/* Images */}
            <Upload />
            {/* End */}
          </div>
          <div className="field">
            {/* <div className="p-grid p-fluid"> */}
            <div className="p-field fieldbutton">
              <Link to="/login" className="linkbutton">
                <Button
                  label="Vorschau (login)"
                  className="p-button-outlined p-button-success"
                />
              </Link>
            </div>

            <div className="p-field fieldbutton">
              <Button
                type="submit"
                label="Anzeige aufgeben"
                className="p-button-raised p-button-warning submitbutton"
              />
            </div>
            {/* </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProducts;
