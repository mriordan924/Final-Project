import React from 'react';
import Comment from './Comment';
import API from './API';

function CommentList({ comments, onLike, onDeleteComment, onEditComment }) {
  const handleEditComment = async (commentId, updatedCommentText) => {
    try {
      // API call
      await API.editComment(commentId, updatedCommentText);
      // update state
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, text: updatedCommentText };
        }
        return comment;
      });
      // update edited comments state
      onEditComment(updatedComments);
    } catch (error) {
      console.error('Failed to edit comment', error);
    }
  };

  return (
    <div className='comment-list'>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key ={comment.id}>
        <Comment
        //  key={comment.id} 
         comment={comment} 
         onLike={onLike}
         onDeleteComment={onDeleteComment} 
         onSave={(editedText) => handleEditComment(comment.id, editedText)}
         />
         </div>
      ))}
    </div>
  );
}

export default CommentList;
