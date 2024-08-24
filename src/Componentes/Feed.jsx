import { useState, useEffect } from 'react';
import { useUser } from '../Contexto/UserContext';
import Swal from 'sweetalert2';
import '../css/Feed.css';
import { ReadAllPosts, LikePost, UnlikePost, CommentOnPost } from '../config/post.js'; 
import { useNavigate } from 'react-router-dom';

const Feed = (selfPosts) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const verifyLogin = () => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Tu sesión ha expirado, por favor inicia sesión nuevamente',
      });
      navigate('/');
    }
  }

  useEffect(() => { 
    verifyLogin();

    const fetchPosts = async () => {
      try {
        let fetchedPosts = selfPosts ? await ReadAllPosts(user.uid) : await ReadAllPosts();
        fetchedPosts = fetchedPosts.map((post) => ({ ...post, liked: false }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error al obtener los posts:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cargar los posts',
        });
      }
    };

    fetchPosts();
  }, [selfPosts, user.uid, navigate]);

  const handleLike = async (id) => {
    verifyLogin();

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

    let post = posts.find((post) => post.id === id);

    if (post.liked) {
      await UnlikePost(id);
    } else {
      await LikePost(id);
    }
  };

  const handleComment = async (id, comment) => {
    verifyLogin();

    let commentObject = { authorId: user.uid, authorName: user.displayName, comment: comment };

    console.log('Comment:', commentObject);

    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, comments: [...post.comments, commentObject] } : post
    );
    setPosts(updatedPosts);
    await CommentOnPost(id, commentObject);
  };

  return (
    <div className="app-container">
      <div className="feed-container">
        {posts.map((post, index) => (
          <div className="card" key={index}>
            <div className="card-image">
              <img src={post.image} alt={`${post.authorName}'s post`} />
              <span className="card-title">{post.authorName}</span>
            </div>
            <div className="card-content">
              <p>{post.content}</p>
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
                  <p key={index}> {comment.authorName} - {comment.comment}</p>
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
