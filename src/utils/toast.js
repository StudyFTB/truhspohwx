import { Toast } from 'vant';

// 等待提示
export const startLoading = () => {
    return Toast.loading({
        message: '加载中...',
        forbidClick: true,
        overlay: true,
        duration: 0
    });
}

// 清除所有提示
export const clearToast = () => {
    return Toast.clear(true);
}

// 成功提示
export const successToast = (message) => {
    return Toast.success(message);
}

// 失败提示
export const failToast = (message) => {
    return Toast.fail(message);
}