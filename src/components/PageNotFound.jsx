import React, { useEffect, useRef } from "react";
import { Messages } from "primereact/messages";

function PageNotFound() {
  const msgs = useRef(null);

  useEffect(() => {
    msgs.current.show([
      {
        severity: "error",
        summary: "Page Not Fount",
        detail: "Error 404. Please check your path.",
        sticky: true,
      },
    ]);
  });

  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <br />
      <Messages ref={msgs} />
      <h1>Page not Found</h1>
      <h2 style={{ textAlign: "center" }}>404 Error</h2>
    </React.Fragment>
  );
}

export default PageNotFound;
