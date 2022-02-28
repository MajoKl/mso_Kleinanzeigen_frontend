import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

//Udemy Abschnitt 12, sehr abgeändert + PrimeReact Accordion
//Aus Udemy Kurs fast wieder alles weg, mit PrimeReact war es leichter als mit Semantic UI, was Grider genutzt hat
function Accordionn(props) {
  const renderItem = (item) => {
    return (
      <AccordionTab header={item.title} key={item.title}>
        <p>{item.content}</p>
      </AccordionTab>
    );
  };

  return (
    <div className="card">
      <Accordion>{props.items.map((item) => renderItem(item))}</Accordion>
    </div>
  );
}

export default Accordionn;
