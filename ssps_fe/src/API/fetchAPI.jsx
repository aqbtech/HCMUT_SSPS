
import axios from "axios";
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const axiosClient = axios.create({
    baseURL: `http://localhost:8080`,
    timeout: 10000,
    headers : {
        'Content-Type' : 'application/json'

    }
});
export const axiosClient1 = axios.create({
    baseURL: `http://localhost:8081`,
    timeout: 10000,
    headers : {
        'Content-Type' : 'application/json'
    }
});

axiosClient.interceptors.request.use(
    async (config) => {
        const token = Cookies.get('TOKEN');
        console.log({token});
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    }, (err) =>  {
        return Promise.reject(err)
})

axiosClient.interceptors.response.use(

    async (response) => {
        const refreshToken = Cookies.get('TOKEN');
        console.log({refreshToken});
            if (refreshToken) {
                try {
                    const response = await sendRefreshRequest(refreshToken);
                    const { token } = response;
                    Cookies.set('TOKEN', token); // Update access token
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    console.log('Refresh token success:', token);
                    return axiosClient(originalRequest);
                } catch (err) {
                    console.error('Refresh token failed:', err);
                }
            } 
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = Cookies.get('TOKEN');
            if (refreshToken) {
                try {
                    const response = await sendRefreshRequest(refreshToken);
                    const { token } = response;
                    Cookies.set('TOKEN', token); // Update access token
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    console.log('Refresh token success:', token);
                    return axiosClient(originalRequest);
                } catch (err) {
                    console.error('Refresh token failed:', err);
                }
            }
        }
        return Promise.reject(error);
    }
);

export async function sendRefreshRequest(token){
    try {
        const response = await axiosClient1.post(
            `auth/refresh`, {tokenm : token}
        );
        return response.data;
    }
    catch (error) {
        console.error("POST Refresh Request failed:", error);
        return undefined;
    }
}

export async function sendGetRequest(path, body) {
    try {
        const response = await axiosClient.get(`${path}`, body);
        return response.data;
    } catch (error) {
        console.error("GET Request failed:", error);
        toast.error(`GET Request failed: ${error.message}`);
        return undefined;
    }
    
}

export default async function sendRequest(method, path, data) {
    try {
        const response = await axiosClient.request({
            method: method,
            url: path,
            data: data, 
        });
        return response.data;
    } catch(error) {
        console.error(`${method} Request failed:`, error);
        toast.error(`${method} Request failed: ${error.message}`);
        // window.alert(`${method} Request failed: ${error.message}`);
        return undefined;
    }
}