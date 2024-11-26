async function PostPeopleInterested(person_name,person_first_last_name,person_email,person_phone_number, person_notes,course) {
    
    const formData = {
      person_name,
      person_first_last_name,
      person_email,
      person_phone_number,
      person_notes,
      course,
    };
  
    try {
      const response = await fetch('http://localhost:8000/api/people_interested/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        console.log(response);
        throw new Error('Error al guardar la consulta');
      }
  
      const newQuestion = await response.json();
      console.log("Consulta guardada:", newQuestion);
      return newQuestion;
    } catch (error) {
      console.error('Error en la solicitud', error);
      throw error;
    }
  }
  
  export default PostPeopleInterested;
  
  