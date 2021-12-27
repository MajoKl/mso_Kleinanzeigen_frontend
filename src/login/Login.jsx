import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";

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
          {/* headline */}
          {/* img */}

          <h1 className="">Anmelden mit</h1>
          <a href="https://github.com/login/oauth/authorize?client_id=e01038b01f2f337f50a8&redirect_uri=http://localhost:3000/oauth/redirect">
            <Button
              label="Marienschule"
              icon=""
              iconPos="left"
              className="p-button-outlined p-button-rounded"
              type="button"
            />
          </a>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Login;
