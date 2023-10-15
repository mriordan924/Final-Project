import React, { useState } from 'react';
import CommentList from './CommentList';

function Comment({ comment, onSave, onLike, onDeleteComment, onEditComment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEditComment(comment.id, editedText);
    onSave(comment.id, editedText);
    setIsEditing(false);
  };

  const handleLike = () => {
    onLike(comment.id);
  };

  const handleDelete = () => {
    onDeleteComment(comment.id);
  };

  return (
    <div className='comment'>
      <div className='comment-content'>
        <div className='comment-text'>
    {isEditing ? (
      <div>
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
        {/* <button onClick={() => onSave(comment.id, editedText)}>Save</button>
      </div> */}
      <button onClick={handleSave}>Save Update</button>
      </div>
    ) : (
      <p>{comment.text}</p>
    )}
    </div>
      <div className='comment-like'>
        <button onClick={handleLike}>Like</button>
        <span>{comment.likes} likes</span>
      </div>
    </div>
     <div className='comment-actions'>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>Edit</button>  
    </div>
  </div>
  );
}

export default Comment;
