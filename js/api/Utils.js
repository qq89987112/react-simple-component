class ApiUtils{

    constructor(context){
        this.context = context;
    }

    wrapperLoad(apiFunc,loadingName,stateName){
        const self = this.context;
        return (...params)=>{
            self.$load(loadingName);
            apiFunc(...params).then((data)=>{
                self.setState({
                    stateName:data
                })
                self.$cancel(loadingName);
                return data;
            })
        }
    }
}
