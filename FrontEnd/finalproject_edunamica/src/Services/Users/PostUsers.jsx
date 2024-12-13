// services/Users/PostUser.js
async function PostUser(email, password) {
    try {
        const userData = {
            email,
            password
        };

        const response = await fetch('http://127.0.0.1:8000/api/token/email/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }); 

        if (!response.ok) {
            throw new Error("Usuario o contraseña incorrectos");
        }

        const data = await response.json();
        console.log('Login exitoso:', data);
        
        // No guardamos los tokens aquí, eso lo hará el contexto
        return data; // Solo devolvemos los datos de acceso y refresh token
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
}

export default PostUser;
