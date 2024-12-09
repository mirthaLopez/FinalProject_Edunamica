async function PutAdministrator(id, formData) {
    // Obtener el token de autenticación desde localStorage
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("No token found");
      return;
    }
  
    // Preparar el token de autenticación en el formato adecuado
    const validation_token = "Bearer " + token;
  
    // Incluir id y admin_auth_user_fk en los datos que se enviarán
    const dataPut = {
      id: formData.id, // Incluyendo el ID del administrador
      admin_name: formData.admin_name,
      admin_first_last_name: formData.admin_first_last_name,
      admin_second_last_name: formData.admin_second_last_name,
      admin_email: formData.admin_email,
      admin_phone_number: formData.admin_phone_number,
      admin_auth_user_fk: formData.admin_auth_user_fk, // Incluyendo el FK del usuario de autenticación
    };
  
    console.log(dataPut); // Verificando los datos antes de enviarlos
  
    try {
      // Realizar la solicitud PUT al servidor
      const response = await fetch(`http://localhost:8000/api/administrator/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': validation_token, // Usar el token de autenticación
        },
        body: JSON.stringify(dataPut), // Enviar los datos del administrador
      });
  
      // Verificar si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('Failed to update administrator');
      }
  
      // Parsear la respuesta JSON
      const data = await response.json();
      return data; // Devuelve los datos del servidor después de la actualización
    } catch (error) {
      console.error('Error updating administrator:', error);
      throw new Error('Error updating administrator');
    }
  }
  
  export default PutAdministrator;
  