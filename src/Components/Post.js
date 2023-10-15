import React, { useState } from 'react';
import API from './API'; // Import API functions
import LikeButton from './LikeButton'; // Import LikeButton component
import Comment from './Comment'; // Import Comment component
import CommentList from './CommentList'; // Import CommentList component
import { v4 as uuidv4} from 'uuid';
import { useEffect } from 'react';
import EditPost from './EditPost';


function Post({ post, onDeletePost, onEditComment, onEditPost }) {
  const [postLikes, setPostLikes] = useState(post.likes || 0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // user who made post
  useEffect(() => {
    API.getUser(post.username)
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data for post', error);
      });
  }, [post.username]);


  // Delete Post
  const handleDelete = () => {
    API.deletePost(post.id)
    .then(() =>{
      onDeletePost(post.id);
    })
    .catch((error) => {
      console.error('Error deleting post', error);
    });
  };

// Edit Post
  const handleEditPost = () => {
    setIsEditing(true);
  };

  const handleSave = (editedPost) => {
    onEditPost(post.id, editedPost);
    setIsEditing(false);
  }; 

  // Edit Comment
  const handleEditComment = (commentId, updatedCommentText) => {
    onEditComment(commentId, updatedCommentText);
  };

  const handlePostLike = () => {
    // const currentLikeCount = postLikes;
    const newLikeCount = postLikes + 1;
    // like functionality for the post
  //   API.likePost(post.id)
  //     .then((updatedPost) => {
  //       setPostLikes(updatedPost.likes + 1);
  //     })
  //     .catch((error) => {
  //       console.error('Error liking post', error);
  //     });
  
    API.updateLikeCount(post.id, newLikeCount)
      .then(() => {
        setPostLikes(newLikeCount);
      })
      .catch((error) => {
        console.error('Error updating like count', error);
    });
  };

  const handleCommentLike = (commentId) => {
    // find comment 
    const updatedComments= comments.map((comment) => {
    if (comment.id === commentId) {
      return {...comment, likes: comment.likes +1};
    }
      return comment;
  });

  const updatedPostData ={
    ...post,
    comments: updatedComments,
  };

  API.likeComment(post.id, updatedPostData)
    .then(() => {
      setComments(updatedComments);
    })
    .catch((error) => {
      console.error('Error liking comment', error);
    });
  };


    // if (!commentToLike) {
    //   console.error('Comment not found');
    //   return;
    // }

    // update comment like count
    // const updatedComments = comments.map ((comment) => {
    //   if (comment.id === commentId) {
    //     return {...comment, likes: comment.likes +1 };
    //   }
    //     return comment;
    // });

    // setComments (updatedComments);

  //   API.likeComment(post.id, commentId)
  //     .then(() => {
  //     })
  //     .catch((error) => {
  //       console.error('Error liking comment', error);
  //     });
  // };
        // Find the comment in the comments array and update its likes
  //       const updatedComments = comments.map((comment) => {
  //         if (comment.id === commentId) {
  //           return { ...comment, likes: comment.likes + 1 };
  //         }
  //         return comment;
  //       });
  //       setComments(updatedComments);
  //     })
  //     .catch((error) => {
  //       console.error('Error liking comment', error);
  //     });
  // };

  const handleAddComment = () => {
    // add new comment to post
    const newComment = {
      id: uuidv4(), 
      // username: faker.internet.userName(),
      text: commentText,
      likes: 0,
    };
  
  const postComments = [...comments];
  postComments.push(newComment);

  setComments(postComments);
  setCommentText('');

    API.addCommentToPost(post.id, newComment)
      .then(() => {
        setComments([...comments, newComment]);
        setCommentText('');
      })
      .catch((error) => {
        console.error('Error adding comment', error);
      });
  };

  const handleDeleteComment = (commentId) => {
    // Delete the comment
    API.deleteComment(post.id, commentId)
      .then(() => {
        // Remove the comment from the state
        const updatedComments = comments.filter((comment) => comment.id !== commentId);
        setComments(updatedComments);
      })
      .catch((error) => {
        console.error('Error deleting comment', error);
      });
  };



  return (
    <div className='post-container'>
      {user && (
      <div className="post-header">
        <div className='user-info'>
        <p className='post-fullname'>{user.fullName}</p>
        <p className='post-username'>{user.username}</p>
        </div>
        <div className='post-actions'>
      <button onClick={handleEditPost}>Edit Post</button>
      <button onClick={handleDelete}>Delete Post</button>
      </div>
     </div>
      )}

      <div className='post-image-container'>
      <img src={post.image} alt={`Post by ${post.content}`} className='post-image' />
      </div>
      <div className='post-content'>
      <p>{post.content}</p>
      </div>
      <LikeButton postId={post.id} onLike={handlePostLike} likes={postLikes} />
      {isEditing ? (
        <EditPost post={post} onSave={handleSave} />
      ) : null} 

      {/* DeletePost postId={post.id} onDelete ={onDeletePost} /> */}
     
      <CommentList 
      comments={comments} 
      onLike={handleCommentLike} 
      onDeleteComment={handleDeleteComment}
      onEditComment={handleEditComment}
       />

      <div className='post-comment-input'>
        <input
          type="text"
          placeholder="Share your feedback..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
}

export default Post;

