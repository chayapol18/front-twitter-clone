import axios from 'axios'

import localStorageService from '../services/localStorageService'

axios.defaults.baseURL = 'http://localhost:8888'

//intercept request ส่ง header ไปให้ back end
axios.interceptors.request.use(
    config => {
    if (localStorageService.getToken()) config.headers.Authorization = `Bearer ${localStorageService.getToken()}`;
    return config
    }, 
    err => Promise.reject(err)  //คล้ายๆ next function
);

axios.interceptors.response.use(response => response, err => {
    if (err.response.status === 401) {
        localStorageService.clearToken();
        window.location.assign('/') // window = globalObject, location = redirect path
        return;
    }
    return Promise.reject(err)
})

export default axios