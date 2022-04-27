//React
// import React, { useEffect } from "react";
//Api_&Store
// import axios from "axios";
//Components
import PageBuilding from "../components/PageBuilding";

// var axios = require("axios");

function Contact() {
  // var config = {
  //   method: "get",
  //   url: "https://mso-kleinanzeigen.herokuapp.com/api/me/articles?skip=0&limit=5",
  //   headers: {
  //     Cookie:
  //       "auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjIyMTA2NjZlMzU2MGYxZmRmN2RhYzciLCJpYXQiOjE2NDY2NTYyMjd9.-MtB8esTdCZRgEXpRacWnfg-c2iUnetU2ZkBTzueMdQ",
  //   },
  // };

  // useEffect(() => {
  //   axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div>
      <PageBuilding name="Contact" />
    </div>
  );
}

export default Contact;
