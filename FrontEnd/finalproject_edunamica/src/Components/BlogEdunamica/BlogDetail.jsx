import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetBlogs from "../../Services/Blog/GetBlogs";
import "../../Styles/Blog/BlogDetail.css";
import { ThumbUp } from "@mui/icons-material";
import { Button } from "@mui/material";

const BlogDetails = () => {
  const { id } = useParams(); // Extraer el ID de la URL
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await GetBlogs();
        const selectedBlog = data.find((b) => b.id === parseInt(id));
        setBlog(selectedBlog);
        setLikes(selectedBlog?.likes_count || 0);
      } catch (error) {
        console.error("Error al obtener el blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleLike = () => setLikes((prevLikes) => prevLikes + 1);

  if (!blog) return <div className="blog-detail-loading">Cargando...</div>;

  return (
    <>
      {/* Contenedor Principal */}
      <div className="blog-detail-main-container">
        {/* Lado Izquierdo - Título y Autor */}
        <div className="blog-detail-text">
          <h1 className="blog-detail-main-title">{blog.title}</h1>
          <p className="blog-detail-author">Por: {blog.creator}</p>
        </div>

        {/* Lado Derecho - Imagen */}
        <div className="blog-detail-image-container">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="blog-detail-image"
          />
        </div>
      </div>

      {/* Sección Secundaria */}
      <div className="blog-detail-secondary">
        <h2 className="blog-detail-secondary-title">{blog.title}</h2>
        <p className="blog-detail-introduction">{blog.introduction}</p>
        <div className="blog-detail-content">{blog.content}</div>

        {/* Likes */}
        <div className="blog-detail-likes">
          <Button
            variant="contained"
            color="primary"
            startIcon={<ThumbUp />}
            onClick={handleLike}
          >
            Like
          </Button>
          <span className="blog-detail-likes-count">{likes} Likes</span>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;


