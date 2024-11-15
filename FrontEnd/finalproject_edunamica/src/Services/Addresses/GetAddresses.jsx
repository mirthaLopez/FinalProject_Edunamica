async function GetAddresses() { 
    try {
        const response = await fetch("http://localhost:8000/api/addresses/");
        const data = await response.json();
        if (response.status === 200) { 
            
            return data;
        }else {
            console.log(data.error.message);   
        }
       
    } catch (error) { 
        console.error(`Fetch error`, error);
    }
}

export default GetAddresses