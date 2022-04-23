import React, { useState, useEffect, useRef } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
// import { ProductService } from "./ProductService";
// import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import "./products.scss";

import { useDispatch, useSelector } from "react-redux";
import { requestProducts } from "../../api/store/productSlice";
import ToastMessages from "../../components/ToastMessages";
import { useNavigate } from "react-router-dom";

function Products(props) {
  // const [products, setProducts] = useState(null);
  const [layout, setLayout] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  // eslint-disable-next-line
  const [totalRecords, setTotalRecords] = useState(0);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const sortOptions = [
    { label: "Preis absteigend", value: "!price" },
    { label: "Preis aufsteigend", value: "price" },
  ];
  const [toggleStar, setToggleStar] = useState(false);
  const rows = useRef(22);
  // const datasource = useRef(null);
  const isMounted = useRef(false);
  // const productService = new ProductService();

  const products = useSelector((state) => state.products);
  // console.log("Daddy: " + products.products._id);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      isMounted.current = true;
      dispatch(
        requestProducts(
          "/api/" +
            props.searchoption +
            "/articles?skip=0&limit=" +
            rows.current +
            props.otheroptions
        )
      );
      //Hier state updaten oder so!?!?!?!?

      //datasource.current = data; //Hinfällig!?!?
      //setTotalRecords(data.length); //Hinfällig?

      // setProducts(datasource.current.slice(0, rows.current));
      setLoading(false);
    }, 1000);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isMounted.current) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]); // eslint-disable-line

  // useEffect(() => {
  //   setTimeout(() => {
  //     isMounted.current = true;
  //     productService.getProducts().then((data) => {
  //       datasource.current = data;
  //       setTotalRecords(data.length);
  //       setProducts(datasource.current.slice(0, rows.current));
  //       console.log(products);
  //       setLoading(false);
  //     });
  //   }, 1000);
  // }, []); // eslint-disable-line
  const navigate = useNavigate();
  const onProductClick = (id) => {
    console.log("Huhusdhujdh id:" + id);
    navigate("/productDetails/" + id);
  };

  const onStarClick = () => {
    console.log("Als Stern markiert");
    //Maybe dialog fenster?
    setToggleStar(!toggleStar);
  };

  const onPage = (event) => {
    setLoading(true);

    //Hier setzt der neue Daten wenn man auf die nächste Page klickt. Wie? Ka. Iwie mit dem Slice. Aber kp woher. Iwie umschreiben, sodass es für mich funktioniert.
    setTimeout(() => {
      const startIndex = event.first;
      const endIndex = event.first + rows.current;
      console.log(startIndex, endIndex);
      dispatch(
        requestProducts(
          "/api/" +
            props.searchoption +
            "/articles?skip=" +
            startIndex +
            "&limit=" +
            endIndex +
            props.otheroptions
        )
      );
      setFirst(startIndex);
      //Hier state updaten oder so!?!?!?!?

      console.log("Im TimeOut von onPage: " + products);
      setLoading(false);
    }, 1000);

    //imitate delay of a backend call
    // setTimeout(() => {
    //   const startIndex = event.first;
    //   const endIndex = event.first + rows.current;
    //   console.log(startIndex, endIndex);
    //   const newProducts =
    //     startIndex === endIndex
    //       ? datasource.current.slice(startIndex)
    //       : datasource.current.slice(startIndex, endIndex);
    //   console.log(startIndex, endIndex, newProducts);
    //   setFirst(startIndex);
    //   // setProducts(newProducts);
    //   setLoading(false);
    // }, 1000);
  };

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const renderListItem = (data) => {
    let date = new Date(data.createdAt);
    return (
      <div className="p-col-12">
        <div
          className="product-list-item"
          onClick={() => onProductClick(data._id)}
        >
          {/* <Link to={`productDetails/${data._id}`}> */}
          <img
            src={`data/images/${data.pictures[0]}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={data.Name}
          />
          {/* </Link> */}
          <div className="product-list-detail">
            {/* <Link to={`productDetails/${data._id}`}> */}
            <div>
              <i className="pi pi-clock product-date-icon"></i>
              <span
                className="product-date"
                //className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}
                //funktioniert nicht, weil nicht im Stylesheet mit drin. -> Suchen Seite PrimeReact
              >
                {date.getDate() +
                  "." +
                  (date.getMonth() + 1) +
                  "." +
                  date.getFullYear()}
              </span>
            </div>
            <div className="product-name">{data.Name}</div>
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.categories[0]}</span>
            </div>
            {/* </Link> */}
          </div>
          <div className="product-list-action">
            <span className="product-price">
              {data.price === 0 ? "Zu Verschenken" : data.price + "€"}
              {data.basis_fornegotioations === "Verhandlungsbasis" ? " VB" : ""}
            </span>
            <Button
              icon="pi pi-star"
              //icon={toggleStar === true ? "pi pi-star-fill" : "pi pi-star"}
              className="p-button-rounded p-button-warning"
              onClick={() => onStarClick()}
            />
            <span
              className="product-badge"
              //   className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}
            >
              {data.inventoryStatus}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderGridItem = (data) => {
    let date = new Date(data.createdAt);
    return (
      <div className="p-col-12 p-md-4">
        <div
          className="product-grid-item card"
          onClick={() => onProductClick(data._id)}
        >
          {/* <Link to={`productDetails/${data._id}`}> */}
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.categories[0]}</span>
            </div>

            <div>
              <i className="pi pi-clock product-date-icon"></i>
              <span
                className="product-date"
                //className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}
                //funktioniert nicht, weil nicht im Stylesheet mit drin. -> Suchen Seite PrimeReact
              >
                {date.getDate() +
                  "." +
                  (date.getMonth() + 1) +
                  "." +
                  date.getFullYear()}
              </span>
            </div>
          </div>
          <div className="product-grid-item-content">
            <img
              src={`data/images/${data.pictures[0]}`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.Name}
            />
            <div className="product-name">{data.Name}</div>
            <div className="product-description">{data.detailtName}</div>
            {/* <Rating value={data.rating} readOnly cancel={false}></Rating> */}
          </div>
          {/* </Link> */}
          <div className="product-grid-item-bottom">
            <span className="product-price">
              {data.price === 0 ? "Zu Verschenken" : data.price + "€"}
              {data.basis_fornegotioations === "Verhandlungsbasis" ? " VB" : ""}
            </span>
            <Button
              icon="pi pi-star"
              //icon={toggleStar === true ? "pi pi-star-fill" : "pi pi-star"}
              className="p-button-rounded p-button-warning"
              onClick={onStarClick}
            />
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };

  const renderHeader = () => {
    let onOptionChange = (e) => {
      setLoading(true);
      setLayout(e.value);
    };

    return (
      <div className="p-grid p-nogutter">
        <div className="p-col-6" style={{ textAlign: "left" }}>
          <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="Sortiert nach Preis"
            onChange={onSortChange}
          />
        </div>
        <div className="p-col-6" style={{ textAlign: "right" }}>
          <DataViewLayoutOptions layout={layout} onChange={onOptionChange} />
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="dataview">
      <div className="card">
        {products.products.length === 0 ? (
          <ToastMessages
            severity="error"
            summary="Heavy Error"
            detail="Request respons an empty Array. Please refresh"
            life="0"
            sticky="true"
          />
        ) : (
          <DataView
            value={products.products}
            layout={layout}
            header={header}
            itemTemplate={itemTemplate}
            lazy
            paginator
            paginatorPosition={"both"}
            rows={rows.current}
            totalRecords={totalRecords}
            first={first}
            onPage={onPage}
            loading={loading}
            sortOrder={sortOrder}
            sortField={sortField}
          />
        )}
      </div>
    </div>
  );
}

export default Products;
