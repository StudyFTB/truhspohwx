import { successToast, failToast } from './toast';
import { Dialog } from 'vant';

export default {
    install(Vue) {
        /* 
        * 轻提示
        */
        Vue.prototype.$_tip = (message,type="success")  => {
            return type == "success" ? successToast(message) : failToast(message);
        }
        /**
         * 确认提示
         */
        Vue.prototype.$_confirm = ({message,title,onConfirm,onCancel})  => {
            return Dialog.confirm({
                title: "提示",
                message
            }).then(() => {
                // on confirm
                onConfirm();
            }).catch(() => {
                // on cancel
                onCancel || "";
            });
        }
        /**
         * 计算距离今天的日期
         * @param {
         * 天数
         * } date 
         */
        Vue.prototype.$_setDate = date => {
            let d = new Date();
            d.setDate(d.getDate() + date);
            let y = d.getFullYear();
            let m = (d.getMonth()+1).toString().padStart(2,"0");
            let day = d.getDate().toString().padStart(2,"0");
            return `${y}-${m}-${day}`;
        }
        /**
         * 计算参数时间的10分钟剩余量
         * @param {
         * dateTime 下单时间，格式：2020-07-17 08:39:01
         * minute 分钟，多少分钟后
         * } dateTime 
         */
        Vue.prototype.$_remainTime = (dateTime,minute) => {
            // 下单时间
            let orderTime = new Date(dateTime);
            // 现在时间到下单后10分钟的时间，单位为 秒
            let remainTime = Math.floor((orderTime - new Date() + 1000*60*minute)/1000);
            let remainMinute = Math.floor(remainTime/60).toString().padStart(2,"0");
            let remainSecond = Math.floor(remainTime%60).toString().padStart(2,"0");
            return {
                second: remainTime,  // 剩余秒
                time: `${remainMinute}:${remainSecond}` // 格式化，MM:ss
            }
        }
    }
}