

async function PostCourse(course_image_url, course_name, course_description, course_price, course_schedule, begins, ends, course_duration, course_category_fk) {
 //////////////////////////////////Guarda imagen en Amazon WS//////////////////////////////////////////////////////////////
  let imagenUrl='';    
    if (course_image_url) {
        try {
          const result = await uploadImageToS3(course_image_url);
          imagenUrl = result.Location; // Obtén la URL de la imagen subida
          console.log(imagenUrl); 
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
      
    course_image_url = imagenUrl /// Asigna el valor de la url de la imagen 

    const courseData = {
        course_image_url,
        course_name,
        course_description,
        course_price,
        course_schedule,
        begins,
        ends,
        course_duration,
        course_category_fk
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

export default PostCourse