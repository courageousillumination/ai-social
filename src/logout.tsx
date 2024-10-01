import { Box, Heading, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      navigate("/login");
    };
    logout();
  }, [navigate]);

  return (
    <Box textAlign="center" p={5}>
      <Heading>Logging out...</Heading>
      <Button onClick={() => navigate("/login")}>Go to Login</Button>
    </Box>
  );
}

export default Logout;
