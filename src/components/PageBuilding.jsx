//React
import React from "react";

function PageBuilding(props) {
  return (
    <React.Fragment>
      <h1>{props.name}</h1>
      <div style={{ textAlign: "center", width: "100%" }}>
        <img
          src="../../data/images/underconstruction.jpg"
          alt="im Aufbau"
          style={{ width: "40%" }}
        />
      </div>

      <br />
      <br />
      <br />
      <h3 style={{ textAlign: "center" }}>Komm doch bald nochmal wieder!</h3>
    </React.Fragment>
  );
}

export default PageBuilding;
