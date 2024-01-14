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

export const getClientProduct = (page, size, setClientProduct, setTotalPage) => {
    axios.get(`${url}user?page=${page}&size=${size}`, config)
        .then(res => {
            if (res.data.message) {
                setClientProduct(res.data.body.object);
                setTotalPage(res.data.body.totalPage ? res.data.body.totalPage - 1 : 2)
            }
        })
}