async function PostStudentPayment(student_fk, payment_fk) {
    // Crear un objeto con los datos a enviar
    const studentData = {
        student_fk,
        payment_fk
    };


    const token = localStorage.getItem('access_token');    
    if (!token) {
        console.error("No token found");
        return; 
    }
    const validation_token = "Bearer " + token;


    console.log(studentData);
    
    try {
        const response = await fetch('http://127.0.0.1:8000/api/student_payment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validation_token,
            },
            body: JSON.stringify(studentData)
        });

        // Verificamos el estado de la respuesta
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error en la solicitud POST:", errorData);
            return;
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error al hacer la solicitud POST:", error);
    }
}

export default PostStudentPayment;