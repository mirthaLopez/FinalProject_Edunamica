async function PostEnrollment(enrollment_start_date, enrollment_end_date, available_spots, course_fk, course_modality_fk)  {
            
       const data = {
        enrollment_start_date,
        enrollment_end_date,
        available_spots,
        course_fk,
        course_modality_fk 
       };
       
        ////////////////////////////Obtiene el token de acceso desde local storage///////////////
        const token = localStorage.getItem('access_token');    
        if (!token) {
            console.error("No token found");
            return; 
        }
        const validation_token = "Bearer " + token;

       try {
           const response = await fetch('http://localhost:8000/api/enrollment/create/', {
               method: 'POST',
               headers:{
                   'Content-Type': 'application/json',
                   'Authorization': validation_token,
               },
               body: JSON.stringify(data),
           });
   
           if (!response.ok) {
             
               throw new Error('Error al guardar la matrícula. Token inválido o expirado');
           }
   
           const newPartner = await response.json();
               console.log("Alianza guardada:", newPartner);
           return newPartner;
       
           } catch (error) {
               console.error('Error en la solicitud', error);
               throw error;
       }
   }
   
   export default PostEnrollment