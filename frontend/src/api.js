const API_BASE_URL = 'http://localhost:8080';

const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { cache: 'no-cache' });
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
  },
  
  post: async (endpoint, body) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'An API error occurred.');
    return data;
  }
};

export default api;