async function GetStudentCourses() {
    const token = localStorage.getItem('access_token');
    if (!token || token.trim() === '') {
        console.error("No token found");
        return null;
    }

    const validationToken = `Bearer ${token}`;

    try {
        const response = await fetch('http://localhost:8000/api/student_courses/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validationToken,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error: ${response.status} - ${errorData.error.message || 'Unknown error'}`);
            return null;
        }

        const data = await response.json();
        return data;  // Si la respuesta es exitosa, devolver los datos
    } catch (error) {
        console.error('Fetch error', error);  // Manejar errores de la solicitud
        return null;
    }
}

export default GetStudentCourses;

