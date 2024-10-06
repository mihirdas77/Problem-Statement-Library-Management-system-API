// src/api/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;  // Optional: rethrow error for handling in the component
    }
};

// src/pages/Register.js
import React, { useState } from 'react';
import { registerUser } from '../api/api';

const Register = () => {
    const [data, setData] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await registerUser(data);
            console.log('Registration successful:', result);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
