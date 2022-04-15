import React, { useRef, useEffect } from "react";
import { Toast } from "primereact/toast";

function ToastMessages(props) {
  const toast = useRef(null);

  useEffect(() => {
    showToast(props.severity, props.summary, props.detail, props.life);
  }, []);

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
