import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    'Content-Type':'application/json'
  }
})

// REQUEST Interceptor: Attach the token to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
)

// RESPONSE Interceptor: Handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response, // Directly return successful responses
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (Unauthorized) and we haven't retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Optional: Logic to refresh token goes here
        // const newToken = await refreshToken(); 
        // localStorage.setItem('token', newToken);
        // return api(originalRequest); // Retry the original request
        
        // Simple Version: Just redirect to login if unauthorized
        window.location.href = '/aboutUs'; 
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;