import React from "react";
import "./navbar/Topbar.scss";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

//Source: Udemy-Kurs Abschnitt 7, jedoch abgewandelt zu functional-component + Teilweise primeReact + Styling by Marius

function Searchbar(props) {
  const [term, setTerm] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(term);
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Suchen"
          />
        </span>
      </form>
    </div>
  );
}

export default Searchbar;
