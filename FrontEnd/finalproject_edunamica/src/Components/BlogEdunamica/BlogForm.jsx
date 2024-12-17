import React, { useState, useEffect } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

// Importar servicios
import PostBlog from "../../Services/Blog/PostBlog";
import GetBlogs from "../../Services/Blog/GetBlogs";
import DeleteBlog from "../../Services/Blog/DeleteBlog";

// Importar estilos
import "../../Styles/Blog/BlogForm.css";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null); // Imagen seleccionada
  const [blogs, setBlogs] = useState([]); // Historial de blogs
  const [imagePreview, setImagePreview] = useState(null); // Vista previa de la imagen

  const notyf = new Notyf({ duration: 3000, position: { x: "center", y: "center" } });

  // Obtener blogs al cargar el componente
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await GetBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Error al obtener los blogs:", error.message);
    }
  };

  // Función para manejar la carga de una imagen
  const NewImage = (e) => {
    const file = e.target.files[0];
    setImageUrl(file); // Guardar el archivo
    setImagePreview(URL.createObjectURL(file)); // Crear una URL de vista previa
  };

  // Función para agregar un nuevo blog
  const AddBlog = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      notyf.error("Por favor, selecciona una imagen válida.");
      return;
    }

    try {
      const newBlog = await PostBlog(imageUrl, title, creator, introduction, content);
      notyf.success("Blog agregado exitosamente!");

      // Actualizar la lista de blogs
      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);

      // Limpiar el formulario
      setTitle("");
      setCreator("");
      setIntroduction("");
      setContent("");
      setImageUrl(null);
      setImagePreview(null);
    } catch (error) {
      notyf.error("Error al agregar el blog");
      console.error("Error en el posteo del blog:", error.message);
    }
  };

  // Función para eliminar un blog
  const handleDelete = async (id) => {
    try {
      await DeleteBlog(id);
      notyf.success("Blog eliminado exitosamente!");
      // Actualizar la lista eliminando el blog
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } catch (error) {
      notyf.error("Error al eliminar el blog");
      console.error("Error en la eliminación del blog:", error.message);
    }
  };

  return (
    <div className="main-div-blog">
      <div className="main-div-form-blog">
        <h1 className="title-blog-form">Crear Blog</h1>
        <form onSubmit={AddBlog} className="form-container-blog">
          <div className="form-item-blog">
            <label>Título del Blog</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-blog"
              required
            />
          </div>

          <div className="form-item-blog">
            <label>Creador</label>
            <input
              type="text"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              className="input-blog"
              required
            />
          </div>

          <div className="form-item-blog">
            <label>Introducción</label>
            <textarea
              rows="2"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="input-blog"
              required
            />
          </div>

          <div className="form-item-blog">
            <label>Contenido</label>
            <textarea
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input-blog"
              required
            />
          </div>

          <div className="form-item-blog">
            <label>Agrega la imagen:</label>
            <input
              type="file"
              onChange={NewImage}
              accept="image/*"
              required
              className="blog-image-input"
            />
          </div>

          {imagePreview && (
            <div className="image-preview">
              <h3>Vista previa de la imagen:</h3>
              <img
                src={imagePreview}
                alt="Vista previa"
                style={{
                  width: "100px",
                  height: "auto",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}

          <div className="form-item-blog">
            <button type="submit" className="btn-send-blog">
              Guardar Blog
            </button>
          </div>
        </form>
      </div>

      {/* Historial de blogs */}
      <div className="container-history-blog">
        <h2 className="title-history-blog">Historial de Blogs</h2>
        <div className="grid-blog">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h3>{blog.title}</h3>
              <p>Creador: {blog.creator}</p>
              <p>Introducción: {blog.introduction}</p>
              <img
                src={blog.image_url}
                alt={blog.title}
                className="blog-image"
                style={{ width: "100px", borderRadius: "8px" }}
              />
              <button onClick={() => handleDelete(blog.id)} className="btn-delete-blog">
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogForm;

