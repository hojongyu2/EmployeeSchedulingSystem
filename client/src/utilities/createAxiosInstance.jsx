import axios from 'axios';

// // Custom axios instance
// export const axiosWithCSRF = axios.create({
//   baseURL: import.meta.env.VITE_REACT_APP_AXIOS, // get baseURL from .env file
//   withCredentials: true,
// });

// // Add the CSRF token to every request using getCSRFToken
// axiosWithCSRF.interceptors.request.use(
//   (config) => {
//     const token = getCSRFToken();
//     if (token) {
//       config.headers['X-CSRFToken'] = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
function createAxiosInstance() {
  const accessToken = localStorage.getItem("access_token");

  const axiosInstance = axios.create({
    baseURL: "https://yourbackend.com/api/",
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Content-Type": "application/json",
    },
  });
  
  // Response interceptor for handling token expiration and retries
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const { success, access } = await refreshToken();

        if (success) {
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
          originalRequest.headers["Authorization"] = `Bearer ${access}`;
          return axiosInstance(originalRequest);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export default createAxiosInstance;