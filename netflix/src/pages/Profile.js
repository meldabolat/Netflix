import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button, Space } from 'antd';
import { LogoutOutlined, EditOutlined } from '@ant-design/icons'; // Logout and Edit icons
import './Profile.css';



const Profile = () => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Fetch user profile data from db.json file using Axios
    axios.get('http://localhost:5000/user')
      .then((response) => {
        setUser(response.data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false); 
      });
  }, []); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <div>Something went wrong...</div>; 
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
