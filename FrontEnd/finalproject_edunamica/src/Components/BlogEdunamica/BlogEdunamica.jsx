import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetBlogs from "../../Services/Blog/GetBlogs"; // Servicio para obtener blogs
import PatchLikes from "../../Services/Blog/PatchLikes"; // Servicio para actualizar likes
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { ThumbUp, Share, Close as CloseIcon } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import "../../Styles/Blog/BlogEdunamica.css";

function BlogEdunamica() {
  const [blogs, setBlogs] = useState([]); // Estado para los blogs
  const [likes, setLikes] = useState({}); // Estado para los likes de cada blog
  const [openModal, setOpenModal] = useState(false); // Estado para el control del modal
  const [selectedBlog, setSelectedBlog] = useState(null); // Blog seleccionado para compartir

  const navigate = useNavigate(); // Hook para navegación

  // Obtener blogs de la base de datos
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await GetBlogs();
        setBlogs(data);

        // Inicializa el estado de likes con los valores actuales de la base de datos
        const initialLikes = {};
        data.forEach((blog) => (initialLikes[blog.id] = blog.likes_count || 0));
        setLikes(initialLikes);
      } catch (error) {
        console.error("Error al obtener los blogs:", error.message);
      }
    };
    fetchBlogs();
  }, []);

  // Función para manejar los likes y actualizar en el backend
  const handleLike = async (id) => {
    const currentLikes = likes[id] || 0;
    const updatedLikes = currentLikes + 1;

    setLikes((prevLikes) => ({ ...prevLikes, [id]: updatedLikes }));

    try {
      await PatchLikes(id, updatedLikes);
    } catch (error) {
      console.warn("Error al actualizar los likes en el servidor:", error.message);
      setLikes((prevLikes) => ({ ...prevLikes, [id]: currentLikes }));
    }
  };

  // Función para abrir el modal
  const handleShareClick = (blog) => {
    setSelectedBlog(blog);
    setOpenModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBlog(null);
  };

  return (
    <div className="blog-container">
      {blogs.map((blog) => (
        <Card
          key={blog.id}
          className="blog-card"
          onClick={() => navigate(`/VerBlog/${blog.id}`)} // Redirige pasando el ID
          style={{ cursor: "pointer" }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom className="blog-title">
              {blog.title}
            </Typography>
          </CardContent>

          <CardContent className="blog-creator">
            <Typography variant="subtitle1" color="text.secondary">
              Creado por: {blog.creator}
            </Typography>
          </CardContent>

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {blog.introduction}
            </Typography>
          </CardContent>

          <CardMedia
            component="img"
            height="140"
            image={blog.image_url || "https://via.placeholder.com/345x140"}
            alt={blog.title}
          />

          <CardActions className="blog-actions">
            <Button
              size="small"
              startIcon={<ThumbUp />}
              onClick={(e) => {
                e.stopPropagation(); // Evita que el click redirija
                handleLike(blog.id);
              }}
              aria-label={`Like blog ${blog.title}`}
            >
              Like
            </Button>
            <Typography variant="body2">{likes[blog.id]} Likes</Typography>
            <Button
              size="small"
              startIcon={<Share />}
              onClick={(e) => {
                e.stopPropagation(); // Evita que el click redirija
                handleShareClick(blog);
              }}
              aria-label={`Share blog ${blog.title}`}
            >
              Share
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* Modal para compartir */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="share-blog-modal"
        aria-describedby="modal-to-share-blog-on-social-media"
      >
        <Box className="share-modal">
          <IconButton onClick={handleCloseModal} className="close-modal-button">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Compartir "{selectedBlog?.title}"
          </Typography>

          <div className="whatsapp-button" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(selectedBlog?.title)}`)}>
            <WhatsAppIcon /> Compartir en WhatsApp
          </div>
          <div className="facebook-button" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(selectedBlog?.image_url)}`)}>
            <FacebookIcon /> Compartir en Facebook
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default BlogEdunamica;
