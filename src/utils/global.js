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
    }
}