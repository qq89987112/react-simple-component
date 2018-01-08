# 最佳实践
## wrapWidthLoading
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
           loading={this.$isLoading('scrapApprovalList')}
           dataSource={this.state.scrapApprovalList}
           columns={[
               {title: '项目', dataIndex: 'a'},
               {title: '报废类型', dataIndex: 'a'},
               {title: '当前状态', dataIndex: 'a'},
               {title: '报废数量', dataIndex: 'a'},
               {title: '报表生成时间', dataIndex: 'a'},
               {title: '操作', dataIndex: 'a',render:()=><div><Button type='primary' onClick={()=>ModalWrapper.$show(()=><Table
                       columns={[
                           {title: '项目名称', dataIndex: 'a'},
                           {title: '入库时间', dataIndex: 'a'},
                           {title: '样品阶段', dataIndex: 'a'},
                           {title: '样品类型', dataIndex: 'a'},
                           {title: '报废时间', dataIndex: 'a'},
                           {title: 'S/N', dataIndex: 'a'},
                       ]}
                   />)}>信息</Button>
                       <Button type='primary' onClick={()=>ModalWrapper.$show(()=><div className='approval'>
                       <Steps direction="vertical" size="small" current={1}>
                           <Step></Step>
                       </Steps>
                       <p className='row'>
                           <Button type='primary'>同意</Button>
                           <Button type='danger'>拒绝</Button>
                           <Button type='default'>修改数量</Button>
                       </p>
                       {this.state.modalExtra && <Input.TextArea/>}
                       <Button type='primary'>提交</Button>
                   </div>)}>审批</Button></div>},
           ]}
           pagination={this.state.scrapApprovalPagi}
       />