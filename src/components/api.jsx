import axios from "axios";

export const url = 'http://137.184.13.215:8090/'
// export const url = 'http://192.168.100.40/'
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
    axios.get(`${url}user/getMe?lang=${lang}`, config).then(res => setMe(res.data.body)).catch(err => console.log(err));
}

export const getClientProduct = (page, size, setClientProduct, setTotalPage, lang) => {
    axios.get(`${url}user?page=${page}&size=${size}&lang=${lang}`, config)
        .then(res => {
            if (res.data.message) {
                setClientProduct(res.data.body.object);
                                setTotalPage(res.data.body.totalPage ? res.data.body.totalPage - 1 : 2)
            }
        })
        .catch((err) => {})
        }



export function getUsers(setUser, lang) {
    axios.get(`${url}user?lang=${lang}`, config).then(res => setUser(res.data.body.object)).catch(err => console.log(err));
}

