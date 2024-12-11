async function PutStudent(id, formData) {
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
        student_name: formData.student_name,
        student_first_last_name:formData.student_first_last_name,
        student_second_last_name: formData.student_second_last_name,
        student_birth_date: formData.student_birth_date,
        student_phone_number: formData.student_phone_number,
        student_email:formData.student_email,
        student_id_url: formData.student_id_url,
        address: formData.address,
        student_auth_user_fk:formData.student_auth_user_fk,
        neighborhood_fk:formData.neighborhood_fk,
    };
  
    console.log(dataPut); // Verificando los datos antes de enviarlos
  
    try {
      // Realizar la solicitud PUT al servidor
      const response = await fetch(`http://localhost:8000/api/student/${id}/`, {
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
  
  export default PutStudent;