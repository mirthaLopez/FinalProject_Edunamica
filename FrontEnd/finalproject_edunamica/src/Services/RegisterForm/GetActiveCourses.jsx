async function GetActiveCourses() { 
    try {
        const response = await fetch("http://localhost:8000/api/courses/"); ///// cambiar este endpoint 
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

export default GetActiveCourses