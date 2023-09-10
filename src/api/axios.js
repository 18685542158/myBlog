import axios from 'axios';

import useStore from '../store/index';
const useMusic = useStore()

const instance = axios.create({
    baseURL: 'http://localhost:3000',        // 设置基本url
    timeout: 5000,                           // 设置请求超时时间
    headers: {
        "Content-Type": 'application/json',   // 设置请求头
    }
});

instance.interceptors.request.use(
    config => {
        // 这里处理请求
        return config
    },
    error => {
        // 这里处理请求错误
        console.error(error);
        return Promise.reject(error)
    }
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 这里可以对响应进行处理
        return response.data;
    },
    error => {
        // 处理响应错误
        if(error.response.status==500){
            console.log('报错：code==500');
        }
        console.error(error);
        return Promise.reject(error);
    }
);

export default instance;