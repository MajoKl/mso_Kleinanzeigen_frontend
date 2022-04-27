//React
// import React, { useState, useEffect, useRef } from "react";
import React from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
//Stylesheets
//Api_&_Store
// import { requestProducts } from "../../api/store/productSlice";
//Primereact
//Components
import PageBuilding from "../../components/PageBuilding";

function Search() {
  // const { searchentry } = useParams();

  // const products = useSelector((state) => state.products);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     requestProducts(
  //       "/api/" +
  //         props.searchoption +
  //         "/articles?skip=0&limit=" +
  //         rows.current +
  //         props.otheroptions
  //     )
  //   );

  //   console.log("Im useEffekt initinal render: " + JSON.stringify(products));
  // }, []); // eslint-disable-line

  return (
    <div>
      <PageBuilding name="Search" />
    </div>
  );
}

export default Search;
