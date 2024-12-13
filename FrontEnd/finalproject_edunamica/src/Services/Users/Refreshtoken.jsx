export const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }
  
      const data = await response.json();
      return data.access;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  };