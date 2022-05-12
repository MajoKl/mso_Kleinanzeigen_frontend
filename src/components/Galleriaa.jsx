//React
import React, { useState, useEffect } from "react";
//Stylesheets
import "../pages/product/productDetail/productDetail.scss";
//Api_&_Store
import axios from "axios";
//Primereact
import { Galleria } from "primereact/galleria";
//Components

//Quelle: https://www.primefaces.org/primereact/galleria/
function Galleriaa() {
  const [images, setImages] = useState(null);

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];
  useEffect(() => {
    async function fetchData() {
      const response = await axios("/data/photos.json");
      setImages(response.data.data);
    }
    fetchData();
  }, []); // eslint-disable-line

  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc}
        onError={(e) =>
          (e.target.src = "../../data/images/MSOKleinanzeigenLogoGrey.png")
        }
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.thumbnailImageSrc}
        onError={(e) =>
          (e.target.src = "../../data/images/MSOKleinanzeigenLogoGrey.png")
        }
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
      />
    );
  };
  console.log(images);
  return (
    <div className="galleria card">
      {console.log(images)}
      <Galleria
        value={images}
        responsiveOptions={responsiveOptions}
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
