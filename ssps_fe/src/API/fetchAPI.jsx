
import axios from "axios";
import Cookies from 'js-cookie'

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
        // return response;
        return response.data;
    } catch (error) {
        console.error("GET Request failed:", error);
        window.alert(`GET Request failed: ${error.message}`);
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

        // return response;
        return response.data;
    } catch(error) {
        console.error(`${method} Request failed:`, error);
        window.alert(`${method} Request failed: ${error.message}`);
        return undefined;
    }
}