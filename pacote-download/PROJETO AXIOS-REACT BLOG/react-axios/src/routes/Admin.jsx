//import blogFetch from "../axios/config"

//import { useState } from "react";

//import { useEffect } from "react";

//import { Link } from "react-router-dom";

//import "./Admin.css";

//const admin = () => {
//  const [posts, setPosts] = useState([])

//  const getPosts = async() => {

//    try {
//      const response = await blogFetch.get("/posts");

//      const data = response.data;

 //     setPosts(data);
//    } catch (error) {
//      console.log(error);
//    }
//  };

//  const deletePost = async(id) => {
    
//    await blogFetch.delete(`/post/${id}`)

//    const filteredPosts = posts.filter((post) => post.id !== id);

//    setPosts(filteredPosts);
//  };

//  useEffect(() => {
//    getPosts()
//  }, []);

//  return (
//    <div className="admin">
//      <h1>Gerenciar Posts</h1>
//      {posts.length === 0 ? (
//        <p>Carregando...</p>
//     ) : (
//        posts.map((post) => (
//          <div className="post" key={post.id}>
//            <h2>{post.title}</h2>
//            <div className="actions">
//              <Link className="btn edit-btn" to={`/posts/edit/${post.id}`}>Editar</Link>
//              <button className="btn delete-btn" onClick={() => deletePost(post.id)}>Excluir</button>  
//            </div>
//          </div>
//        ))
 //     )}
 //   </div>
//  );
//};

//export default admin;

import { useState, useEffect } from "react";
import blogFetch from "../axios/config";
import { Link } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  //let isMounted = true;
  
  const deletePost = async (id) => {
  
  // Atualização otimista
    const updatedPosts = posts.filter((post) => post.id !== id);
    
    console.log(updatedPosts);
   

    setPosts(updatedPosts);

    //try {
    //  await blogFetch.delete(`/post/${id}`);
    //} catch (error) {
    //  setError("Falha ao excluir o post");
    //  console.log(error);
    //  setPosts(posts); // Restaurar posts se a exclusão falhar
    //}
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await blogFetch.get("/posts");
        
          setPosts(response.data);
        
      } catch (error) {
        setError("Falha ao carregar os posts");
        console.log(error);
      }
    };
    getPosts()
   
  }, []);

  return (
    <div className="admin">
      <h1>Gerenciar Posts</h1>
      {error && <p>{error}</p>}
      {posts.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <div className="actions">
              <Link className="btn edit-btn" to={`/posts/edit/${post.id}`}>
                Editar
              </Link>
              <button
                className="btn delete-btn"
                onClick={() => deletePost(post.id)}
              >Excluir
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
