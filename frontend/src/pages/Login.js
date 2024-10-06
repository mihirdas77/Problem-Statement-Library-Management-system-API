import React, { useState } from "react";
import { Box, Button, Input, Heading } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ username, password });
    navigate("/dashboard");
  };

  return (
    <Box p={4}>
      <Heading>Login</Heading>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          mb={2}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={2}
        />
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default Login;
