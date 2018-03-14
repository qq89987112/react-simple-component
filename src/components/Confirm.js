import {Popconfirm} from "antd";
import React from "react";
import BaseComponent from "./BaseComponent";



export default class Confirm extends BaseComponent {
    render(){
        //onConfirm onCancel
        const {title="确定要删除？",children,...rest} = this.props;
        return  <Popconfirm title={title} okText="是" cancelText="否" {...rest}>
            {children||"删除"}
        </Popconfirm>
    }
};