import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://tetime.onrender.com/"
});

// Request interceptor to attach authorization headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
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

          if (
            refreshError.response &&
            refreshError.response.status === 401 &&
            refreshError.response.data.message === "Refresh token has expired"
          ) {
            // Handle token expiration (e.g., log out the user)
            console.log("Refresh token has expired");
            // Perform logout or other actions as needed
          }

          return Promise.reject(error);
        }
      } else {
        console.error("No refresh token available");
      }
    }

    // For other error cases, reject the promise with error message
    return Promise.reject(error);
  }
);

export default axiosInstance;



// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://tetime-2.onrender.com/",

//   // Change the baseURL as needed for your API endpoint
//   // Example: baseURL: "http://localhost:8080"
// });

// // Request interceptor to attach authorization headers
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = localStorage.getItem("token");
//     const refreshToken = localStorage.getItem("refreshToken");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     if (refreshToken) {
//       config.headers["refresh-token"] = refreshToken;
//     }

//     console.log("Request Interceptor:", config);
//     return config;
//   },
//   (error) => {
//     console.error("Request Interceptor Error:", error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle token refresh and other response errors
// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log("Response Interceptor:", response);
//     const { data } = response;

//     if (data.token) {
//       // Update the local storage with the new access token
//       localStorage.setItem("token", data.token);
//     }

//     return response;
//   },
//   async (error) => {
//     console.error("Response Interceptor Error:", error);

//     if (error.response && error.response.status === 401) {
//       const refreshToken = localStorage.getItem("refreshToken");

//       if (refreshToken) {
//         try {
//           console.log("Refreshing token...");
//           const refreshResponse = await axios.get(
//             "http://localhost:4000/api/users/refreshToken",
//             {
//               headers: {
//                 "refresh-token": refreshToken,
//               },
//             }
//           );

//           const newToken = refreshResponse.data.token;
//           console.log("New token:", newToken);

//           // Update the local storage with the new access token
//           localStorage.setItem("token", newToken);

//           // Retry the original request with the new access token
//           const originalRequest = error.config;
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           return axiosInstance(originalRequest);
//         } catch (refreshError) {
//           console.error("Error refreshing access token:", refreshError);
//         }
//       } else {
//         console.error("No refresh token available");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
