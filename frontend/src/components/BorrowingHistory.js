import React, { useEffect, useState } from "react";
import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BorrowingHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await axios.get(`/api/borrowings/${user._id}`);
      setHistory(response.data);
    };

    fetchHistory();
  }, [user]);

  return (
    <Box mt={4}>
      <Heading as="h2" size="md">Borrowing History</Heading>
      <List>
        {history.map((record) => (
          <ListItem key={record._id}>
            {record.bookTitle} - Borrowed on {new Date(record.borrowedAt).toLocaleDateString()}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BorrowingHistory;
