import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RequireAuth from "./RequireAuth";
import Login from "./login";
import Dashboard from "./dashboard";
import Signup from "./signup";
import Logout from "./logout";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/logout"
            element={
              <RequireAuth>
                <Logout />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
