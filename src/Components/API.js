const API_URL = 'https://65087eeb56db83a34d9c6c4a.mockapi.io/';

// Fetch all posts from the API
async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

// Create a new post
async function createPost(postData) {
  // const formData = new FormData();
  // formData.append('caption', postData.caption);
  // formData.append('image', postData.image);

  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Failed to create a new post');
  }
  return response.json();
}

// Fetch a user's posts by username
async function getUserPosts(username) {
  try {
    const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch user posts');
  }
  const allPosts = await response.json();
  const userPosts = allPosts.filter((post) => post.username === username);

  return userPosts;
} catch (error) {
  throw error;
}
}

// Delete a post by ID
async function deletePost(postId) {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
}

// Edit a post

async function editPost(postId, updatedPostData) {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedPostData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to edit post');
  }
}

// Like a post
async function likePost(postId) {
    const response = await fetch(`${API_URL}/posts/${postId}/like`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to like post');
    }
  }

// Update the like count for a post
async function updateLikeCount(postId, newLikeCount) {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ likes: newLikeCount }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to update like count');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}

  
  // // Like a comment on a post
  // async function likeComment(postId, commentId) {
  //   const requestBody = {
  //     postId,
  //     commentId,
  //   };

  //   const response = await fetch(`${API_URL}/posts/${postId}`, {
  //     method: 'PUT',
  //     body: JSON.stringify (requestBody),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   });
  //   if (!response.ok) {
  //     throw new Error('Failed to like comment');
  //   }
  // }
  
  // Like a comment on a post
async function likeComment(postId, updatedPostData) {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedPostData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to like comment');
  }
}

  // add comment to post
  async function addCommentToPost(postId, newComment) {
    try {
    const response = await fetch(`${API_URL}/posts/${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post data');
    }
      const postData = await response.json ();
      postData.comments.push (newComment);

      const updateResponse = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify (postData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!updateResponse.ok) {
      throw new Error ('Failed to add comment');
    }
   
    return updateResponse.json();
  } catch (error) {
    throw error;
  }
}

// delete a comment from post
async function deleteComment(postId, commentId) {
  // fetch the post data first
  const postResponse = await fetch(`${API_URL}/posts/${postId}`);
  if (!postResponse.ok) {
    throw new Error('Failed to fetch post data');
  }

  // Parse the post data
  const postData = await postResponse.json();

  // find and remove comment by comment ID
  const updatedComments = postData.comments.filter((comment) => comment.id !== commentId);

  // updated post data with removed comment
  const updatedPostData = {
    ...postData,
    comments: updatedComments,
  };

  // PUT request to update the post with the modified comments
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedPostData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete comment');
  }
}

// Edit a comment on a post
async function editComment(postId, commentId, updatedCommentText) {
  // Fetch the post data first
  const postResponse = await fetch(`${API_URL}/posts/${postId}`);
  if (!postResponse.ok) {
    throw new Error('Failed to fetch post data');
  }

  // Parse the post data
  const postData = await postResponse.json();

  // Find the comment to be edited by comment ID
  const updatedComments = postData.comments.map((comment) => {
    if (comment.id === commentId) {
      // Edit the comment's text
      return {
        ...comment,
        text: updatedCommentText,
      };
    }
    return comment;
  });

  // Create updated post data with the edited comment
  const updatedPostData = {
    ...postData,
    comments: updatedComments,
  };

  // Send a PUT request to update the post with the edited comment
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedPostData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to edit comment');
  }
}




// Create a new user
async function createUser(userData) {

  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create new user');
  }
  return response.json();
}

// Fetch user information by username
async function getUser(username) {
  const response = await fetch(`${API_URL}/users?username=${username}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user information');
  }
  const userData = await response.json();
  return userData[0] || {}; // Return the first user found or an empty object if not found
} 

// Edit user profile by username
async function editUserProfile(username, updatedProfileData) {
  const response = await fetch(`${API_URL}/users/${username}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProfileData),
  });
  if (!response.ok) {
    throw new Error('Failed to edit user profile');
  }
  return response.json();
}

// authentication username and pw for "login"

// async function authenticateUser(username, password) {
//   try {
//   const user = await getUserByUsername (username);

//   if (user.password === password) {
//     return user;
//   } else {
//     throw new Error('Login failed: incorrect password');
//   }
  
//   } catch (error) {
//     throw new Error('Login failed: user not found');
//   }
// }
async function authenticateUser(username, password) {
  try {
    // fetch all users
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const users = await response.json();

    const user = users.find((user) => user.username === username && user.password === password);

    if(user) {
      return getUserById(user.id);
      } else {
      throw new Error('Login failed: user not found or incorrect password');
      }
    } catch (error) {
      throw error;
    }
  }

  async function getUserById(userId) {
    try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user information by ID');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
 }


export default {
  getPosts,
  createPost,
  getUserPosts,
  deletePost,
  editPost,
  editUserProfile,
  getUser,
  addCommentToPost,
  deleteComment,
  editComment,
  likePost,
  updateLikeCount,
  likeComment,
  authenticateUser,
  getUserById,
  createUser,
};

