import React, { useState, useEffect, useRef } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { ProductService } from "./ProductService";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import "./DataViewDemo.scss";

const Products = () => {
  const [products, setProducts] = useState(null);
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
  const rows = useRef(6);
  const datasource = useRef(null);
  const isMounted = useRef(false);
  const productService = new ProductService();

  useEffect(() => {
    if (isMounted.current) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTimeout(() => {
      isMounted.current = true;
      productService.getProducts().then((data) => {
        datasource.current = data;
        setTotalRecords(data.length);
        setProducts(datasource.current.slice(0, rows.current));
        console.log(products);
        setLoading(false);
      });
    }, 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onPage = (event) => {
    setLoading(true);

    //imitate delay of a backend call
    setTimeout(() => {
      const startIndex = event.first;
      const endIndex = Math.min(event.first + rows.current, totalRecords - 1);
      console.log(startIndex, endIndex);
      const newProducts =
        startIndex === endIndex
          ? datasource.current.slice(startIndex)
          : datasource.current.slice(startIndex, endIndex);
      console.log(startIndex, endIndex, newProducts);
      setFirst(startIndex);
      setProducts(newProducts);
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
    return (
      <div className="p-col-12">
        <div className="product-list-item">
          <img
            src={`data/images/${data.image}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={data.name}
          />
          <div className="product-list-detail">
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.description}</div>
            <Rating value={data.rating} readOnly cancel={false}></Rating>
            <i className="pi pi-tag product-category-icon"></i>
            <span className="product-category">{data.category}</span>
          </div>
          <div className="product-list-action">
            <span className="product-price">${data.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              label="Add to Cart"
              disabled={data.inventoryStatus === "OUTOFSTOCK"}
            ></Button>
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
    return (
      <div className="p-col-12 p-md-4">
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.category}</span>
            </div>
            <span
              className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}
              //funktioniert nicht, weil nicht im Stylesheet mit drin. -> Suchen Seite PrimeReact
            >
              {data.inventoryStatus}
            </span>
          </div>
          <div className="product-grid-item-content">
            <img
              src={`data/images/${data.image}`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
            />
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.description}</div>
            <Rating value={data.rating} readOnly cancel={false}></Rating>
          </div>
          <div className="product-grid-item-bottom">
            <span className="product-price">${data.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              label="Add to Cart"
              disabled={data.inventoryStatus === "OUTOFSTOCK"}
            ></Button>
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
        <DataView
          value={products}
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
      </div>
    </div>
  );
};

export default Products;
