import { InputText } from "primereact/inputtext";
import { CascadeSelect } from "primereact/cascadeselect";

import React from 'react'
import { useState } from "react";

function Filterbar(props) {
    // props.func('My name is Dean Winchester & this is my brother Sammie');
    const [hallo, setHallo] = useState("");
    props.hallo(hallo);
  
    const onClick = () => {
        console.log("Ka");
    }

  return (
    <>
      <h1>I am the Child Component!</h1>
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
      <InputText
                  id="Name"
                  name="Name"
                  aria-describedby="name-help"
                  value={hallo}
                  onChange={(e) => setHallo(e.value)}
          />
          <button onClick={onClick}>Click me</button>
    </>
  );
}

export default Filterbar