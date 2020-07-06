const openidKey = `patient_openid`;
const isFirstKey = "patient_isFirst";

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