import React, { useState } from 'react';
import API from './API';


function EditPost({ post, onClose }) {
  const [editedPost, setEditedPost] = useState(post);

  const handleSave = () => {
    API.editPost(post.id, editedPost)
      .then((response) => {
        // Handle success
        console.log('Post updated successfully', response);
        setEditedPost(editedPost);
        onClose();
      })
      .catch((error) => {
        // Handle error
        console.error('Error updating post', error);
      });
  };

  return (
    <div className='edit-post-form'>
      <h2>Edit Post</h2>
      <input
        type="text"
        value={editedPost.content}
        onChange={(e) => setEditedPost({...editedPost, content: e.target.value})} 
        />
      <button onClick={handleSave}>Update</button>
    </div>
  );
 }
export default EditPost;
