
async function PostRegisterForm(identification_number,
  name,
  first_last_name,
  second_last_name,
  birth_date,
  phone_number,
  email,
  identification_image_url, 
  address, 
  identification_fk,
  genre_fk,
  course_fk,
  student_status_fk, 
  neighborhood_fk) {
 console.log( identification_image_url);
 
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
   
    const formData = {
      identification_number,
      name,
      first_last_name,
      second_last_name,
      birth_date,
      phone_number,
      email,
      identification_image_url, 
      address, 
      identification_fk,
      genre_fk,
      course_fk,
      student_status_fk, 
      neighborhood_fk
  };  
    
    try {
        const response = await fetch('http://localhost:8000/api/form/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': validation_token,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
          console.log(response);

            throw new Error('Error al guardar el curso. Token inválido o expirado');
        }

        const newForm = await response.json();
            console.log("Curso guardado:", newForm);
        return newForm;
    
        } catch (error) {
            console.error('Error en la solicitud', error);
            throw error;
    }
}

export default PostRegisterForm