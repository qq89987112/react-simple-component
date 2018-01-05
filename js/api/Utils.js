class ApiUtils {

    constructor(context) {
        this.context = context;
        this.wrapLoadingCache = new Map();
    }

    // 当api返回的data并不是列表时,应该在api函数里的then中作调整
    wrapWidthLoading(apiFunc, loadingName, stateName) {
        const
            self = this.context,
            wrapper = (...params) => {
                self.$load(loadingName);
                return apiFunc(...params).then((data) => {
                    self.setState({
                        [stateName]: data
                    })
                    self.$cancel(loadingName);
                    return data;
                });
            };

            this.wrapLoadingCache.set(apiFunc, wrapper);

        return wrapper
    }

    getWrapedWidthLoading(apiFunc){
        return this.wrapLoadingCache.get(apiFunc);
    }
}


export default ApiUtils;