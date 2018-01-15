## 条件渲染 if-else-if
- 问号表达式
- && 配合 ||
- 函数判断返回

## template的实现
    直接存放一个数组
     <Modal
           footer={[
             <Button key="back" onClick={this.handleCancel}>Return</Button>,
             <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
               Submit
             </Button>,
           ]}
         >
         </Modal>
     
### 去除key的警告
    因为react的render可以直接返回一个变量，则
      content = content.map((item) => {
                return () => item;
      })
     转为标签,
     然后渲染
      <Content className="side-content">
         {
             content.map((Item, index) => <Item key={index}></Item>)
         }
     </Content>
     
        
     
## vue中具名slot
### 使用方式
    <Modal
       footer={[
         <Button key="back" onClick={this.handleCancel}>Return</Button>,
         <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
           Submit
         </Button>,
       ]}
     >
     </Modal>
### 传参
    1、通过函数
        <Modal
           footer={ ({user})=>[
             <Button key="back" onClick={this.handleCancel}>Return</Button>,
             <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
               Submit
             </Button>,
           ]}
         >
         </Modal>


     2、通过包裹一层标签来监听原生函数。
