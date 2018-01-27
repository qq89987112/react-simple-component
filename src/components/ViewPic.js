import BaseComponent from "../BaseComponent";
import {Tag} from "antd";
import React from "react";
import ModalWrapper from "./ModalWrapper";
import "./css/ViewPic.scss"

class ViewPic extends BaseComponent {
    render(){
        const url = this.props.url;
        return   <Tag onClick={()=>ModalWrapper.$show(()=> <a target='_blank' href={url}><img class="view-pic-pic" src={url}/></a>)} style={{cursor:'pointer'}} color='blue' >查看</Tag>
    }
}

export default ViewPic;