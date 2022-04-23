import React from "react";
import { Link } from "react-router-dom";
import "../../../main.scss";
import "./newproducts.scss";

import { onChange, pushProduct } from "../../../api/store/newProductSlice";
import ToastMessages from "../../../components/ToastMessages";

import { useFormik } from "formik";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { CascadeSelect } from "primereact/cascadeselect";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

import Upload from "../../../components/UploadData.jsx";
import { useDispatch, useSelector } from "react-redux";

function NewProducts() {
  const pricing = [
    {
      name: "Festpreis",
    },
    {
      name: "Verhandlungsbasis",
    },
    {
      name: "Zu Verschenken",
    },
  ];

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

  const dispatch = useDispatch();
  const newproduct = useSelector((state) => state.newProduct);
  console.log(newproduct);

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
      console.log(data);
      let errors = {};

      if (!data.Name) {
        errors.Name = "Titel ist notwendig.";
      } else if (data.Name.length < 10) {
        errors.Name = "Der Titel ist zu kurz. Min. 10 Zeichen.";
      } else if (data.Name.length > 30) {
        errors.Name = "Der Titel ist zu lang. Max. 30 Zeichen.";
      }

      if (!data.categories) {
        errors.categories = "Eine Kategorie ist notwendig.";
      }

      if (!data.price) {
        errors.price = "Preis ist notwenig.";
      } else if (data.price > 1000) {
        errors.price = "Preis zu hoch. (Bei Fragen, spreche mit dem Support)";
      } else if (data.price < 0) {
        errors.price = "Der Preis kann nicht im negativen Bereich sein.";
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
      // setFormData(data);
      console.log(newproduct.product);
      dispatch(pushProduct(newproduct.product));

      //Okay also: Entweder mach ich das so über die Slice. Oder ich lass es.
      // Weil ich sonst alles über fromik mache.Das kann man in der Zukunft nochmal ändern,
      //   jedoch hab ich da jkein Bock drauf.Weil es funktioniert.Sooo...Jedoch kann man auch
      //   einfach die POST Request an Jonas hier in ner Funktion schreiben.ich galueb das mache ich auch.
      //   Is iwie einfacher Lmao.
      // dispatch(pushProduct());

      // formik.resetForm();
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return (
      // isFormFieldValid(name) && (
      <small className="p-error">{formik.errors[name]}</small>
      // )
    );
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
        <h1>Artikel Inserieren</h1>
        <hr />
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
                    value="Ich suche"
                    onChange={(e) => handleChange("article_type", e)}
                    checked={newproduct.product.article_type === "Ich suche"}
                  />
                  <label htmlFor="typ2">Ich suche</label>
                </div>
                <div className="p-col">
                  <RadioButton
                    inputId="typ3"
                    name="typ"
                    value="Ich tausche"
                    onChange={(e) => handleChange("article_type", e)}
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
                    //   className="p-d-block block"
                    // value={title}
                    //   onChange={(e) => setTitle(e.target.value)}
                    // placeholder="Titel"
                    //   tooltip="Dieses Feld ist ein Pflichtfeld"
                    //   tooltipOptions={{ position: "top" }}
                    value={newproduct.product.Name}
                    onChange={(e) => handleChange("Name", e)}
                    className={
                      (classNames({
                        "p-invalid": isFormFieldValid("Name"),
                      }),
                      "p-d-block block")
                      //funktioniert nicht
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
                    // value={titleDetail}
                    //   onChange={(e) => setTitleDetail(e.target.value)}
                    //   placeholder="Detailierter Titel"
                    //   tooltip="Dieses Feld ist kein Pflichtfeld"
                    //   tooltipOptions={{ position: "top" }}
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
                {/* <Tooltip target=".selecttip" position="top" />
              <span
                className="selecttip"
                data-pr-tooltip="Dieses Feld ist ein Pflichtfeld"
              > */}
                <span className="p-float-label">
                  <CascadeSelect
                    value={
                      newproduct.product.categories
                        ? {
                            cname: newproduct.product.categories,
                            code: newproduct.product.categories,
                          }
                        : null
                    }
                    options={countries} //ist object array mit allen unterkategorien
                    // style={{ minWidth: "14rem" }}
                    optionLabel={"cname"}
                    optionGroupLabel={"name"}
                    optionGroupChildren={["states", "cities"]}
                    // placeholder={"Wähle eine Kategorie aus"}
                    //   onChange={(event) => setCategory(event.value)}
                    id="categories"
                    className="block"
                    onChange={(e) => handleChange("categories", e.value.cname)}
                    // className={classNames({
                    //   "p-invalid": isFormFieldValid("category"),
                    // })}
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
              <br />
              {/* Count */}
              <div className="p-field fieldcategory">
                {/* <Tooltip target=".selecttip" position="top" />
              <span
                className="selecttip"
                data-pr-tooltip="Dieses Feld ist ein Pflichtfeld"
              > */}
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
              <div className="p-field fieldcategory">
                <span className="p-float-label">
                  <InputText
                    id="ISBN"
                    name="ISBN"
                    aria-describedby="isbn-help"
                    //   className="p-d-block block"
                    // value={title}
                    //   onChange={(e) => setTitle(e.target.value)}
                    // placeholder="Titel"
                    //   tooltip="Dieses Feld ist ein Pflichtfeld"
                    //   tooltipOptions={{ position: "top" }}
                    value={newproduct.product.ISBN}
                    onChange={(e) => handleChange("ISBN", e)}
                    // className={
                    //   (classNames({
                    //     "p-invalid": isFormFieldValid("isbn"),
                    //   }),
                    //   "p-d-block block")
                    //funktioniert nicht?????
                    // }
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
                    //   tooltip="Dieses Feld ist ein Pflichtfeld"
                    //   tooltipOptions={{ position: "top" }}
                    id="price"
                    value={newproduct.product.price}
                    onChange={(e) => handleChange("price", e.value)}
                    // className={classNames({
                    //   "p-invalid": isFormFieldValid("price"),
                    // })}
                  />
                  {getFormErrorMessage("price")}
                </div>
                <div className="p-field fieldprice">
                  <span className="p-float-label">
                    {/* {console.log(newproduct.product.basis_fornegotioations)}
                    {console.log(newproduct.product.basis_fornegotioations[0])} */}
                    <Dropdown
                      value={
                        // newproduct.product.basis_fornegotioations
                        newproduct.product?.basis_fornegotioations[0] !==
                        undefined
                          ? {
                              name: newproduct.product.basis_fornegotioations,
                            }
                          : null
                      }
                      options={pricing}
                      //   onChange={(e) => setPriceCategory(e.value)}
                      optionLabel="name"
                      // placeholder="Preiskategorie"
                      className="block"
                      // tooltip="Dieses Feld ist ein Pflichtfeld"
                      // tooltipOptions={{ position: "top" }}
                      id="basis_fornegotioations"
                      onChange={(e) =>
                        handleChange("basis_fornegotioations", e.value.name)
                      }
                      // className={classNames({
                      //   "p-invalid": isFormFieldValid("basis_fornegotioations"),
                      // })}
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
                  {getFormErrorMessage("basis_fornegotioations")}
                </div>
              </div>
            </div>
            {/* Beschreibung */}
            <h2>Details</h2>
            <div className="field">
              <div className="p-field fieldeditor">
                {/* <Tooltip target=".editortip" position="top" />
              <span
                className="editortip"
                data-pr-tooltip="Dieses Feld ist ein Pflichtfeld"
              > */}
                <Editor
                  headerTemplate={header}
                  value={newproduct.product.discription}
                  onTextChange={(e) => handleChange("discription", e.htmlValue)}
                  // value={description}
                  // onTextChange={(e) => setDescription(e.htmlValue)}
                  placeholder="Beschreibung*"
                  className="editor"
                  id="discription"
                  // value={formik.values.description}
                  // onTextChange={formik.handleChange}
                  // className={classNames({
                  //   "p-invalid": isFormFieldValid("discription"),
                  // })}
                />
                {/* </span> */}
                {getFormErrorMessage("discription")}
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
                <a href="#top">
                  <Button
                    type="submit"
                    label="Anzeige aufgeben"
                    className="p-button-raised p-button-warning submitbutton"
                  />
                </a>
              </div>
              {/* </div> */}
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewProducts;
