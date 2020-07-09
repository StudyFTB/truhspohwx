const openidKey = `patient_openid`;
const isFirstKey = "patient_isFirst";
const qrstrKey = 'patient_qrstr';

// openid
export const setOpenid = value => {
    return sessionStorage.setItem(openidKey,value);
}
export const getOpenid = () => {
    return sessionStorage.getItem(openidKey);
}

// isFirst
export const setIsFirst = value => {
    return sessionStorage.setItem(isFirstKey,value);
}
export const getIsFirst = () => {
    return sessionStorage.getItem(isFirstKey);
}

// qrstr
export const setQrstr = value => {
    return sessionStorage.setItem(qrstrKey,value);
}
export const getQrstr = () => {
    return sessionStorage.getItem(qrstrKey);
}