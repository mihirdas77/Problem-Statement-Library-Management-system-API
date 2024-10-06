// src/components/AuthForm.js
import React, { useState } from 'react';
import { Button, Input, FormLabel } from '@chakra-ui/react';
import axios from 'axios';

const AuthForm = ({ isLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const response = await axios.post(url, { username, password });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormLabel>Username</FormLabel>
      <Input value={username} onChange={(e) => setUsername(e.target.value)} required />
      <FormLabel>Password</FormLabel>
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
    </form>
  );
};

export default AuthForm;
