async function PostAuthStudentUser(username, email, password) {
    
    const userData={
        username,
        email,
        password
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error("No token found");
        return;
    }

    const validationToken = `Bearer ${token}`;

    try {

        const response = await fetch('http://localhost:8000/api/users_student/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validationToken,
            },
            body: JSON.stringify(userData) 
        });

        const data = await response.json();
            return data; 

    } catch (error) {

        console.error(error);
    }
}
export default PostAuthStudentUser;