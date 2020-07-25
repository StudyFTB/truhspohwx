const devHost = 'http://192.168.0.45:8080/TRUHSPOSWX';
const proHost = 'http://192.168.0.45:8080/TRUHSPOSWX';
export const host = process.env.NODE_ENV === 'production' ? proHost : devHost;