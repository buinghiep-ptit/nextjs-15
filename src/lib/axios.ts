import axios from "axios";

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 120000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - chỉ handle redirect khi 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nếu 401 và không phải từ login API thì redirect
    // if (
    //   error.response?.status === 401 &&
    //   !error.config.url?.includes("/login")
    // ) {
    //   console.warn("🚫 Unauthorized - redirecting to login");

    //   if (typeof window !== "undefined") {
    //     window.location.href = `${SIGNIN_URL}?next=${encodeURIComponent(
    //       window.location.pathname
    //     )}`;
    //   }
    // }

    return Promise.reject(error);
  }
);

// Development logging
if (process.env.NODE_ENV === "development") {
  axiosInstance.interceptors.request.use((config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log(`✅ ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      console.error(`❌ ${error.response?.status} ${error.config?.url}`);
      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
