import React from 'react';

function LikeButton({ onLike, likes }) {
  const handleLike = () => {
    onLike();
  };

  return (
    <div className='like-button-container'>
      <button className='like-button' onClick={handleLike}>Like Post</button>
      <span className='like-count'>{likes} likes</span>
    </div>
  );
}

export default LikeButton;



  