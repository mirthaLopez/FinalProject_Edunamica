async function DeleteBlog(id) {
    ///////////////////////////// Obtiene el token de acceso desde local storage ///////////////
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No token found");
      throw new Error("Token de acceso no encontrado");
    }
  
    const validationToken = "Bearer " + token;
  
    try {
      const response = await fetch(`http://localhost:8000/api/blogs/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: validationToken,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error al eliminar el blog con id ${id}`);
      }
  
      return { message: `Blog con id ${id} eliminado correctamente` };
    } catch (error) {
      console.error("Error al eliminar el blog:", error.message);
      throw error;
    }
  }
  
  export default DeleteBlog;
  