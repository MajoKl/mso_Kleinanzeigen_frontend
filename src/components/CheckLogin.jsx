import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestUser } from "../api/store/userSlice";
import { useNavigate } from "react-router-dom";

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
