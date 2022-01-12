import React from "react";

import Products from "../products/Products";

function Me() {
  return (
    <div className="container">
      <h1>Meine Seite!!</h1>
      <div className="card">
        <h2>Meine Produkte:</h2>
        <Products />
      </div>
    </div>
  );
}

export default Me;
