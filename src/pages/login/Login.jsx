import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";

import "./Login.scss";
import "../../main.scss";

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
        <>
          {/* <div className="ui container"> */}
          <div className="container">
            {/* <div className="ui segment"> */}
            <h1>Anmelden</h1>
            <Panel header="Hinweis">
              Du kannst dich mit der Marienschule-Hompage anmelden. Melde dich
              dort mit deinem ganz normalen Account an. Dann wirst du
              automatisch auf diese Seite zurückgeleitet.
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
            {/* </div> */}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Login;
