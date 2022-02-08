import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";

import Products from "../products/Products";

const getData = async () => {
  const res = await fetch(process.env.REACT_APP_API_ME_ARTICLE + "/me/article");
  return res.json();
};

function Me() {
  const { data, status } = useQuery("data", getData);
  console.log(data);

  return (
    <div className="container">
      <h1>Meine Seite!!</h1>
      <div className="card">
        <h2>Meine Produkte:</h2>
        {status}
        {status === "error" && <div>Error fetching data</div>}
        {status === "loading" && <div>Data loading...</div>}
        {status === "success" && <div>Yeah!</div>}
        <Products />
      </div>
    </div>
  );
}

export default Me;
