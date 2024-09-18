import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/protected', {
        withCredentials: true,
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
      setErrorMessage(error.response?.data?.message || "Failed to fetch user data.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      {userData && (
        <>
          <h1>{userData.username}</h1>
          <p>{userData.useremail}</p>
          {userData.userimage && (
            <img src={`http://localhost:4000${userData.userimage}`} alt="User" />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
