async function PostEvent(event_name, event_date, description) {
    const data = {
        event_name,
        event_date,
        description
    };

    const token = localStorage.getItem('access_token'); // Obtener token de almacenamiento local
    if (!token) {
        console.error("No token found");
        return;
    }

    const validationToken = `Bearer ${token}`;

    try {
        const response = await fetch('http://localhost:8000/api/events/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validationToken,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error al guardar el evento. Token inválido o expirado');
        }

        const newEvent = await response.json();
        console.log("Evento guardado:", newEvent);
        return newEvent;

    } catch (error) {
        console.error('Error en la solicitud', error);
        throw error;
    }
}

export default PostEvent;
