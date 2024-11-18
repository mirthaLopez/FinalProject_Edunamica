
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

    const paymentData = {
        payment_date, /// Este no deberia ser necesario, se asigna automaticamente
        payment_amount,
        payment_receipt_url,
        payment_receipt_number,
        payment_method_fk
    };
    
    try {
        const response = await fetch('http://localhost:8000/api/courses/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': validation_token,
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