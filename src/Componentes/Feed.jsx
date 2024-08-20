import React, { useState } from 'react';
import '../CSS/Feed.css';


const Feed = () => {
  const [posts, setPosts] = useState([
    { id: 1, user: 'Murphy_300', image: 'https://plus.unsplash.com/premium_photo-1707932495000-5748b915e4f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D' , likes: 0, comments: [] },
    { id: 2, user: 'Mcgregor', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D' , likes: 0, comments: [] },
    { id: 3, user: 'Luisito-Comunica', image: 'https://images.unsplash.com/photo-1525199078165-69ce4f553361?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RyZWV0d2VhcnxlbnwwfHwwfHx8MA%3D%3D' , likes: 0, comments: [] },
    { id: 4, user: 'Ronaldo_CR7', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D' , likes: 0, comments: [] },
    { id: 5, user: '_0Shakira', image: 'https://images.unsplash.com/photo-1531722596216-1fb4fbace9b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R5bGV8ZW58MHx8MHx8fDA%3D' , likes: 0, comments: [] }
  ]);
4
  const handleLike = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          }
        : post
    );
    setPosts(updatedPosts);
  };

  const handleComment = (id, comment) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, comments: [...post.comments, comment] } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="app-container">
      <div className="feed-container">
        {posts.map((post) => (
          <div className="card" key={post.id}>
            <div className="card-image">
              <img src={post.image} alt={`${post.user}'s post`} />
              <span className="card-title">{post.user}</span>
            </div>
            <div className="card-content">
              <p>{post.likes} likes</p>
              <a className="feedbtn"
                onClick={() => handleLike(post.id)}
              >
                <i className="material-icons small">
                {post.liked ? 'favorite' : 'favorite_border'}
                </i>
              </a>
              <div>
                {post.comments.map((comment, index) => (
                  <p key={index}> {userData.name}{comment}</p>
                ))}
              </div>
              <div className="input-field">
                <input
                  type="text"
                  id={`comment-${post.id}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleComment(post.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <label htmlFor={`comment-${post.id}`}>Add a comment</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
