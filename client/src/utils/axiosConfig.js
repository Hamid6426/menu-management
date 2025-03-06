import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api', // Replace with your API's base URL
    timeout: 10000, // Set a timeout for requests (in milliseconds)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can modify the request config before sending it
        // For example, add an authorization token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // You can modify the response data before returning it
        return response;
    },
    (error) => {
        // Handle the response error
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
