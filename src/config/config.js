const devHost = 'http://kdc.zstru.com/TRUHSPOSWX';
const proHost = 'http://kdc.zstru.com/TRUHSPOSWX';
export const host = process.env.NODE_ENV === 'production' ? proHost : devHost;