//React
import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Stylesheets
import "../../main.scss";
//Api_&_Store
import { requestUser } from "../../api/store/userSlice";
//Primereact
//Components
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
    <React.Fragment>
      {user.status.summary !== "success" ? null : (
        <div className="container">
          <h1>Willkommen zurück, {user.user.name}</h1>
          <hr />
          <br />
          <h2>Deine neusten Anzeigen:</h2>
          {/* <h3>
            Hier ist platz für ein Header, der Dropdowns hat, um Kategorien
            auszuwählen.
          </h3> */}

          <Products searchoption="users/articles" otheroptions="" user={user} />
        </div>
      )}
    </React.Fragment>
  );
}
export default Start;
