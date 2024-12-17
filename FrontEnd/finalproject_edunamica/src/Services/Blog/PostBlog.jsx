import AWS from 'aws-sdk';

// Configuración de AWS S3
const S3_BUCKET = import.meta.env.VITE_S3_BUCKET;
const REGION = import.meta.env.VITE_REGION;

const s3 = new AWS.S3({
  accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
  region: REGION,
});

// Función para subir la imagen a S3
export const uploadImageToS3 = async (file) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: file.name,
    Body: file,
    ContentType: file.type,
  };

  return s3.upload(params).promise();
};

async function PostBlog(file, title, creator, introduction, content) {
  /////////////////////////// Subir imagen a Amazon S3 ///////////////////////////////
  let imagenUrl = '';

  // Validar que el archivo exista y sea un tipo de archivo aceptado
  if (!file || !file.type.startsWith('image/')) {
    console.error('El archivo proporcionado no es una imagen válida');
    throw new Error('El archivo debe ser una imagen');
  }

  // Función para generar un nombre de archivo con solo números aleatorios
  const generateRandomNumbers = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10); // Genera números aleatorios entre 0-9
    }
    return result;
  };

  // Crear un nuevo nombre de archivo usando solo números
  const randomName = generateRandomNumbers(12); // Ejemplo: "123456789012"
  const fileExtension = file.name.split('.').pop(); // Obtener la extensión del archivo
  const renamedImage = new File(
    [file],
    `${randomName}.${fileExtension}`, // Nombre aleatorio con extensión original
    { type: file.type }
  );

  console.log('Nombre del archivo renombrado:', renamedImage.name);

  // Subir imagen a S3
  try {
    const result = await uploadImageToS3(renamedImage);
    imagenUrl = result.Location; // URL de la imagen subida
    console.log('Imagen subida a S3:', imagenUrl);
  } catch (error) {
    console.error('Error al subir la imagen a S3:', error);
    throw new Error('No se pudo subir la imagen a S3');
  }

  /////////////////////////// Guardar blog en el servidor ///////////////////////////////
  const blogData = {
    title,
    creator,
    introduction,
    content,
    image_url: imagenUrl,
  };

  console.log('Datos del blog:', blogData);

  const token = localStorage.getItem('access_token'); // Obtener token
  if (!token) {
    console.error('No token found');
    throw new Error('No se encontró el token de autenticación');
  }

  const validationToken = `Bearer ${token}`;

  try {
    const response = await fetch('http://localhost:8000/api/blogs/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: validationToken,
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Error al guardar el blog: ${errorDetails.message || 'Desconocido'}`);
    }

    const newBlog = await response.json();
    console.log('Blog guardado:', newBlog);
    return newBlog;
  } catch (error) {
    console.error('Error al guardar el blog:', error.message);
    throw error;
  }
}

export default PostBlog;


  