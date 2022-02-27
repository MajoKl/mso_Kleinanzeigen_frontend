import React from "react";
import { useState } from "react";

//Udemy Abschnitt 12, abgeändert
function Accordion(props) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleTitleClick = (index) => {
    console.log("Itle clicked", index);
    setActiveIndex(index);
  };

  const renderItem = (item, index) => {
    const active = index === activeIndex ? "active" : "";
    return (
      <React.Fragment key={item.title}>
        <div
          onClick={() => handleTitleClick(index)}
          className={`title ${active}`}
        >
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="ui styled accordion">
      {props.items.map((item, index) => renderItem(item, index))}
    </div>
  );
}

export default Accordion;
