import axios from 'axios'
axios.interceptors.response.use(data => {
    // let result = data.data;
    // if(result.errCode ===0){
    //     return result.data;
    // }else{
    //     return Promise.reject(result)
    // }
    return data;
}, error => {
    console.table(error);
    return Promise.reject(error)
});

if(process.env.NODE_ENV === 'development'){
    axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/3149/GET';
}
axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/3149/GET';
