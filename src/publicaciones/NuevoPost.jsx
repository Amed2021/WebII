import { useState } from 'react';
import { useUser } from '../Contexto/UserContext'; 
import '../css/NuevoPost.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { UploadPost, UploadStory } from '../config/post.js';

const NuevoPost = () => {
  const { user, setUser }= useUser();
  const navigate = useNavigate();

  const [postContent, setPostContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [postType, setPostType] = useState('post');

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleFileChange = (e) => {
    getBase64(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes iniciar sesión para publicar',
      });

      navigate('/');
    }

    let isPost = postType === 'post';

    if ((isPost && !postContent) || (!isPost && !selectedFile)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos',
      });
      return;
    }

    if (isPost) {
      let newPost = {
        authorId: user.uid,
        authorName: user.displayName,
        content: postContent,
        image: selectedFile,
        likes: 0,
        comments: [],
      };

      UploadPost(newPost);

    } else {
      let newStory = {
        authorId: user.uid,
        authorName: user.displayName,
        image: selectedFile,
        uploadDate: new Date(),
      };

      UploadStory(newStory);
    }

    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Publicación creada exitosamente',
    });
    navigate('/home');
  };

  const getBase64 = (file) => {
    var reader = new FileReader();

    reader.onload = function () {
      setSelectedFile(reader.result);
    }

    reader.readAsDataURL(file);
  }

  return (
    <div className="container">
      <h2>{postType === 'post' ? 'Crea un Nuevo Post' : 'Crea una Nueva Historia'}</h2>
      <div className="tab-bar">
        <button
          className={postType === 'post' ? 'tab active' : 'tab'}
          onClick={() => setPostType('post')}
        >
          Post
        </button>
        <button
          className={postType === 'story' ? 'tab active' : 'tab'}
          onClick={() => setPostType('story')}
        >
          Story
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form">
        { postType === 'post' ? ( <textarea
          value={postContent}
          onChange={handleContentChange}
          placeholder="¿Qué estás pensando?"
          className="textarea"
        /> ) : null }
        { selectedFile ? (
          <img
            src={selectedFile}
            alt="Post preview"
            className="preview"
          />
        ) : null }
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button type="submit" className="button">Post</button>
      </form>
    </div>
  );
};

export default NuevoPost;
