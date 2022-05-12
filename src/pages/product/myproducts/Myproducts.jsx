//React
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//Stylesheets
//Api_&_Store
import { requestUser } from "../../../api/store/userSlice";
//Primereact
//Components
import Products from "../../../components/products/Products";

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
      <div className="container">
        <h1>Meine Produkte</h1>
        <Products searchoption="me/articles" otheroptions="" user={user} />
      </div>
    </React.Fragment>
  );
}

export default Myproducts;
