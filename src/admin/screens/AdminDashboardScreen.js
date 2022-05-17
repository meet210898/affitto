import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { useSelector } from "react-redux";

export function AdminDashboardScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  return <Sidebar />;
}
