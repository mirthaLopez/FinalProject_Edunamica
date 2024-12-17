async function GetEvents() { 
    try {
        const response = await fetch("http://localhost:8000/api/events/", {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
            },
        });

        const data = await response.json();
        console.log(data); // Muestra los datos obtenidos en la consola
        
        if (response.status === 200) { 
            return data; // Retorna los datos si el estado es 200 (éxito)
        } else {
            console.log(data.error?.message || "Error al obtener los eventos");   
            return [];  // Retorna un arreglo vacío en caso de error
        }
       
    } catch (error) { 
        console.error("Fetch error", error);  
        return [];  // Retorna un arreglo vacío si ocurre un error en el fetch
    }
}

export default GetEvents;
