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
    }
}