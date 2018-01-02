import React from "react";
import { Modal } from 'antd';

class BaseComponent extends React.Component{


    $onInput = (name)=>{
        return (event)=>{
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            // const name = target.name;
            this.setState({
                [name]: value
            });
        }
    }

    // 用于向用户展示友好的提示信息
    $toast = (msg)=>{
        // //暂时使用log
        // console.log(msg);

        Modal.success({
            content: msg,
        });
        // setTimeout(() => modal.destroy(), 1000);
    }

    // 用于向用户展示友好的报错
    $toastError = (msg)=>{
        // //暂时使用error
        // console.error(msg);

        Modal.error({
            content: msg,
        });
        // setTimeout(() => modal.destroy(), 1000);
    }


    $load = (name)=>{
        let loadings = this.state.loadings || new Set();
        loadings.add(name);
        this.setState({
            loadings:loadings
        })
    }

    $cancel(name){
        let loadings = this.state.loadings || new Set();
        loadings.delete(name);
        this.setState({
            loadings:loadings
        })
    }

    // 可以用来做 ant button 的 loading 绑定
    // <Button type='primary' loading={this.$isLoading('submitForget')}>提交</Button>

    $isLoading(name){
        let loadings = this.state.loadings || new Set();
        return loadings.has(name);
    }

}

export default BaseComponent;