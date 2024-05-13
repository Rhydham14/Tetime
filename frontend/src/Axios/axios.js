import axios from "axios";
const axiosInstance = axios.create({baseURL: "https://tetime-2.onrender.com"}); 
 
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    console.log("ttttt",token);
    const refreshToken = localStorage.getItem("refreshToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (refreshToken) {
      config.headers["refresh-token"] = refreshToken;
    }

    console.log("Request Interceptor:", config);
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    console.log("Response Interceptor:", response);
    console.log("Response Headers:", response.headers);

    if (response.data.token) {
      const newtoken = response.data.token;

      // Update the local storage with the new access token
      localStorage.setItem("token", newtoken);
    }

    return response;
  },
  async (error) => {
    console.error("Response Interceptor Error:", error);

    if (error.response && error.response.status === 419) {
      // Handle 419 error by refreshing the token
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        console.log("Inside token expiration handler, refreshing token...");
        const refreshResponse = await axios.get(
          `http://localhost:4000/api/users/refreshToken`,
          {
            headers: {
              "refresh-token": refreshToken,
            },
          }
        );
        console.log("-----------------resrefresh", refreshResponse);

        const newtoken = refreshResponse.data.token;
        console.log("hellloooo token", newtoken);
        localStorage.setItem("token", newtoken);

        // Retry the original request with the new access token
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newtoken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);

        // If the refresh token has expired, dispatch logout action
        if (
          refreshError.response.status === 401 &&
          refreshError.response.data.message === "Refresh token has expired"
        )
        
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);



 
export default axiosInstance;