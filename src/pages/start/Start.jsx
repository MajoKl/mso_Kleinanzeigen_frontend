import React, { useEffect } from "react";
import "../../main.scss";

import { useDispatch, useSelector } from "react-redux";
import { requestUser } from "../../api/store/userSlice";

import Products from "../../components/products/Products";

function Start() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.user.name === "") {
      dispatch(requestUser("/api/me"));
    }
  }, []); // eslint-disable-line

  return (
    <>
      <div className="container">
        <h1>Willkommen {user.user.name}</h1>
        <h2>Die neusten Anzeigen:</h2>
        <h3>
          Hier ist platz für ein Header, der Dropdowns hat, um Kategorien
          auszuwählen.
        </h3>
        <hr />
        <h4>Hier sind schöne Anzeigen!</h4>
        <Products searchoption="users" otheroptions="" />
      </div>
    </>
  );
}
export default Start;
