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

async function PostPayment( payment_date, payment_amount, payment_receipt_url,
    payment_receipt_number,payment_method_fk) {
    
 //////////////////////////////////Guarda imagen en Amazon WS//////////////////////////////////////////////////////////////
  let imagenUrl='';    
    if (payment_receipt_url) {
        try {
          const result = await uploadImageToS3(payment_receipt_url);
          imagenUrl = result.Location; // Obtén la URL de la imagen subida
          console.log(imagenUrl); 
        } catch (error) {
          console.error('Error al subir la imagen a S3:', error);
          throw new Error('No se pudo subir la imagen a S3');
        }
      }
      
    payment_receipt_url = imagenUrl /// Asigna el valor de la url de la imagen 
    console.log(payment_receipt_url);
    

    const paymentData = {
        payment_date, /// Este no deberia ser necesario, se asigna automaticamente
        payment_amount,
        payment_receipt_url,
        payment_receipt_number,
        payment_method_fk
    };

    
    console.log(paymentData);
    
    
    try {
        const response = await fetch('http://localhost:8000/api/payment/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
          
            throw new Error('Error al guardar el pago. Token inválido o expirado');
        }

        const newPayment = await response.json();
            console.log("Pago guardado:", newPayment);
        return newPayment;
    
        } catch (error) {
            console.error('Error en la solicitud', error);
            throw error;
    }
}

export default PostPayment