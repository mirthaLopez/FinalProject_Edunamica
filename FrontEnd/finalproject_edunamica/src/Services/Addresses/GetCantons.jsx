async function GetCantons() { 
    try {
        const response = await fetch("http://localhost:8000/api/cantons/");
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

export default GetCantons