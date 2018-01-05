class ApiUtils{

    constructor(context){
        this.context = context;
    }

    // 当api返回的data并不是列表时,应该在api函数里的then中作调整
    wrapWidthLoading(apiFunc, loadingName, stateName){
        const self = this.context;
        return (...params)=>{
            self.$load(loadingName);
            return apiFunc(...params).then((data)=>{
                self.setState({
                    [stateName]:data
                })
                self.$cancel(loadingName);
                return data;
            })
        }
    }
}


export default ApiUtils;