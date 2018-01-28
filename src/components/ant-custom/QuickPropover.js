import React from 'react';
import {Popover,Form,Input,Button} from 'antd'
import BaseComponent from "../BaseComponent";


export default class QuickPropover extends BaseComponent {

    render() {
        let { onSubmit,title,text } = this.props;

        return (
            <Popover placement="top"  onVisibleChange={v=> this.setState({popover:v})} visible={this.state.popover} title={title} content={
                <Form layout='inline' onSubmit={e => {
                    e.preventDefault();
                    this.$load('submit');
                    onSubmit&&onSubmit(this.$getInputValue('input')).then(()=>{
                        this.$cancel('submit');
                        this.setState({
                            popover:false
                        })
                    })
                }
                }>
                    <Form.Item><Input onInput={this.$onInput('input')} /></Form.Item>
                    <Form.Item><Button htmlType='submit' type='primary' loading={this.$isLoading('submit')}>确定</Button>
                    </Form.Item>
                </Form>} trigger="click">
                <Button>{text}</Button>
            </Popover>
        )
    }
}