async function DeletePartners(id) {

    /////////////////////////////Obtiene el token de acceso desde local storage///////////////
    const token = localStorage.getItem('access_token');    
    if (!token) {
        console.error("No token found");
        return; 
    }
    const validation_token = "Bearer " + token;
    
    try {
        const response = await fetch(`http://localhost:8000/api/partners/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',  // Agregar la coma aquí
                'Authorization': validation_token,
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user with id ${id}`);
        }

        return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export default DeletePartners;
