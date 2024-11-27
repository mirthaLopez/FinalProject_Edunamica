async function patchStatusApplication(applicationId, student_status_fk) {
    console.log("estoy aqui");
    
    const data = {
      student_status_fk
    };
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/form/${applicationId}/`, {
        method: 'PATCH', // Usamos PATCH para actualizar solo un campo
        headers: {
          'Content-Type': 'application/json', // Especificamos que los datos son JSON
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
  
  export default patchStatusApplication;