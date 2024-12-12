async function GetStudentCourses() { 
    try {
        // Obtener el token desde localStorage
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error("No token found");
            return;
        }

        // Agregar el token en los headers de la solicitud
        const validationToken = `Bearer ${token}`;

        const response = await fetch('http://127.0.0.1:8000/api/student_payment/', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validationToken, // Agregar el token aquí
            },
        });

        const data = await response.json();

        if (response.status === 200) { 
            return data;  // Si la respuesta es exitosa, devolver los datos
        } else {
            console.log(data.error.message);  // Si hay un error, mostrar el mensaje
        }
       
    } catch (error) { 
        console.error(`Fetch error`, error);  // Manejar errores de la solicitud
    }
}

export default GetStudentCourses;
