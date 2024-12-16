async function PostStudent(student_name, student_first_last_name, student_second_last_name, student_birth_date,student_phone_number,student_email,student_id_url,identification_number, address, student_auth_user_fk, identification_fk , genre_fk, neighborhood_fk) {
    // Crear un objeto con los datos a enviar
   

   
    const studentData = {
        student_name,
        student_first_last_name,
        student_second_last_name,
        student_birth_date,
        student_phone_number,
        student_email,
        student_id_url,
        identification_number,
        address,
        student_auth_user_fk,
        identification_fk,
        genre_fk,
        neighborhood_fk
    };

    // Validación de campos requeridos
    /*if (!admin_name || !admin_first_last_name || !admin_email || !admin_phone_number) {
        console.error("Faltan campos requeridos: ", studentData);
        return;
    }*/

    console.log(studentData);

    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error("No token found");
        return;
    }

    const validationToken = `Bearer ${token}`;
    
    try {
        const response = await fetch('http://127.0.0.1:8000/api/student/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validationToken,

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

export default PostStudent;