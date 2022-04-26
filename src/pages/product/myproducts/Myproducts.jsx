import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { RootState } from "../../api/store/store";
// import { ProgressSpinner } from "primereact/progressspinner";
import { requestUser } from "../../../api/store/userSlice";
import Products from "../../../components/products/Products";
// import ToastMessages from "../../components/ToastMessages";

function Myproducts() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.user.name === "") {
      dispatch(requestUser("/api/me"));
    }
  }, []); // eslint-disable-line
  return (
    <React.Fragment>
      {/* {products.status.severity !== "" ? (
        <ToastMessages
          severity={products.status.severity}
          summary={products.status.summary}
          detail={products.status.detail}
          life={products.status.life}
        /> */}
      {/* ) : ( */}
      <div className="container">
        <h1>Meine Produkte</h1>
        <Products searchoption="me/articles" otheroptions="" user={user} />
      </div>
      {/* )} */}
    </React.Fragment>
  );
}

export default Myproducts;
