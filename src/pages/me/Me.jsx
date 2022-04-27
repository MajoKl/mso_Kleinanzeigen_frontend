//React
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//Stylesheets
import "./me.scss";
//Api_&_Store
import { requestUser } from "../../api/store/userSlice";
//Primereact
//Components
import Products from "../../components/products/Products";
import ToastMessages from "../../components/ToastMessages";
import Infotable from "../../components/infotable/Infotable";

function Me() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.user.name === "") {
      dispatch(requestUser("/api/me"));
    }
  }, []); // eslint-disable-line

  const setDate = (data) => {
    let date = new Date(data);
    return (
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    );
  };
  const InfotableData = [
    {
      icon: "pi pi-user",
      tag: "Name",
      value: user.user.name,
      // value: product.categories !== undefined ? product.categories[0] : null,
    },
    {
      icon: "graduation cap icon",
      tag: "Klasse",
      value: user.user.grade,
    },
    {
      icon: "chess icon",
      tag: "Rolle",
      value: user.user.role,
    },
    {
      icon: "pi pi-eye-slash",
      tag: "Privat",
      value: user.user.grade === true ? "Ja" : "Nein",
    },
    {
      icon: "pi pi-calendar",
      tag: "Aktiv seit",
      value: setDate(user.user.createdAt),
    },
    {
      icon: "pi pi-id-card",
      tag: "ID",
      value: user.user._id,
    },
    {
      icon: "null",
      tag: "",
      value: "",
    },
    {
      icon: "pi pi-shopping-cart",
      tag: "Artikel online",
      value: String(user.user.blocklist.length),
    },
    {
      icon: "pi pi-star",
      tag: "Favoriten",
      value: String(user.user.favorites.length),
    },
    {
      icon: "smile outline icon",
      tag: "Freunde",
      value: String(user.user.friends.length),
    },
  ];
  // const getData = async () => {
  //   const res = await fetch(
  //     process.env.REACT_APP_API_ME_ARTICLE + "/me/article"
  //   );
  //   return res.json();
  // };
  // eslint-disable-next-line
  // const { data, status } = useQuery("data", getData);
  // const toast = useRef(null);

  // const showSuccess = () => {
  //   toast.current.show({
  //     severity: "success",
  //     summary: "Success Message",
  //     detail: "Message Content",
  //     life: 3000,
  //   });
  // };

  return (
    <React.Fragment>
      {user.status.severity !== "" ? (
        <ToastMessages
          severity={user.status.severity}
          summary={user.status.summary}
          detail={user.status.detail}
          life={user.status.life}
        />
      ) : (
        <div className="container me-container">
          <h1>Seite von {user.user.name}</h1>

          <div className="card me-card">
            <h2>Accountinformationen</h2>
            <Infotable data={InfotableData} />
            {console.log(user)}
          </div>
          <div className="card me-card">
            <h2>Deine mit Stern markierten Artikel</h2>
            <Products searchoption="me/favorites" otheroptions="" user={user} />
          </div>
          <div className="card me-card">
            <h2>Deine erstellten Artikel</h2>
            <Products searchoption="me/articles" otheroptions="" user={user} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Me;
