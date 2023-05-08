import axios from 'axios';

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