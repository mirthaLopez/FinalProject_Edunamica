async function PostAuthAdminUser(username, email, password) {
    
    const userData = {
        username,
        email,
        password
    };

    console.log(userData);
    

    try {
        // Hacer el POST para crear el usuario de autenticación
        const response = await fetch('http://localhost:8000/api/users_admin/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        return data; // Devuelve la respuesta

    } catch (error) {
        console.error("Error al hacer la solicitud POST:", error);
    }
}

export default PostAuthAdminUser;

