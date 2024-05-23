import axios from "axios";

export const url = 'http://137.184.13.215:8080/'
// export const url = 'http://192.168.153.154/'
export const byIdObj = (id) => document.getElementById(id);
export const byId = (id) => byIdObj(id) ? byIdObj(id).value : '';
export const config = {
    headers: {
        Authorization: sessionStorage.getItem('jwtKey')
    }
}
export const setConfig = () => config.headers.Authorization = sessionStorage.getItem('jwtKey');

export const getMe = (setMe, lang) => {
    setConfig();
    axios.get(`${url}user/getMe?lang=${lang}`, config).then(res => setMe(res.data.body)).catch(err => {});
}

export const getClientProduct = (page, size, setClientProduct, setTotalPage, lang) => {
    axios.get(`${url}user?page=${page}&size=${size}&lang=${lang}`, config)
        .then(res => {
            if (res.data.message) {
                setClientProduct(res.data.body.object);
                setTotalPage(res.data.body.totalPage ? res.data.body.totalPage - 1 : 0)
            }
        })
        .catch((err) => {
        })
}

export const getManagerProduct = (page, size, setClientProduct, setTotalManager, lang) => {
    axios.get(`${url}user/manager?page=${page}&size=${size}&lang=${lang}`, config)
        .then(res => {
            if (res.data.message) {
                setClientProduct(res.data.body.object);
                setTotalManager(res.data.body.totalPage ? res.data.body.totalPage - 1 : 0)
            }
        })
        .catch((err) => {
        })
}

export const getCasherProduct = (page, size, setClientProduct, setTotalCasher, lang) => {
    axios.get(`${url}user/cashier?page=${page}&size=${size}&lang=${lang}`, config)
        .then(res => {
            if (res.data.message) {
                setClientProduct(res.data.body.object);
                setTotalCasher(res.data.body.totalPage ? res.data.body.totalPage - 1 : 0)
            }
        })
        .catch((err) => {
        })
}


export function getUsers(setUser, lang) {
    axios.get(`${url}user?lang=${lang}`, config).then(res => setUser(res.data.body.object)).catch(err => {});
}

export function getUserList(setUserList, lang) {
    axios.get(`${url}user/list?lang=${lang}`, config).then(res => setUserList(res.data.body)).catch(err => {});
}

export function getUserSearch(setUserList, lang, idNumber) {
    axios.get(`${url}user/search?idNumber=${idNumber}&lang=${lang}`, config).then(res => setUserList(res.data.body)).catch(err => {});
}

export const getFile = `${url}attachment/getFile/`
