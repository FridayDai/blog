import { axiosPostCustomize } from '../util/index';
// import { dispatch } from '../../store';
import CryptoJS from 'crypto-js';

export const AJAX_PROGREESS: string = "AJAX_PROGREESS";

const encryptPwd = (pwd) => {
    const KEY = 'abcdefgabcdefg12';

    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(pwd),
        CryptoJS.enc.Utf8.parse(KEY),
        {
            'padding': CryptoJS.pad.Pkcs7,
            'mode': CryptoJS.mode.ECB
        }).toString();
};

export const login = (username: string, password: string) => {
    return axiosPostCustomize('/rest/login', { 'name': username, 'password': encryptPwd(password) })
        .then(res => res)
        .catch(xhr => console.error(xhr));
};
