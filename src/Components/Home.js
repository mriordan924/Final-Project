import React, { useState, useEffect } from 'react';
import Post from './Post';
import API from './API';
import EditPost from './EditPost';
import Logo from './Logo';

function Home() {
  const [posts, setPosts] = useState([]);
  const [editPostData, setEditPostData] = useState(null);

  const onDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const onEditPost = (post) => {
    const postWithContent = {...post, content: post.content}
    setEditPostData(postWithContent);
  };

  useEffect(() => {
    // fetch posts from API
    API.getPosts()
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    // <div>
    // <Logo />
    <div className='home'>
      <Logo />
       {posts.map((post) => (
        <div key={post.id} >
        <Post 
        post={post} 
        onDeletePost={onDeletePost} 
        onEditPost={() => onEditPost(post)} />
        </div>
      ))}
       {editPostData && <EditPost post={editPostData} onClose={() => setEditPostData()} />}
    </div>
    // </div>
  );
}

export default Home;

