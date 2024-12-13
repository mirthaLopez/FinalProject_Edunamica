async function GetStudentPayment() { 
    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error("No token found");
        return null;
    }

    const validationToken = `Bearer ${token}`;
    
    try {
        const response = await fetch('http://127.0.0.1:8000/api/student_payment/', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validationToken,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error:", errorData.error.message);
            return null; // O devuelve un objeto con el error, según lo que se necesite
        }

        return await response.json();  // Retorna la respuesta si todo salió bien
    } catch (error) { 
        console.error(`Fetch error:`, error);
        return null;
    }
}

export default GetStudentPayment;

