import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useQuery } from "react-query";
import { Toast } from "primereact/toast";

import Products from "../products/Products";

function Me() {
  const getData = async () => {
    const res = await fetch(
      process.env.REACT_APP_API_ME_ARTICLE + "/me/article"
    );
    return res.json();
  };

  const { data, status } = useQuery("data", getData);
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Message Content",
      life: 3000,
    });
  };

  return (
    <div className="container">
      <h1>Meine Seite!!</h1>
      <button onClick={showSuccess}>hufiqw</button>

      <div className="card">
        <h2>Meine Produkte:</h2>
        {status}
        {/* {status === "error" && <div>Error fetching data</div>} */}
        {/* next line erzeugt ein Error, weil der die ShowSuccess beim ersten mal
        rendern aufruft. Das ist scheiße, weil der dann das Toast vor dem rest
        rendern möchste. Das geht nicht. */}
        {status === "loading" ? (
          <div>huief</div> && showSuccess()
        ) : (
          <div>qwert</div>
        )}
        {/* {status === "loadinggg" ? (
          <div>Ne alter</div>
        ) : (
          () => {
            // console.log(">Yeeeee");
            //showSuccess();
            // return <div>he</div>;
          }
        )} */}
        {/* {status === "loading" && <div>Data loading...</div>} */}
        {status === "success" && <div>Yeah!</div>}
        <Products />
        <Toast ref={toast} />
      </div>
    </div>
  );
}

export default Me;
