import React from 'react';
import {Switch} from 'antd'
import BaseComponent from "../BaseComponent";


export default class SwitchEx extends BaseComponent {

    render() {
        let { onCheck = Promise.resolve,onUncheck = Promise.resolve,onChange= ()=>{},...rest} = this.props;
        const {checked} = this.state;
        return <Switch  loading={this.$isLoading('loading')} checked={checked}  onChange={checked=>{
            let promise;
            promise = checked ? onCheck : onUncheck;
            this.$load('loading');
            promise().then(()=>{
                this.setState({
                    checked
                })
            }).catch(()=>{
                this.setState({
                    checked:!checked
                })
            }).then(()=>{
                onChange(this.state.checked);
                this.$cancel('loading')
            })
        }
        } {...rest} />
    }
}