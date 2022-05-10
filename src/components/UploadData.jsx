//React
import React, { useRef, useState } from "react";
//Stylesheets
import "../pages/product/newProducts/newproducts.scss";
//Primeract
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";

function UploadData() {
  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);
  const [size, setSize] = useState(0);

  // const onUpload = () => {
  //   toast.current.show({
  //     severity: "info",
  //     summary: "Success",
  //     detail: "File Uploaded",
  //   });
  // };

  const onTemplateSelect = (e) => {
    // let bettersize = size.substring(0, size.length - 2);

    let _totalSize = totalSize;
    // console.log("let totalsize: " + _totalSize);
    const no = () => {
      _totalSize += size;
      //   console.log("aftrer: " + _totalSize);
    };
    no(e.files);
    // e.files.forEach((file) => {
    //   _totalSize += file.size;
    // });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;
    // e.files.forEach((file) => {
    //   _totalSize += file.size || 0;
    // });
    setTimeout(() => {
      //api call
    }, 2000);

    setTotalSize(_totalSize);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  // const onBasicUpload = () => {
  //   toast.current.show({
  //     severity: "info",
  //     summary: "Success",
  //     detail: "File Uploaded with Basic Mode",
  //   });
  // };

  // const onBasicUploadAuto = () => {
  //   toast.current.show({
  //     severity: "info",
  //     summary: "Success",
  //     detail: "File Uploaded with Auto Mode",
  //   });
  // };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <ProgressBar
          value={value}
          displayValueTemplate={() => `${formatedValue} / 10 MB`}
          className="styleProgressBar"
          style={{ height: "20px" }}
        ></ProgressBar>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    setSize(props.formatSize);
    return (
      <div className="p-d-flex p-ai-center p-flex-wrap">
        <div className="p-d-flex p-ai-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="p-d-flex p-dir-col p-text-left p-ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="p-px-3 p-py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger p-ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="p-d-flex p-ai-center p-dir-col">
        <i
          className="pi pi-image p-mt-3 p-p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="p-my-5"
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  return (
    <div>
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
      <Tooltip target=".editortip" position="top" />
      <span
        className="uploadtip"
        data-pr-tooltip="Dieses Feld ist ein Pflichtfeld"
      >
        <FileUpload
          ref={fileUploadRef}
          name="upload"
          url="https://primefaces.org/primereact/showcase/upload.php" //hier werden die Fotos hingeschickt
          multiple
          accept="image/*"
          maxFileSize={10000000}
          onUpload={onTemplateUpload}
          onSelect={onTemplateSelect}
          onError={onTemplateClear}
          onClear={onTemplateClear}
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          chooseOptions={chooseOptions}
          uploadOptions={uploadOptions}
          cancelOptions={cancelOptions}
          className="fieldupload"
        />
      </span>
    </div>
  );
}

export default UploadData;
