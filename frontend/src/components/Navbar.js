import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <Flex bg="teal.500" color="white" p={4}>
      <Box>
        <Link to="/">Home</Link>
      </Box>
      <Box ml="auto">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Button onClick={logout} ml={4}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" ml={4}>
              Register
            </Link>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
