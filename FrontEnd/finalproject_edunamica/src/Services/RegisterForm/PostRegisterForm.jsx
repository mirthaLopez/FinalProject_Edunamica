
async function PostRegisterForm(identification_number, name, first_last_name, second_last_name, birth_date, phone_number, email, address_fk_id, course_fk_id, identification_fk_id, student_status_fk_id, identification_image_url) {
 //////////////////////////////////Guarda imagen en Amazon WS//////////////////////////////////////////////////////////////
  let imagenUrl='';    
    if (identification_image_url) {
        try {
          const result = await uploadImageToS3(identification_image_url);
          imagenUrl = result.Location; // Obtén la URL de la imagen subida
        } catch (error) {
          console.error('Error al subir la imagen a S3:', error);
          throw new Error('No se pudo subir la imagen a S3');
        }
      }


    /////////////////////////////Obtiene el token de acceso desde local storage///////////////
    const token = localStorage.getItem('access_token');    
    if (!token) {
        console.error("No token found");
        return; 
    }
    const validation_token = "Bearer " + token;
      
    identification_image_url = imagenUrl /// Asigna el valor de la url de la imagen 

    const courseData = {
        identification_number,
        name,
        first_last_name,
        second_last_name,
        birth_date,
        phone_number,
        email,
        address_fk_id,
        course_fk_id,
        identification_fk_id,
        student_status_fk_id, 
        identification_image_url
    };
    
    try {
        const response = await fetch('http://localhost:8000/api/courses/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': validation_token,
            },
            body: JSON.stringify(courseData),
        });

        if (!response.ok) {
            throw new Error('Error al guardar el curso. Token inválido o expirado');
        }

        const newCourse = await response.json();
            console.log("Curso guardado:", newCourse);
        return newCourse;
    
        } catch (error) {
            console.error('Error en la solicitud', error);
            throw error;
    }
}

export default PostRegisterForm