# react-redux
- reducer中dispatch的正确做法是：
    因为 dispatch 的最终目的是为了更改其他reducer里的state,而redux和vuex不一样，每一个reducer都可以获取到dispatch，只要在相应的reducer里对相应的action以及store进行判断即可。

# react $nextTick的正确用法
        await this.setState({type: 'forget'})
        formUtils.validateFields()

# hook路由的做法
    1、写一个空的Route组件,在component的生命周期中写js代码。

# react的网页报错点击后可以在webstorm中打开相应位置。。。。

# webstorm中运行一直处于compile请换git bash运行一次查看报错。

# 打包 paths.js 
  function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
      envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : './');  // 这里 './' 改为 '/'
    return ensureSlash(servedUrl, true);
  }

  想放在子目录下，还需要使用hashHistory


# 最佳实践
## $onInput
   const borrowList = apiUtils.wrapWidthLoading(borrow.borrowList, 'borrowList', 'borrowList');
   borrowList().then(() => this.setState({
         borrowPagi: {
             total: 50,
             onChange: (page, pageSize) => setTimeout(() => borrowList(page, pageSize), 0)
         },
           borrowQuery:(...params2)=>{
               const _borrowList = borrowList;
               borrowList = (...params1)=>_borrowList(...params1,...params2);
               borrowList(1,this.page);
           }
       })
   )

      <Table
           title={() => <Form className='table-header' onSubmit={(e)=>{
               e.preventDefault();
               this.state.scrapApprovalQuery(JSON.parse(JSON.stringify(this.$getAllInputValue(),['projectName','order','range'])));
           }}>
               <FormItem><Input className='header-item input' onChange={this.$onInput('projectName')} placeholder='项目名称／编号'/></FormItem>
               <FormItem><Input className='header-item input' onChange={this.$onInput('order')} placeholder='订单号'/></FormItem>
               <FormItem><RangePicker className='header-item' format={'YYYY/MM/DD'} onChange={(dates,dateStrings)=>this.$setInputValue('range',{ start: dateStrings[0],end: dateStrings[1]})} /></FormItem>
               <FormItem><Button htmlType='submit' type='primary'>查询</Button></FormItem>
           </Form>}
           columns={[
               {title: '项目', dataIndex: 'a'},
               {title: '报废类型', dataIndex: 'a'},
               {title: '当前状态', dataIndex: 'a'},
               {title: '报废数量', dataIndex: 'a'},
               {title: '报表生成时间', dataIndex: 'a'}
           ]}
           loading={this.$isLoading('scrapApprovalList')}
           dataSource={this.state.scrapApprovalList}
           pagination={this.state.scrapApprovalPagi}
       />