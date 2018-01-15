import React from "react";

export default {
    password: [
        {
            required: true,
            message: "请输入密码！"
        },
        {
            min: 6,
            message: "密码格式不正确！"
        }],
    account: [
        {
            required: true,
            message: "请输入账号！"
        },
        {
            min: 2,
            message: "账号格式不正确！"
        }],
    email: [
        {
            required: true,
            message: "请输入邮箱！"
        },
        {
            type: 'email',
            message: "邮箱格式不正确！"
        }
    ]
}