
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

        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    }, (err) =>  {
        return Promise.reject(err)
})

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