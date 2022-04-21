import React, { useState, useEffect } from "react";
import axios from "axios";

import { Galleria } from "primereact/galleria";
import { Avatar } from "primereact/avatar";

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
  }, []);

  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
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
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={item.alt}
        style={{ display: "block" }}
      />
    );
  };
  console.log(images);
  return (
    <div className="card">
      {console.log(images)}
      <Galleria
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        circular
        style={{ maxWidth: "640px" }}
        showItemNavigators
        showItemNavigatorsOnHover
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </div>
  );
}

export default Galleriaa;
