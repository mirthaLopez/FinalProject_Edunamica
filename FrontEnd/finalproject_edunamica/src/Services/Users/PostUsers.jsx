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
        
        // guardar token en local storage
        localStorage.setItem('access_token', data.access);  
        localStorage.setItem('refresh_token', data.refresh);

        return data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
}

export default PostUser