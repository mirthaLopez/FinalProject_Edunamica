async function PatchAdminPass(id, password) {
    const data = { 
      password: password 
    };

    const token = localStorage.getItem('access_token');    
    if (!token) {
        console.error("No token found");
        return; 
    }
    const validation_token = "Bearer " + token;

    try {
      const response = await fetch(`http://localhost:8000/api/users_admin/${id}/`, {
        method: 'PATCH', // Usamos PATCH para actualizar solo un campo
        headers: {
          'Content-Type': 'application/json', // Especificamos que los datos son JSON
          'Authorization': validation_token,
        },
        body: JSON.stringify(data) // Solo enviamos el campo a actualizar
      });
  
      // Verificamos si la respuesta es exitosa
      if (!response.ok) {
        const errorDetails = await response.json(); // Obtener detalles del error si lo hay
        throw new Error(`Error al actualizar la solicitud: ${errorDetails.message || 'Desconocido'}`);
      }
  
      // Si la respuesta es exitosa, retornamos los datos actualizados
      return await response.json();
    } catch (error) {
      // Capturamos cualquier error y lo mostramos en la consola
      console.error("Error al actualizar la solicitud:", error.message);
      throw error; // Lanza el error para que pueda ser manejado en el componente
    }
  }
  
  export default PatchAdminPass;