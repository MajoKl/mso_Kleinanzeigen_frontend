import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { RootState } from "../../api/store/store";
// import { ProgressSpinner } from "primereact/progressspinner";

import Products from "../../components/products/Products";
import { requestProducts } from "../../api/store/productSlice";
import ToastMessages from "../../components/ToastMessages";

function Myproducts() {
  //Holt State aus dem Redux-Store!! Magicccc!!!
  const products = useSelector((state) => state.products);
  // console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestProducts());

    //Ka was die nächsten 2 Zeilen machen
    // const intervalId = setInterval(() => dispatch(requestProducts()), 3000);
    // return () => clearInterval(intervalId);
  });

  return (
    <React.Fragment>
      {products.status.severity !== "" ? (
        <ToastMessages
          severity={products.status.severity}
          summary={products.status.summary}
          detail={products.status.detail}
          life={products.status.life}
        />
      ) : (
        <div className="container">
          <h1>Meine Produkte</h1>
          <Products />
        </div>
      )}
    </React.Fragment>
  );
}

export default Myproducts;
