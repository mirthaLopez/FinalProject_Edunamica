import AWS from 'aws-sdk';
// Configura AWS S3 npm install aws-sdk
const S3_BUCKET = import.meta.env.VITE_S3_BUCKET; 
const REGION = import.meta.env.VITE_REGION; 
const s3 = new AWS.S3({
  accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
  region: REGION,
});

export const uploadImageToS3 = async (file) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: file.name, 
      Body: file,
      ContentType: file.type,
      // ACL: 'public-read', // Se eliminó esta línea para evitar el error de ACL
    };
  
    return s3.upload(params).promise();
  };

async function PostCourse(course_image_url, course_name, course_description, course_price, course_schedule, begins, ends, course_duration,is_free, obligatory_requirements, course_category_fk, payment_modality_fk) {
 //////////////////////////////////Guarda imagen en Amazon WS//////////////////////////////////////////////////////////////
 console.log(course_image_url);

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
        is_free,
        obligatory_requirements,
        course_category_fk,
        payment_modality_fk,
    };

    

    console.log(courseData);
    
    
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