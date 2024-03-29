//React
import React, { useEffect, useState } from "react";
//Stylesheets
import "./Login.scss";
import "../../main.scss";
//Api_&_Store
import axios from "axios";
//Primereact
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
//Components

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  // eslint-disable-next-line
  const [user, setUser] = useState(null);

  //OAuth, Quelle: Vortrag Julius Hardt und https://auth0.com/blog/complete-guide-to-react-user-authentication/
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get(
      "access_token"
    );

    axios
      .get("http://localhost:8010/proxy/user", {
        headers: {
          Authorization: "token " + token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }, []);

  return (
    <div>
      {!loggedIn ? (
        <React.Fragment>
          <div className="container">
            <h1>Anmelden</h1>
            <Panel header="Hinweis">
              Bitte logge dich ein. Du kannst dich mit der Marienschule-Hompage
              anmelden. Melde dich dort mit deinem ganz normalen Account an.
              Dann wirst du automatisch auf diese Seite zurückgeleitet.
            </Panel>
            <div className="style-logo">
              <img
                src="./data/images/MSOlogo.svg"
                className="logo"
                alt="Logo"
                height="200"
              ></img>
            </div>
            <h3 className="info">Anmelden mit:</h3>
            <div className="buttonn">
              <Button
                className="p-button-outlined p-button-rounded p-button-warning"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = process.env.REACT_APP_GITHUB_URL;
                }}
              >
                <img
                  src="./data/images/MSOlogo.svg"
                  alt=""
                  width="24"
                  height="24"
                />
                <span style={{ marginLeft: "10px" }}>
                  Marienschule Homepage
                </span>
              </Button>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Login;
