import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

function RequireAuth({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  return children;
}

export default RequireAuth;
