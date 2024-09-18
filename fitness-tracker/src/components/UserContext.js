import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/protected', {
                withCredentials: true,
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
