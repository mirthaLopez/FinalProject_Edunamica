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

async function PostPartners(partner_logo_url, partner_name) {
 //////////////////////////////////Guarda imagen en Amazon WS//////////////////////////////////////////////////////////////
  let imagenUrl='';    
    if (partner_logo_url) {
        try {
          const result = await uploadImageToS3(partner_logo_url);
          imagenUrl = result.Location; // Obtén la URL de la imagen subida
          console.log(imagenUrl); 
        } catch (error) {
          console.error('Error al subir la imagen a S3:', error);
          throw new Error('No se pudo subir la imagen a S3');
        }
      }

    partner_logo_url = imagenUrl /// Asigna el valor de la url de la imagen 

    const data = {
        partner_name,
        partner_logo_url,
    };

    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error("No token found");
        return;
    }

    const validationToken = `Bearer ${token}`;
    
    try {
        const response = await fetch('http://localhost:8000/api/partners/create/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': validationToken,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
          
            throw new Error('Error al guardar la alianza');
        }

        const newPartner = await response.json();
            console.log("Alianza guardada:", newPartner);
        return newPartner;
    
        } catch (error) {
            console.error('Error en la solicitud', error);
            throw error;
    }
}

export default PostPartners