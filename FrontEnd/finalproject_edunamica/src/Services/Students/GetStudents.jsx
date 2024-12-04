async function GetStudent() { 
    try {
        const response = await fetch('http://127.0.0.1:8000/api/student/');
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

export default GetStudent