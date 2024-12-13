async function PostStudentPayment(student_fk, payment_fk) {
    // Crear un objeto con los datos a enviar
    const studentData = {
        student_fk,
        payment_fk
    };

    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error("No token found");
        return;
    }

    const validationToken = `Bearer ${token}`;

    // Log the data being sent for debugging
    console.log('Sending student payment data:', studentData);

    try {
        const response = await fetch('http://127.0.0.1:8000/api/student_payment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validationToken,

            },
            body: JSON.stringify(studentData),
        });

        // Check if the response status is OK (200-299)
        if (!response.ok) {
            // Log the response status and text for better debugging
            const errorText = await response.text();  // Use .text() in case response is not JSON
            console.error(`Error in POST request. Status: ${response.status}, Message: ${errorText}`);
            return null;  // Return null to indicate failure
        }

        // Parse the response data
        const data = await response.json();
        console.log('Response data:', data); // Log the response data
        return data; // Return the response data from the API

    } catch (error) {
        // Log any network or other errors
        console.error('Error making POST request:', error);
        return null;  // Return null in case of an error
    }
}

export default PostStudentPayment;
