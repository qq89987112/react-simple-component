import ApiUtils from "../../js/api/Utils";

class TableUtils {
    constructor(ctx) {
        this.ctx = ctx;
        this.apiUtils = new ApiUtils(ctx);
    }

    wrapApi(api, name, params) {
        const
            apiUtils = this.apiUtils,
            context = this.ctx,
            loadingWrapper = apiUtils.wrapWidthLoading(api, name, name),
            loadingMoreWrapper = apiUtils.wrapWithLoadMore(loadingWrapper, params);
        return loadingMoreWrapper.reLoad().then((data) => {
                context[name+"LoadMore"] = loadingMoreWrapper;
                context.setState({
                    [`${name}Pagi`]: {
                        total: data.totalCount,
                        onChange: (page, pageSize) => setTimeout(() => loadingMoreWrapper.loadPage(page), 0)
                    },
                    [`${name}Reload`]: loadingMoreWrapper.reLoad
                })
                return data;
            }
        )
    }
}

export default TableUtils;