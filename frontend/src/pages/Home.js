import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box p={4}>
      <Heading>Welcome to the Library Management System</Heading>
      <Text mt={2}>
        Manage your books, authors, and borrowing transactions effectively.
      </Text>
    </Box>
  );
};

export default Home;
