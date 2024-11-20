async function PostAdmin(admin_name, admin_first_last_name, admin_second_last_name,admin_phone_number,admin_email, admin_auth_user_fk) {
    // Crear un objeto con los datos a enviar
    const adminData = {
        admin_name,
        admin_first_last_name,
        admin_second_last_name,
        admin_phone_number,
        admin_email,
        admin_auth_user_fk,
    };

    // Validación de campos requeridos
    if (!admin_name || !admin_first_last_name || !admin_email || !admin_phone_number) {
        console.error("Faltan campos requeridos: ", adminData);
        return;
    }

    const token = localStorage.getItem('access_token');    
    if (!token) {
        console.error("No token found");
        return; 
    }
    const validation_token = "Bearer " + token;


    console.log(adminData);
    
    try {
        const response = await fetch('http://127.0.0.1:8000/api/administrator/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validation_token,
            },
            body: JSON.stringify(adminData)
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

export default PostAdmin;