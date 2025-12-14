import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.BASEURL}/api`,
    withCredentials: true
});

export function addToken(token: string) {
    if (token) {
        localStorage.addItem('token', token);
        axiosInstance.defaults.headers.common.Authorization = token;
    }
}

export default axiosInstance;
