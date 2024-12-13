async function PutStudent(id, formData) {

  // Incluir id y admin_auth_user_fk en los datos que se enviarán, en el orden correcto
  const dataPut = {
      id: id, // Primero el id
      student_name: formData.student_name,
      student_first_last_name: formData.student_first_last_name,
      student_second_last_name: formData.student_second_last_name,
      student_birth_date: formData.student_birth_date,
      student_phone_number: formData.student_phone_number,
      student_email: formData.student_email,
      student_id_url: formData.student_id_url,
      identification_number: formData.identification_number || null, // Agregado: identificación (puede ser nulo)
      address: formData.address,
      student_auth_user_fk: formData.student_auth_user_fk,
      identification_fk: formData.identification_fk || null, // Agregado: identificación fk (puede ser nulo)
      genre_fk: formData.genre_fk || null, // Agregado: género (puede ser nulo)
      neighborhood_fk: formData.neighborhood_fk,
  };

  console.log(dataPut); // Verificando los datos antes de enviarlos

  try {
    // Realizar la solicitud PUT al servidor
    const response = await fetch(`http://localhost:8000/api/student/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(dataPut), // Enviar los datos del estudiante
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error('Failed to update student');
    }

    // Parsear la respuesta JSON
    const data = await response.json();
    return data; // Devuelve los datos del servidor después de la actualización
  } catch (error) {
    console.error('Error updating student:', error);
    throw new Error('Error updating student');
  }
}

export default PutStudent;
