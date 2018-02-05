/* eslint-disable no-duplicate-case */
import React from 'react';
import {Form, Input, Checkbox, Button, Modal} from "antd";
import BaseComponent from "../../components/ant-custom/BaseAntPage";
import FormUtils from "../../components/ant-custom/FormUtils";
import validator from "../../js/validator";
import account from "../../js/api/account";

const FormItem = Form.Item;

class ForgetForm extends BaseComponent {

    formUtils = new FormUtils(this.props.form);



    componentDidMount() {
        this.formUtils.validateFields();
    }

    forget = (e) => {
        e.preventDefault();
        this.$load('login');
        account.login(this.formUtils.getFieldsValue(["username", "password"])).then(()=>this.setState({
            requested:true
        }));
    }



    render() {
        let
            formUtils = this.formUtils;


        return <Modal title={this.$f('account.login')} visible={true} closable={false} footer={null}>
            {
                this.state.requested ?  <Form onSubmit={this.forget}>
                    <FormItem label={this.$f("account")}
                              {...formUtils.help('email')}
                    >
                        {
                            formUtils.getFieldDecorator('email', {
                                rules: validator.email
                            })(<Input type='text' placeholder='E-mail'/>)
                        }
                    </FormItem>
                    <FormItem>
                        <Button
                            htmlType="submit"
                            disabled={formUtils.hasErrors(['email'])}
                            className='fr' type='primary'
                            loading={this.$isLoading('forget')}
                        >{this.$f('submit')}</Button>
                    </FormItem>
                </Form> : <div className='forget-submit'>
                    <p><i className="iconfont icon-youxiang"/></p>
                    {this.$f("password.reset.success")}
                </div>
            }
        </Modal>

    }
}

const BaseForm = Form.create()(ForgetForm);


export default class ForgetPassword extends React.Component {
    render() {
        return <BaseForm {...this.props}/>
    }
}
