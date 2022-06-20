import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (!adminInfo.token) {
      navigate("/");
    }
  }, [navigate, adminInfo.token]);

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
