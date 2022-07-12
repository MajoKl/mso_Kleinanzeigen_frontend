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
  // props.func('My name is Dean Winchester & this is my brother Sammie');
  const [hallo, setHallo] = useState("");
  const [pricing, setPricing] = useState([]);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  props.hallo(hallo);

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
  }

  return (
    <>
      <h1>I am the Child Component!</h1>
      <div className="p-grid p-fluid">
        <div className="p-field fieldprice">
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
              Kategorie*
            </label>
          </span>
        </div>
        <div className="p-field fieldprice">
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
              Preiskategorie*
            </label>
          </span>
        </div>
        <div className="p-field fieldbutton">
          <Button
            label="Zurücksetzen"
            className="p-button-raised p-button-warning submitbutton"
            onClick={onReset}
          />
        </div>
      </div>
    </>
  );
}

export default Filterbar