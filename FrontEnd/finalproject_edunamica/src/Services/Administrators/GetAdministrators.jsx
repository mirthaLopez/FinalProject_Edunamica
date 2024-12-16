async function GetAdmin() { 

    try {
        const response = await fetch("http://localhost:8000/api/administrator/", {
            method: "GET", // Aunque GET es el método por defecto, es útil especificarlo
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (response.status === 200) { 
            return data;
        } else {
            console.log(data.error.message);   
        }

    } catch (error) { 
        console.error(`Fetch error:`, error);
    }
}

export default GetAdmin;
