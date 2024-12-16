async function PostAdmin(admin_name, admin_first_last_name, admin_second_last_name, admin_phone_number, admin_email, admin_auth_user_fk) {
    // Crear un objeto con los datos a enviar
    const adminData = {
        admin_name,
        admin_first_last_name,
        admin_second_last_name,
        admin_phone_number,
        admin_email,
        admin_auth_user_fk,
    };

    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error("No token found");
        return;
    }

    const validationToken = `Bearer ${token}`;

    // Validación de campos requeridos
    if (!admin_name || !admin_first_last_name || !admin_email || !admin_phone_number) {
        console.error("Faltan campos requeridos: ", adminData);
        return { error: "Todos los campos requeridos deben estar completos" };
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/api/administrator/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validationToken,
            },
            body: JSON.stringify(adminData),
        });

        // Verificamos el estado de la respuesta
        if (!response.ok) {
            const errorData = await response.json();
            // Aquí puedes hacer un manejo específico según el error
            console.error("Error en la solicitud POST:", errorData);
            return { error: errorData?.message || "Error desconocido al crear el administrador" };
        }

        // Si la respuesta es exitosa, devolvemos los datos
        const data = await response.json();
        console.log("Administrador creado exitosamente:", data);
        return data;

    } catch (error) {
        console.error("Error al hacer la solicitud POST:", error);
        return { error: error.message || "Error desconocido" };
    }
}

export default PostAdmin;
