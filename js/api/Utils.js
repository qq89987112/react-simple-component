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


    // 不推荐使用。当需要用到 getWrapedWidthLoading 时,应将函数集中初始化,如
    // const borrowList = apiUtils.wrapWidthLoading(borrow.borrowList, 'borrowList', 'borrowList');
    // borrowList().then(() => this.setState({
    //       borrowPagi: {
    //           total: 50,
    //           onChange: (page, pageSize) => setTimeout(() => borrowList(page, pageSize), 0)
    //       },
    //         borrowQuery:(...params2)=>{
    //             const _borrowList = borrowList;
    //             borrowList = (...params1)=>_borrowList(...params1,...params2);
    //             borrowList(1,this.page);
    //         }
    //     })
    // )
    getWrapedWidthLoading(apiFunc){
        return this.wrapLoadingCache.get(apiFunc);
    }
}


export default ApiUtils;