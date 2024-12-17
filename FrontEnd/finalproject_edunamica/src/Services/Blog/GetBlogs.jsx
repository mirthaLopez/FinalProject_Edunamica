async function GetBlogs() {
    try {
      const response = await fetch("http://localhost:8000/api/blogs/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        return data; // Retorna los datos si la solicitud es exitosa
      } else {
        console.error("Error al obtener los blogs:", data.error?.message || "Error desconocido");
        return []; // Retorna un array vacío en caso de error
      }
    } catch (error) {
      console.error("Fetch error", error);
      return []; // Retorna un array vacío si ocurre un error
    }
  }
  
  export default GetBlogs;
  