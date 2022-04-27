//React
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Stylesheets
//Api_&_Store
import { requestUser } from "../api/store/userSlice";
//Primereact
//Components

function CheckLogin() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.user.name === "") {
      dispatch(requestUser("/api/me"));
    }
  }, []); // eslint-disable-line
  useEffect(() => {
    return user.user.role === "unauthorized" ? navigate("/login") : null;
  }, [user.user.role]); // eslint-disable-line

  return null;
}
export default CheckLogin;
