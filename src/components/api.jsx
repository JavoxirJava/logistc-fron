import axios from "axios";

export const url = 'http://137.184.13.215/'
export const byIdObj = (id) => document.getElementById(id);
export const byId = (id) => byIdObj(id) ? byIdObj(id).value : '';
export const config = {
    headers: {
        Authorization: sessionStorage.getItem('jwtKey')
    }
}
export const setConfig = () => config.headers.Authorization = sessionStorage.getItem('jwtKey');

export const getMe = (setMe) => {
    axios.get(`${url}user/getMe`, config).then(res => setMe(res.data.body))
}