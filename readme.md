# react $nextTick的正确用法
        await this.setState({type: 'forget'})
        formUtils.validateFields()

# react的网页报错点击后可以在webstorm中打开相应位置。。。。


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