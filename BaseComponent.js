import React from "react";
import {Modal} from 'antd';

class BaseComponent extends React.Component {


    $onInput = (name) => {
        return (event) => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            // const name = target.name;
            this.setState({
                [name]: value
            });
        }
    }

    // 用于向用户展示友好的提示信息
    $toast = (msg) => {
        // //暂时使用log
        // console.log(msg);

        return new Promise((resolve, rejct) => {
            let modal = Modal.success({
                content: msg,
                onOk: () => {
                    modal.destroy();
                    resolve();
                }
            });
        })
        // setTimeout(() => modal.destroy(), 1000);
    }

    // 用于向用户展示友好的报错
    $toastError = (msg) => {
        // //暂时使用error
        // console.error(msg);


        Modal.error({
            content: msg,
        });
        // setTimeout(() => modal.destroy(), 1000);
    }

    // loading相关
    $load = (name) => {
        let __loadings__ = this.state.__loadings__ || new Set();
        __loadings__.add(name);
        this.setState({
            __loadings__: __loadings__
        })
    }

    $cancel = (name) => {
        let __loadings__ = this.state.__loadings__ || new Set();
        __loadings__.delete(name);
        this.setState({
            __loadings__: __loadings__
        })
    }

    // 可以用来做 ant button 的 loading 绑定
    // <Button type='primary' loading={this.$isLoading('submitForget')}>提交</Button>

    $isLoading(name) {
        let __loadings__ = this.state.__loadings__ || new Set();
        return __loadings__.has(name);
    }

//  ===========Modal 相关===========
    __onResult__ = () =>{}

    // 准备大改,type 改为 ReactNode
    // 使用方式为
    // this.$showModal(({resolve,reject,params,form})=><div></div>).then((result)=>{})
    //
    // 动态渲染DOM 的代码为
    // ReactDOM.render(React.createElement(ConfirmDialog, props), div);
    // 其中，  ConfirmDialog 可以为class
    $showModal = (type) => {
        this.setState({
            __modalType__: type || true
        })
        return new Promise((resolve, reject) => {
            this.__onResult__ = (result) => {
                resolve(result);
                this.__onResult__ = ()=>{}
            }
        })
    }

    $setModalResult = (result) => {
        this.__onResult__(result);
        // 为了方便使用confirmLoading就不自动关闭modal
        // this.$closeModal();
    }

    //潜意识地告诉使用者我拿type做modalShow
    $isModalShow = () => {
        return this.state.__modalType__ ;
    }

    $closeModal = () => {
        this.setState({
            __modalType__: undefined
        })
    }
}

export default BaseComponent;