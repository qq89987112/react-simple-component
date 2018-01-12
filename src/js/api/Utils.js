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

    wrapWithLoadMore(apiFunc,{ rows = 10,params} = {}){
        let
            _page = 1,
            _isLoaded = false,
            _params = params;

        return {
            reLoad(params) {
                _page = 1;
                _isLoaded = false;
                _params = params || _params;
                return apiFunc(_page, rows, _params);
            },
            // 这个主要功能是当通过筛选reLoad后,保存筛选条件进行分页
            loadPage(page){
                return apiFunc(page, rows, _params);
            },
            loadNext() {
                return _isLoaded && Promise.reject({msg: "全部加载完成"}) ||

                    apiFunc(++_page, rows, _params).then((data) => {
                        data = data.data;
                        if (data && data.length === 0) {
                            _isLoaded = true;
                            return Promise.reject({msg: "全部加载完成"});
                        }
                        return data;
                    });
            },
            //  并不需要,直接loadNext拿到报错即可
            // isLoaded(){
            //   return _isLoaded;
            // }
        }
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