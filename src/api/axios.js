import axios from "axios"
const baseUrl = "http://localhost:3000"
const axiosPublic = axios.create(
    {
        baseUrl,
        withCredentials: true,
    }
)
export default axiosPublic