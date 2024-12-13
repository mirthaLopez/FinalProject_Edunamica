async function GetCategory() { 

    try {

        const response = await fetch("http://localhost:8000/api/courses_category/", {
            method: 'GET', 
            headers: {
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

export default GetCategory;

