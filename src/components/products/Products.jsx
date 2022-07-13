//React
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Stylesheets
import "../../main.scss";
import "./products.scss";
//Api_&_Store
import axios from "axios";
import { deleteFavorites, postFavorites } from "../../api/api";
import { requestProducts } from "../../api/store/productSlice";
import { addFavoriteorRemoveToUser } from "../../api/store/userSlice";
//Primereact
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
//Components
import ToastMessages from "../../components/ToastMessages";

//Quelle: https://www.primefaces.org/primereact/dataview/ stark abgeändert, aber Grundkonzept gleich
function Products(props) {
  const [layout, setLayout] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const sortOptions = [
    { label: "Preis absteigend", value: "!price" },
    { label: "Preis aufsteigend", value: "price" },
  ];
  const requ = useRef("");
  const rows = useRef(21);
  const isMounted = useRef(false);
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user); // eslint-disable-line
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      try {
        if (props.filter) {
          getInfoFilterProduct();
        } else {
          getInfoProduct();
        }
      } catch (error) {
        console.log(error);
      }
      makeRequest(0, rows.current);
      setLoading(false);
    }, 1000);
  }, [props.otheroptions]); // eslint-disable-line

  const getInfoProduct = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/articles/info`,
      { withCredentials: true }
      // {
      //   headers: {
      //     "Access-Control-Allow-Origin":
      //       "http://kleinanzeigen_api.jonaslbgtt.live:8080",
      //   },
      // }
    );
    setTotalRecords(response.data.count);
  };
  const getInfoFilterProduct = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/articles?categories=${props.otheroptions}`,
      { withCredentials: true }
    );
    setTotalRecords(response.data.count);
  };
  const makeRequest = (startIndex, endIndex) => {
    //Filter Request
    requ.current = "/api/" +
      props.searchoption +
      "?skip=" +
      startIndex +
      "&limit=" +
      endIndex;
    if (props.otheroptions !== "") {
      requ.current = requ.current + "&categories=" + props.otheroptions;
    }
    // if (props.)

    try {
      dispatch(
        requestProducts(requ.current)
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isMounted.current) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]); // eslint-disable-line

  const navigate = useNavigate();
  const onProductClick = (id) => {
    navigate("/productDetails/" + id);
  };

  const onStarClick = (id) => {
    const isstar = props.user.user.favorites.includes(id);
    try {
      isstar === true ? deleteFavorites(id) : postFavorites(id);
      dispatch(addFavoriteorRemoveToUser(id));
    } catch (error) { }
  };

  const onPage = (event) => {
    setLoading(true);

    //Setzen der neuen Daten wenn man auf die nächste Page klickt.
    setTimeout(() => {
      const startIndex = event.first;
      const endIndex = event.first + rows.current;
      makeRequest(startIndex, endIndex);
      setFirst(startIndex);
      setLoading(false);
    }, 1000);
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
        <div className="product-list-item">
          <img
            onClick={() => onProductClick(data._id)}
            src={`data/images/${data.pictures[0]}`}
            onError={(e) =>
            (e.target.src =
              "../../../data/images/MSOKleinanzeigenLogoGrey.png")
            }
            alt={data.Name}
          />
          {/* </Link> */}
          <div
            className="product-list-detail"
            onClick={() => onProductClick(data._id)}
          >
            <div>
              <i className="pi pi-clock product-date-icon"></i>
              <span className="product-date">
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
            {data.article_type === "Ich Suche" ? (
              <span
                style={{
                  verticalAlign: "middle",
                  color: "#e24c4c",
                  marginBottom: "10px",
                }}
              >
                Ich suche
              </span>
            ) : data.article_type === "Ich tausche" ? (
              <span
                style={{
                  verticalAlign: "middle",
                  color: "#1E90FF",
                  marginBottom: "10px",
                }}
              >
                Ich tausche
              </span>
            ) : null}
            <span
              onClick={() => onProductClick(data._id)}
              className="product-price"
            >
              <span
                onClick={() => onProductClick(data._id)}
                className="product-price"
              >
                {data.basis_fornegotioations === "Zu Verschenken"
                  ? "Zu Verschenken"
                  : data.article_type === "Ich tausche"
                    ? "Zum tauschen"
                    : data.price !== 0
                      ? data.price + "€"
                      : ""}
                {data.basis_fornegotioations === "Verhandlungsbasis" &&
                  data.price !== 0
                  ? " VB"
                  : ""}
              </span>
            </span>
            <Button
              icon={
                props.user.user.favorites.includes(data._id)
                  ? "pi pi-star-fill"
                  : "pi pi-star"
              }
              className="p-button-rounded p-button-warning"
              onClick={() => onStarClick(data._id)}
            />
            <span className="product-badge">{data.inventoryStatus}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderGridItem = (data) => {
    let date = new Date(data.createdAt);
    return (
      <div className="p-col-12 p-md-4">
        <div className="product-grid-item card">
          <div
            onClick={() => onProductClick(data._id)}
            className="product-grid-item-top"
          >
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.categories[0]}</span>
            </div>

            <div>
              <i className="pi pi-clock product-date-icon"></i>
              <span className="product-date">
                {date.getDate() +
                  "." +
                  (date.getMonth() + 1) +
                  "." +
                  date.getFullYear()}
              </span>
            </div>
          </div>
          <div
            onClick={() => onProductClick(data._id)}
            className="product-grid-item-content"
          >
            <img
              src={`data/images/${data.pictures[0]}`}
              onError={(e) =>
              (e.target.src =
                "../../../data/images/MSOKleinanzeigenLogoGrey.png")
              }
              alt={data.Name}
            />
            <div>
              {data.article_type === "Ich Suche" ? (
                <span style={{ verticalAlign: "middle", color: "#e24c4c" }}>
                  Ich suche
                </span>
              ) : data.article_type === "Ich tausche" ? (
                <span style={{ verticalAlign: "middle", color: "#1E90FF" }}>
                  Ich tausche
                </span>
              ) : null}
            </div>
            <div className="product-name">{data.Name}</div>
            <div className="product-description">{data.detailtName}</div>
          </div>
          {/* </Link> */}
          <div className="product-grid-item-bottom">
            <span
              onClick={() => onProductClick(data._id)}
              className="product-price"
            >
              {data.basis_fornegotioations === "Zu Verschenken"
                ? "Zu Verschenken"
                : data.article_type === "Ich tausche"
                  ? "Zum tauschen"
                  : data.price !== 0
                    ? data.price + "€"
                    : ""}
              {data.basis_fornegotioations === "Verhandlungsbasis" &&
                data.price !== 0
                ? " VB"
                : ""}
            </span>
            <Button
              icon={
                props.user.user.favorites.includes(data._id)
                  ? "pi pi-star-fill"
                  : "pi pi-star"
              }
              className="p-button-rounded p-button-warning"
              onClick={() => onStarClick(data._id)}
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
          ((
            <ToastMessages
              severity="error"
              summary="Heavy Error"
              detail="Request respons an empty Array. Please refresh"
              life="0"
              sticky="true"
            />
          ),
            (<span>Hier sind noch keine Daten vorhanden.</span>))
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
