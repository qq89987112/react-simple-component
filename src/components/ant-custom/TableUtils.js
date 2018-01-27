import ApiUtils from "../../js/api/Utils";

class TableUtils{
    constructor(ctx){
        this.ctx = ctx;
        this.apiUtils = new ApiUtils(ctx);
    }

    wrapApi(api,name,autoRequest = true){
        const
            apiUtils = this.apiUtils,
            context = this.ctx,
            loadingWrapper = apiUtils.wrapWidthLoading(api, name, name),
            loadingMoreWrapper = apiUtils.wrapWithLoadMore(loadingWrapper);
            autoRequest&&loadingWrapper().then((data) => context.setState({
              [`${name}Pagi`]: {
                  total: data.count,
                  onChange: (page, pageSize) => setTimeout(() => loadingMoreWrapper.loadPage(page), 0)
              },
             [`${name}Reload`]:loadingMoreWrapper.reLoad
            })
        )
        return {
            loadingWrapper,
            loadingMoreWrapper
        }
    }
}

export default TableUtils;