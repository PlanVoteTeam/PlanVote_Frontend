export const apiUrl: string = import.meta.env.VITE_LOCAL_API_URL
  ? import.meta.env.VITE_LOCAL_API_URL
  : "https://planvotebackend.onrender.com/";

export const requestMode = import.meta.env.VITE_LOCAL_API_URL
  ? "cors"
  : "no-cors";
