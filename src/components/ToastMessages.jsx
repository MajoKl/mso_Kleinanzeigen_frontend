//React
import React, { useRef, useEffect } from "react";
//Primereact
import { Toast } from "primereact/toast";

//Quelle: https://www.primefaces.org/primereact/toast/
function ToastMessages(props) {
  const toast = useRef(null);

  useEffect(() => {
    showToast(props.severity, props.summary, props.detail, props.life);
  }, [props]);

  const showToast = (severity, summary, detail, life) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 0,
      sticky: true,
    });
  };

  return <Toast ref={toast} />;
}

export default ToastMessages;
