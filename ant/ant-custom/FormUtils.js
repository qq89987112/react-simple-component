class FormUtils {

    constructor(form) {
        this.form = form;

        // 记得规则上加上 required: true
        this.hasErrors = (fields) => {
            let fieldsError = this.getFieldsError(fields);
            return Object.keys(fieldsError || {}).some(field => fieldsError[field]);
        }
        this.help = (name) => {
            const
                {getFieldError, isFieldTouched} = this.form,
                isTouched = isFieldTouched(name),
                error = getFieldError(name);

            // 后面的  || '' 必须加不然不正常
            return {
                hasFeedback: true,
                validateStatus: (isTouched && (error ? 'error' : 'success')) || '',
                help: (isTouched && error) || ''
            }
        }
        Object.entries(this.form).forEach((item) => {
            let
                key = item[0],
                value = item[1];

            if (this.form.hasOwnProperty(key) && !(key in this)) {
                this[key] = value;
            }
        })
    }


}

export default FormUtils;