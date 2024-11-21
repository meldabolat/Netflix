import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button, Card, Row, Col, Space } from 'antd';
import { LogoutOutlined, EditOutlined } from '@ant-design/icons'; // Logout and Edit icons
import './Profile.css';

const { Meta } = Card;

const Profile = () => {
  const [user, setUser] = useState(null); // User state to store data from API
  const [loading, setLoading] = useState(true); // Loading state to manage loading status

  useEffect(() => {
    // Fetch user profile data from db.json file using Axios
    axios.get('http://localhost:5000/user')
      .then((response) => {
        setUser(response.data); // Set the fetched data to the state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []); // Empty dependency array ensures the request is made only once when component is mounted

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  if (!user) {
    return <div>Something went wrong...</div>; // Error message if no user data is returned
  }

  return (
    <div className="profile">
      <div className="profile__header" style={{ backgroundColor: "#141414", color: "white", padding: "40px 20px" }}>
        <div className="profile__avatar">
          <Avatar size={120} src={user.profilePicture} />
        </div>
        <div className="profile__info">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <Space size="large">
            <Button type="primary" icon={<EditOutlined />} size="large">
              Edit Profile
            </Button>
            <Button type="default" icon={<LogoutOutlined />} size="large">
              Logout
            </Button>
          </Space>
        </div>
      </div>

    </div>
  );
};

export default Profile;
