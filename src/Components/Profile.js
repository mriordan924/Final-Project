import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from './API';
import Post from './Post';
import CreatePostForm from './CreatePostForm';
 
function Profile({ user, onLogout }) {
  const [userPosts, setUserPosts] = useState([]);
  const { username } = useParams();

  useEffect(() =>{
    if (user) {
      API.getUserPosts(user.username)
        .then((posts) => setUserPosts(posts))
        .catch ((error) => console.error('Error fetching user posts', error));
    }
  }, [user]);

  const handleLogout = () => {
    onLogout ();
  };

  return (
    <div className="profile">
      {user && (
        <>
        <div className='profile-content'>
        <div className="profile-avatar-container">
          <img className="profile-avatar" src={user.avatar} alt={`Profile of ${user.username}`} />
        </div>
        <div className="profile-info">
          <h1 className="profile-username">Welcome, {user.username}!</h1>
          <p className="profile-name">{user.fullName}</p>
          <p className="profile-bio">{user.bio}</p>
          <p className="profile-location">Location: {user.location}</p>
          <button className="profile-logout" onClick={handleLogout}>Log Out</button>
          {/* new post form */}
         <CreatePostForm user={user} />
        </div>
        </div>
        </>
      )}
      
  
      <div className='profile-posts'>
        <h2>Your Posts</h2>
        {userPosts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDeletePost={() => { }}
          />
        ))}
      </div>
    </div>
  ); 
        } 

export default Profile