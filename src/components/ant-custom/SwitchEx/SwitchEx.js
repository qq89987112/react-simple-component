import React from 'react';
import {Switch} from 'antd'
import BaseComponent from "../BaseComponent";


export default class SwitchEx extends BaseComponent {

    render() {
        let { onCheck = Promise.resolve,onUncheck = Promise.resolve,...rest} = this.props;
        const {checked} = this.state;
        return <Switch checked={checked}  onChange={checked=>{
            let promise;
            if(checked){
                promise = onCheck()
            }else{
                promise = onUncheck()
            }

            promise.then(()=>{
                this.setState({
                    checked
                })
            }).catch(()=>{
                this.setState({
                    checked:!checked
                })
            })
        }
        } {...rest} />
    }
}