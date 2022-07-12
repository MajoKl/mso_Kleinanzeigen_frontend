import { InputText } from "primereact/inputtext";
import { CascadeSelect } from "primereact/cascadeselect";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios from "axios";
import React from 'react'
import { useState, useEffect } from "react";
//Stylesheets
import "../main.scss";
import "../pages/product/newProducts/newproducts.scss";

function Filterbar(props) {
  const [categories, setCategories] = useState([]);
  const [pricing, setPricing] = useState([]);

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  props.option1(category);
  props.option2(price);
  props.option3(type);

  const types = [
    {
      name: "Ich biete"
    },
    {
      name: "Ich suche"
    },
    {
      name: "Ich tausche"
    }
  ];

  useEffect(() => {
    async function fetchAdditionalData() {
      try {
        const response = await axios("/data/newProductData.json");
        setPricing(response.data.pricing);
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAdditionalData();
  }, []); //eslint-disable-line

  const onReset = () => {
    setCategory("");
    setPrice("");
    setType("");
  }

  return (
    <>
      {/* <div className="card" style={{ marginBottom: "15px" }}> */}
      <div className="filterbarHeader p-grid p-fluid">
        {/* <div className=""> */}
        <div className="p-field fieldprice filterbar">
          <span className="p-float-label">
            <CascadeSelect
              value={
                category !== ""
                  ? { name: category }
                  : null
              }
              options={categories} //ist ein object array mit allen unterkategorien
              optionLabel={"name"}
              optionGroupLabel={"groupName"}
              optionGroupChildren={["opt1", "opt2", "opt3"]}
              id="categories"
              className="block"
              onChange={(e) => setCategory(e.value.name)}
            />
            <label
              htmlFor="categories"
            >
              Kategorie
            </label>
          </span>
        </div>
        <div className="p-field fieldprice filterbar">
          <span className="p-float-label">
            <Dropdown
              value={
                price !== ""
                  ? {
                    name: price
                  }
                  : null
              }
              options={pricing}
              optionLabel="name"
              className="block"
              id="basis_fornegotioations"
              onChange={(e) => {
                setPrice(e.value.name);
              }}
            />
            <label
              htmlFor="basis_fornegotioations"
            >
              Preiskategorie
            </label>
          </span>
        </div>
        <div className="p-field fieldprice filterbar">
          <span className="p-float-label">
            <Dropdown
              value={
                type !== ""
                  ? {
                    name: type
                  }
                  : null
              }
              options={types}
              optionLabel="name"
              className="block"
              id="article_type"
              onChange={(e) => {
                setType(e.value.name);
              }}
            />
            <label
              htmlFor="article_type"
            >
              Anzeigetyp
            </label>
          </span>
        </div>
        <div className="p-field fieldprice filterbar lastchildbutton">
          <Button
            label="Zurücksetzen"
            className="p-button-raised p-button-primary submitbutton"
            onClick={onReset}
          />
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </>
  );
}

export default Filterbar