#  参考vue
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
        <Modal
           footer={ ({user})=>[
             <Button key="back" onClick={this.handleCancel}>Return</Button>,
             <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
               Submit
             </Button>,
           ]}
         >
         </Modal>