import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import "./ToastDemo.css";

function ToastMessages() {
  const ToastDemo = () => {
    const toast = useRef(null);

    const showSuccess = () => {
      toast.current.show({
        severity: "success",
        summary: "Success Message",
        detail: "Message Content",
        life: 3000,
      });
    };

    const showMultiple = () => {
      toast.current.show([
        {
          severity: "info",
          summary: "Message 1",
          detail: "Message 1 Content",
          life: 3000,
        },
        {
          severity: "info",
          summary: "Message 2",
          detail: "Message 2 Content",
          life: 3000,
        },
        {
          severity: "info",
          summary: "Message 3",
          detail: "Message 3 Content",
          life: 3000,
        },
      ]);
    };

    const clear = () => {
      toast.current.clear();
    };

    return (
      <div>
        <Toast ref={toast} />

        <div className="card toast-demo">
          <h5>Severities</h5>
          <Button
            label="Success"
            className="p-button-success"
            onClick={showSuccess}
          />
          <Button label="Info" className="p-button-info" onClick={showInfo} />
          <Button
            label="Warn"
            className="p-button-warning"
            onClick={showWarn}
          />
          <Button
            label="Error"
            className="p-button-danger"
            onClick={showError}
          />

          <h5>Positions</h5>
          <Button label="Top Left" className="mr-2" onClick={showTopLeft} />
          <Button
            label="Bottom Left"
            className="p-button-warning"
            onClick={showBottomLeft}
          />
          <Button
            label="Bottom Right"
            className="p-button-success"
            onClick={showBottomRight}
          />

          <h5>Options</h5>
          <Button
            onClick={showMultiple}
            label="Multiple"
            className="p-button-warning"
          />
          <Button onClick={showSticky} label="Sticky" />

          <h5>Clear</h5>
          <Button onClick={clear} label="Clear" />

          <h5>Custom</h5>
          <Button
            type="button"
            onClick={showConfirm}
            label="Confirm"
            className="ui-button-warning"
          />
        </div>
      </div>
    );
  };
}
