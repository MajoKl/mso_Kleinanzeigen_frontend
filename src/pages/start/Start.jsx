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
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    if (user.user.name === "") {
      dispatch(requestUser("/api/me"));
    }
  }, []); // eslint-disable-line

  const pull_option1 = (data) => {
    setOption1(data);
  }
  const pull_option2 = (data) => {
    setOption2(data);
  }
  const pull_option3 = (data) => {
    setOption3(data);
  }
  const pull_filter = (data) => {
    setFilter(data);
  }
  return (
    <React.Fragment>
      {user.status.summary !== "success" ? null : (
        <div className="container">
          <h1>Willkommen zurück, {user.user.name}</h1>
          <hr />
          <br />
          <h2>Deine neusten Anzeigen: {option1 + option2 + option3 + filter}</h2>
          {/* <button onClick={onClick}>clickk</button> */}
          {/* <h3>
            Hier ist platz für ein Header, der Dropdowns hat, um Kategorien
            auszuwählen.
          </h3> */}
          <Filterbar option1={pull_option1} option2={pull_option2} option3={pull_option3} filter={pull_filter} />
          <Products searchoption="users/articles" otheroptions={option1} user={user} filter={filter} />
        </div>
      )}
    </React.Fragment>
  );
}
export default Start;
