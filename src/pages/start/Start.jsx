//React
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Stylesheets
import "../../main.scss";
//Api_&_Store
import { requestUser } from "../../api/store/userSlice";
//Primereact
//Components
import Products from "../../components/products/Products";
import Filterbar from "../../components/Filterbar";

function Start() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [options, setOptions] = useState("");

  useEffect(() => {
    if (user.user.name === "") {
      dispatch(requestUser("/api/me"));
    }
  }, []); // eslint-disable-line

  const pull_data = (data) => {
    setOptions(data);
  }
// const onClick = () => {
//   setOptions("Hallo");
  // }
  return (
    <React.Fragment>
      {user.status.summary !== "success" ? null : (
        <div className="container">
          <h1>Willkommen zurück, {user.user.name}</h1>
          <hr />
          <br />
          <h2>Deine neusten Anzeigen: {options}</h2>
          {/* <button onClick={onClick}>clickk</button> */}
          {/* <h3>
            Hier ist platz für ein Header, der Dropdowns hat, um Kategorien
            auszuwählen.
          </h3> */}
          <Filterbar hallo={pull_data}/>
          <Products searchoption="users/articles" otheroptions={options} user={user} />
        </div>
      )}
    </React.Fragment>
  );
}
export default Start;
