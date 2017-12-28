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

        const modal = Modal.success({
            content: msg,
        });
        // setTimeout(() => modal.destroy(), 1000);
    }

    // 用于向用户展示友好的报错
    $toastError = (msg)=>{
        // //暂时使用error
        // console.error(msg);

        const modal = Modal.error({
            content: msg,
        });
        // setTimeout(() => modal.destroy(), 1000);
    }




}

export default BaseComponent;