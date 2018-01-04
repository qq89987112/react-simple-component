class FormUtils{

    constructor(form){
        this.form = form;

        // To disabled submit button at the beginning.
    }

    hasErrors(fieldsError) {
        return Object.keys(fieldsError||{}).some(field => fieldsError[field]);
    }
    help(name) {
        const
            {getFieldError, isFieldTouched} = this.form,
            isTouched = isFieldTouched(name),
            error = getFieldError(name);

        // 后面的  || '' 必须加不然不正常
        return {
            hasFeedback:true,
            validateStatus: (isTouched && (error ? 'error' : 'success')) || '',
            help: (isTouched&&error) || ''
        }
    }
    getFieldDecorator(...params){
        return this.form.getFieldDecorator(...params);
    }
    getFieldsError(...params){
        return this.form.getFieldsError(...params);
    }

    //放在componentDidMount中用于初始化Button。
    validateFields(...params){
        return this.form.validateFields(...params);
    }
}

export default FormUtils;