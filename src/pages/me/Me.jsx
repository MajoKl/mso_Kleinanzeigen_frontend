import React, { useEffect } from "react";
// import { useQuery } from "react-query";
// import { Toast } from "primereact/toast";

import { useDispatch, useSelector } from "react-redux";
import { requestUser } from "../../api/store/userSlice";

import Products from "../../components/products/Products";
import ToastMessages from "../../components/ToastMessages";

import Search from "../../pages/search/Search.jsx";

function Me() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.user.name === "") {
      dispatch(requestUser("/api/me"));
    }
  }, []); // eslint-disable-line

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
        <div className="container">
          <h1>Seite von {user.user.name}</h1>

          <div className="card">
            <h2>Meinnne Produkte:</h2>

            {console.log(user)}
            <span>{user.user.name}</span>
            <Products searchoption="me" otheroptions="" />
          </div>
          <Search />
        </div>
      )}
    </React.Fragment>
  );
}

export default Me;
