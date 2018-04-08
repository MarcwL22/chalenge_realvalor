import CryptoJS from 'crypto-js';

export const public_key = '1d3c7c48c7249900370099d1eee0bddd';
export const private_key = 'f5348ac416c9162a4a4e95233349d63dfba71158';
export const ts = new Date().getDate();
export const hash = CryptoJS.MD5(ts + private_key + public_key).toString();
export const api_url = 'https://gateway.marvel.com/';
