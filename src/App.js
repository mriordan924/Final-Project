import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../src/Components/Navbar';
import Home from '../src/Components/Home';
import Profile from '../src/Components/Profile';
import CreatePostForm from '../src/Components/CreatePostForm';
import Login from '../src/Components/Login';
import API from './Components/API';
import RegisterForm from './Components/RegisterForm';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleRegister = (newUser) => {
    setUser(newUser);
  };

  // const onEditComment = (commentId, updatedCommentText) => {
  //   const updatedComments = comments.map((comment) => {
  //     if (comment.id === commentId) {
  //       // Update the comment's text
  //       return {
  //         ...comment,
  //         text: updatedCommentText,
  //       };
  //     }
  //     return comment;
  //   });
  
  //   // Send the updated comments array to the API to persist the changes
  //   API.editComment(post.id, commentId, updatedCommentText)
  //     .then(() => {
  //       // Update the local state with the edited comment
  //       setComments(updatedComments);
  //     })
  //     .catch((error) => {
  //       console.error('Error editing comment', error);
  //     });
  // }; 

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route 
            path="/profile/:userId" 
            render={(props) => (
              user ? (
              <Profile {...props} user={user} onLogout={handleLogout} />
            ) : (
              <Login onLogin={(userData) => setUser(userData)} />
            )
            )}
            />
          <Route path="/register">
            <RegisterForm onRegister={handleRegister} />
          </Route>
        </Switch>
        </div>
    </Router>
  );
}

export default App;
