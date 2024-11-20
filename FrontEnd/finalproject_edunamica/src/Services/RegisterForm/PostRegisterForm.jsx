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
  neighborhood_fk, 
  payment_fk) {
 
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
      neighborhood_fk, 
      payment_fk
  };  
    
    try {
        const response = await fetch('http://localhost:8000/api/form/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
          console.log(response);

            throw new Error('Error al guardar el registro. Token inválido o expirado');
        }

        const newForm = await response.json();
            console.log("Registro guardado:", newForm);
        return newForm;
    
        } catch (error) {
            console.error('Error en la solicitud', error);
            throw error;
    }
}

export default PostRegisterForm