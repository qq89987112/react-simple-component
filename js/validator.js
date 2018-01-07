export default {
    password:[
        {
            required: true,
            message:'密码不能为空'
        },
        {
            min: 6,
            message: '密码不能低于6位'
        }],
        account:[
    {
        require: true,
        message: '账号不能为空!'
    },
    {
        type: 'email',
        message: '请输入正确的账号!'
    }],
    email:[
    {
        require: true,
        message: '邮箱不能为空!'
    },
    {
        type: 'email',
        message: '请输入正确的邮箱!'
    }
]
}