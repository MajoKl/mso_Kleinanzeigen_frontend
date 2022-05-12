//React
import React, { useEffect, useRef } from "react";
//Stylesheets
import "../main.scss";
//Api_&_Store
//Primereact
import { Messages } from "primereact/messages";
//Components

function PageNotFound() {
  //Quelle: https://www.primefaces.org/primereact/messages/
  const msgs = useRef(null);

  useEffect(() => {
    msgs.current.show([
      {
        severity: "error",
        summary: "Page Not Fount",
        detail: "Error 404. Please check your path.",
        sticky: true,
      },
    ]);
  });

  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <br />
      <Messages ref={msgs} />
      <div className="e404">
        <div>
          <img src="../../data/images/shockedcat.jpeg" alt="ups gefunden!" />
        </div>
        <div>
          <h1>Ups... gefunden!</h1>
          <h2 style={{ textAlign: "center" }}>
            Diese Seite scheint es nicht zu geben.
          </h2>
          <h4 style={{ textAlign: "center" }}>
            Aber schön, dass Du vorbeigeschaut hast. :)
          </h4>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PageNotFound;
