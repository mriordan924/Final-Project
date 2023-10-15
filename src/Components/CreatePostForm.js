import React, { useState } from 'react';
import API from './API';

function CreatePostForm({ user }) {
  const [content , setContent] = useState('');
  const [photoURL, setPhotoURL] = useState(null);

  const handleCreatePost = () => {
    // function to create a new post using the API
    const postData = {
      content: content,
      image: photoURL,
      username: user.username,
    };

    API.createPost(postData)
      .then((response) => {
        // Handle success
        console.log('Post created successfully', response);
        // Reset form fields
        setContent('');
        setPhotoURL('');
      })
      .catch((error) => {
        // Handle error
        console.error('Error creating post', error);
      });
  };

  // const handleImageUpload = (e) => {
  //   const selectedImage = e.target.files[0]; // Get the selected image file
  //   setImage(selectedImage);
  // };

  return (
    <div className='create-post-form'>
      <h1>Create a New Post</h1>
      {/* Create post form */}
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='content-input'
      />
      <input
        type="text"
        placeholder="Photo URL"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
        className='photo-input'
      />
      <button onClick={handleCreatePost} className='create-post-button'>Create Post</button>
    </div>
  );
}

export default CreatePostForm;
