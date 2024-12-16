async function DeleteCourse(courseId) {

    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error("No token found");
        return;
    }

    const validationToken = `Bearer ${token}`;

    try {
        const response = await fetch(`http://localhost:8000/api/courses/${courseId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validationToken,
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user with id ${courseId}`);
        }

        return { message: `User with id ${courseId} deleted successfully` };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export default DeleteCourse;