async function postStudentCourses(course_fk, student_fk) {

    const userData = {
        course_fk,
        student_fk,
    };

    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error("No token found");
        return;
    }

    const validationToken = `Bearer ${token}`;

    try {
        const response = await fetch('http://localhost:8000/api/student_courses/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validationToken,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error in posting student courses:", error);
    }
}

export default postStudentCourses;