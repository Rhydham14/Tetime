import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tetime.onrender.com/"
});

// Request interceptor to attach authorization headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and other response errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor:", response);

    if (response.data.token) {
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
    }

    return response;
  },
  async (error) => {
    console.error("Response Interceptor Error:", error);

    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          console.log("Refreshing token...");
          const refreshResponse = await axios.get(
            "https://tetime.onrender.com/refresh/refreshtoken",
            {
              headers: { "refresh-token": refreshToken }
            }
          );

          const newToken = refreshResponse.data.token;
          console.log("New token:", newToken);

          // Update the local storage with the new access token
          localStorage.setItem("token", newToken);

          // Retry the original request with the new access token
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing access token:", refreshError);

          if (refreshError.response && refreshError.response.status === 401) {
            console.log("Refresh token has expired");
            // Handle token expiration (e.g., perform logout)
          }

          return Promise.reject(refreshError);
        }
      } else {
        console.error("No refresh token available");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
