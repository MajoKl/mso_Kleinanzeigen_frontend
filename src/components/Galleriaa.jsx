//React
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
//Stylesheets
import "../pages/product/productDetail/productDetail.scss";
//Api_&_Store
// import axios from "axios";
//Primereact
import { Galleria } from "primereact/galleria";
//Components

//Quelle: https://www.primefaces.org/primereact/galleria/
function Galleriaa({ images, articleID }) {
  // const [imagesss, setImages] = useState(null);
  // const images = useSelector((state) => state.products.products);
  // const images = null; //props.pics;
  console.log(images);

  //   async function getImagesApi() {
  //   const response = await axios.get(
  //   `${process.env.REACT_APP_API_URL}/api/ArticlePhotos/${articleID}/${images.name[2]}`,
  //   { withCredentials: true },
  //   {
  //     headers: {
  //       "Access-Control-Allow-Origin":
  //         "http://kleinanzeigen_api.jonaslbgtt.live:8080",
  //     },
  //   }
  // );
  // return await response.data;
  // }

  // const responsiveOptions = [
  //   {
  //     breakpoint: "1024px",
  //     numVisible: 5,
  //   },
  //   {
  //     breakpoint: "768px",
  //     numVisible: 3,
  //   },
  //   {
  //     breakpoint: "560px",
  //     numVisible: 1,
  //   },
  // ];
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await axios("/data/photos.json");
  //     setImages(response.data.data);
  //   }
  //   fetchData();
  // }, []); // eslint-disable-line

  const itemTemplate = (item) => {
    console.log(item);
    return (
      <img
        src={`${process.env.REACT_APP_API_URL}/api/ArticlePhotos/${articleID}/${item.name}`}
        onError={(e) =>
          (e.target.src = "../../data/images/MSOKleinanzeigenLogoGrey.png")
        }
        alt={item.name}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={`${process.env.REACT_APP_API_URL}/api/ArticlePhotos/${articleID}/${item.name}`}
        onError={(e) =>
          (e.target.src = "../../data/images/MSOKleinanzeigenLogoGrey.png")
        }
        alt={item.name}
        style={{ width: "100%", display: "block" }}
      />
    );
  };
  return (
    <div className="galleria card">
      <Galleria
        value={images}
        // responsiveOptions={responsiveOptions}
        numVisible={5}
        style={{ maxWidth: "440px" }}
        circular
        showItemNavigators
        showItemNavigatorsOnHover
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </div>
  );
}

export default Galleriaa;
