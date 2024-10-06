import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import BorrowingHistory from "../components/BorrowingHistory";
import BookList from "../components/BookList";

const Dashboard = () => {
  return (
    <Box p={4}>
      <Heading>Dashboard</Heading>
      <BookList />
      <BorrowingHistory />
    </Box>
  );
};

export default Dashboard;
