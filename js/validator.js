import {FormattedMessage} from "react-intl"
import React from "react";

export default {
    password: [
        {
            required: true,
            message: <FormattedMessage id='Login.errors.empty_pwd' />
},
{
    min: 6,
        message: <FormattedMessage id='Login.errors.error_pwd' />
}],
account: [
    {
        required: true,
        message: <FormattedMessage id='Login.errors.empty_account' />
},
{
    min: 2,
        message: <FormattedMessage id='Login.errors.error_account' />
}],
email: [
    {
        required: true,
        message: <FormattedMessage id='Login.errors.empty_email' />
},
{
    type: 'email',
        message: <FormattedMessage id='Login.errors.error_email' />
}
]
}