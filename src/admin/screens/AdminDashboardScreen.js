import Topbar from "../components/topbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AdminDashboardScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);
  return <Topbar drawerName="Dashboard" />;
}
