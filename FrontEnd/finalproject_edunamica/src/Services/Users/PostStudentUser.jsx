async function PostAuthStudentUser(username, email, password) {
    
    const userData={
        username,
        email,
        password
    }

    try {

        const response = await fetch('http://localhost:8000/api/users_student/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
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