# 最佳实践
## $onInput
    <Form className='table-header' onSubmit={(e)=>{
        e.preventDefault();
        this.state.scrapApprovalQuery(JSON.parse(JSON.stringify(this.$getAllInputValue(),['projectName','order','range'])));
    }}>
        <FormItem><Input className='header-item input' onChange={this.$onInput('projectName')} placeholder='项目名称／编号'/></FormItem>
        <FormItem><Input className='header-item input' onChange={this.$onInput('order')} placeholder='订单号'/></FormItem>
        <FormItem><RangePicker className='header-item' format={'YYYY/MM/DD'} onChange={(dates,dateStrings)=>this.$setInputValue('range',{ start: dateStrings[0],end: dateStrings[1]})} /></FormItem>
        <FormItem><Button htmlType='submit' type='primary'>查询</Button></FormItem>
    </Form>