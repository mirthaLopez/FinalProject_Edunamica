async function PatchBlogLikes(blogId, likes_count) {
    const data = {
      likes_count, // Actualizamos solo el contador de likes
    };
 
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/blogs/${blogId}/`, {
        method: "PATCH", // Usamos PATCH para actualizar un campo específico
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
  
      // Verificamos si la respuesta es exitosa
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Error al actualizar los likes: ${errorDetails.message || "Error desconocido"}`);
      }
  
      // Retornamos los datos actualizados
      return await response.json();
    } catch (error) {
      console.error("Error al actualizar los likes:", error.message);
      throw error;
    }
  }
  
  export default PatchBlogLikes;
  
  