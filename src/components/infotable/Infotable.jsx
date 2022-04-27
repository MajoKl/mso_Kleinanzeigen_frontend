//React
import React from "react";
//Stylesheets
import "./Infotable.scss";
//Api_&_Store
//Primereact
//Components

function Infotable(props) {
  const renderItem = (i) => {
    return i.icon ? (
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
    <div className="ui segments product-infotable">
      {props.data.map((line) => renderItem(line))}
    </div>
  );
}

export default Infotable;
