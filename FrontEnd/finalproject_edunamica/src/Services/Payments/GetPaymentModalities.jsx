async function GetPaymentModality() { 

    const token = localStorage.getItem('access_token');

    if (!token) {
        console.error("No token found");
        return []; 
    }

    const validation_token = "Bearer " + token; 

    try {

        const response = await fetch("http://localhost:8000/api/payment_modality/", {
            method: 'GET', 
            headers: {
                'Authorization': validation_token,  
                'Content-Type': 'application/json', 
            },
        });

        const data = await response.json();
        console.log(data);
        

        if (response.status === 200) { 
            return data; 
        } else {
            console.log(data.error.message);   
            return [];  
        }
       
    } catch (error) { 
        console.error("Fetch error", error);  
        return [];  
    }
}

export default GetPaymentModality;