async function GetRegisterForm() { 

    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error("No token found");
        return;
    }

    const validationToken = `Bearer ${token}`;

    try {
        const response = await fetch("http://localhost:8000/api/form/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // O cualquier otro tipo de contenido si es necesario
                'Authorization': validationToken, // Añadir el token al encabezado Authorization
            }
        });

        const data = await response.json();
        if (response.status === 200) { 
            return data;
        } else {
            console.log(data.error.message);   
        }
       
    } catch (error) { 
        console.error(`Fetch error`, error);
    }
}

export default GetRegisterForm;
