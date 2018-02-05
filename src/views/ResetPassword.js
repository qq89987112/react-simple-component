import React from 'react';
import {Form, Input, Checkbox, Button, Modal} from "antd";
import BaseComponent from "../../components/ant-custom/BaseAntPage";
import FormUtils from "../../components/ant-custom/FormUtils";
import validator from "../../js/validator";
import account from "../../js/api/account";

const FormItem = Form.Item;

class ResetForm extends BaseComponent {

    formUtils = new FormUtils(this.props.form);


    componentDidMount() {
        this.formUtils.validateFields();
    }

    reset = (e) => {
        e.preventDefault();
        this.$load('reset');
        account.resetPassword(this.formUtils.getFieldsValue(["password"]));
    }



    render() {
        let
            formUtils = this.formUtils;


        return <Modal title={this.$f('password.reset')} visible={true} closable={false} footer={null}>
            <Form className='reset-password-from'
                  onSubmit={this.reset}
            >
                {
                    formUtils.getFieldDecoratorEx({
                        field: 'password',
                        type: 'password',
                        rules: validator.password,
                        label: this.$f("password.new")
                    })
                }
                {
                    formUtils.getFieldDecoratorEx({
                        field: 'password2', type: 'password', rules: [{required: true}, {
                            validator:(rule, value, callback) =>{
                                if (value !== formUtils.getFieldValue('password')) {
                                    callback(this.$f("password.errors.confirm_wrong"));
                                } else {
                                    callback();
                                }
                            }
                        }], label: this.$f("password.confirm")
                    })
                }
                <FormItem>
                    <Button
                        htmlType='submit'
                        type='primary'
                        disabled={formUtils.hasErrors(['password1', 'password2'])}
                        className='fr'
                        loading={this.$isLoading('reset')}>{this.$f("submit")}</Button>
                </FormItem>
            </Form>
        </Modal>

    }
}

const BaseForm = Form.create()(ResetForm);


export default class Reset extends React.Component {
    render() {
        return <BaseForm {...this.props}/>
    }
}

