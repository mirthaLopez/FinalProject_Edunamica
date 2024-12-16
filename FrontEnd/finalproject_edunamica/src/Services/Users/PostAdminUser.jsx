async function PostAuthAdminUser(username, email, password) {
    
    const userData = {
        username,
        email,
        password
    };

    console.log(userData);

    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error("No token found");
        return;
    }

    const validationToken = `Bearer ${token}`;
    

    try {
        // Hacer el POST para crear el usuario de autenticación
        const response = await fetch('http://localhost:8000/api/users_admin/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validationToken,
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

