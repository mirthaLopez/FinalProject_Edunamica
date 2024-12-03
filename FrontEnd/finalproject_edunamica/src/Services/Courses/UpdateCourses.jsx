import AWS from 'aws-sdk';

// Configura AWS S3
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
  };

  return s3.upload(params).promise();
};

async function UpdateCourse(
  courseId, 
  courseImageUrl,  // URL de la imagen actual o nueva
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
) {
  let imagenUrl = courseImageUrl;  // Inicializa con la imagen actual

  // Verificar si la URL de la imagen es un archivo nuevo
  if (courseImageUrl && courseImageUrl instanceof File) {
    try {
      const result = await uploadImageToS3(courseImageUrl);  // Subir la nueva imagen
      imagenUrl = result.Location;  // Obtener la URL de la nueva imagen
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw new Error('Could not upload image to S3');
    }
  }

  const token = localStorage.getItem('access_token');
  if (!token) {
    console.error("No token found");
    return;
  }

  const validation_token = "Bearer " + token;

  /**    const courseData = {
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
 */

  const dataPut = {
    courseImageUrl: imagenUrl,  // Usar la URL de la imagen (nueva o actual)
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

  console.log(dataPut);
  

  try {
    const response = await fetch(`http://localhost:8000/api/courses/${courseId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': validation_token,
      },
      body: JSON.stringify(dataPut),
    });

    const data = await response.json();
    return data;  // Devuelve los datos del servidor
  } catch (error) {
    console.error('Error updating course:', error);
    throw new Error('Error updating course');
  }
}

export default UpdateCourse;