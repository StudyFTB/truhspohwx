import axios from "axios";
import { startLoading, clearToast, failToast } from './toast';
// import { getToKen, getUserName } from "@/utils/app";
import encryption from './encryption';
//配置
import { host } from "@/config/config";


//声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;
function showMyLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
};
function HideMyLoading() {
    if (needLoadingRequestCount <= 0) return;
        needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        clearToast();
    }
};

/**
 * axios拦截器
 */
const BASEURL = host;
const service = axios.create({
    baseURL: BASEURL,
    timeout: 30000
});

service.defaults.withCredentials = false;

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 添加等待动画
    showMyLoading();
    // 添加头部信息
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    let { Timestamp, KEY } = encryption(`${config.baseURL}${config.url}`);
    config.headers['timestamp'] = Timestamp;
    config.headers['key'] = KEY;

    return config;
}, function (error) {
    // 对请求错误做些什么
    HideMyLoading();
    failToast(error.message);
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 关闭动画
    HideMyLoading();
    // 处理响应数据
    let res = response.data;
    if(res.code != '0000'){
        failToast(res.message);
        return Promise.reject(res);
    }else{
        return response;
    }
}, function (error) {
    // 对响应错误做点什么
    HideMyLoading();
    failToast(error.message);
    return Promise.reject(error);
});

export default service;