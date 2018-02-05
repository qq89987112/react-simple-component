/* eslint-disable no-duplicate-case */
import React from 'react';
import {Form, Input, Checkbox, Button, Modal} from "antd";
import BaseComponent from "../components/BaseComponent";
import FormUtils from "../components/ant-custom/FormUtils";
import validator from "../js/validator";

const FormItem = Form.Item;

class LoginForm extends BaseComponent {

    formUtils = new FormUtils(this.props.form);


    state = {
        account: '',
        password: ''
    }

    componentDidMount() {
        this.formUtils.validateFields();
    }

    login = (e) => {
        e.preventDefault();
        this.$load('login');
        console.log(this.formUtils.getFieldsValue(["account", "password"]));;
        //    根据不同的帐号跳转到不同的页面
        Promise.resolve().then(() => {
            //登录成功后保存相关信息
            let history = this.props.history;
            history.push('/home');
        })
    }



    render() {
        let
            formUtils = this.formUtils;


        return <Modal title='登录' visible={true} closable={false} footer={null}>
            <Form onSubmit={this.login}>
                {
                    formUtils.getFieldDecoratorEx({field:"account",rules: validator.account,label:"账号"})( <Input type="text"/>)
                }
                {
                    formUtils.getFieldDecoratorEx({field:"password",rules: validator.password,label:"密码"})( <Input type="password"/>)
                }
                <FormItem>
                    <Checkbox onChange={this.$onInput('autoLogin')}>自动登陆</Checkbox>
                    <Button className='fr' type='default'>忘记密码</Button>
                </FormItem>
                <FormItem>
                    <Button htmlType="submit" disabled={formUtils.hasErrors()}
                            className='horizontal-center' type='primary'
                            loading={this.$isLoading('login')}>登录</Button>
                </FormItem>
            </Form>
        </Modal>

    }
}

const BaseForm = Form.create()(LoginForm);

class Login extends React.Component {
    render() {
        return <BaseForm {...this.props}/>
    }
};
export default Login

