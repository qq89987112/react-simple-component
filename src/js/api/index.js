import axios from 'axios'
axios.interceptors.response.use(data => {
    if(/\.json$/.test(data.config.url)){
        return data.data;
    }
    data = data.data.data;
    // if (data.pageError || !data.status) {
    //     return Promise.reject(data);
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
