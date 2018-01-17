import React from 'react';
import {Route, Redirect, Link} from 'react-router-dom'
import consts from "../js/consts";
import {Spin, Modal} from "antd";
import BaseAntPage from "./ant-custom/BaseAntPage";
import auth from "../js/api/auth";
import cookies from "../js/cookies";
import {JSONParse} from "../js/JSONParse";

class AuthRoute extends BaseAntPage {

    componentWillMount() {
        this.$load("login");
        let account = JSONParse(cookies.getItem(consts.USER)),
            cacheUser = JSONParse(cookies.getItem(consts.AUTO_LOGIN)),
            promise = Promise.resolve(account);
        if (!account && cacheUser) {
            promise = auth.loginWidthCache(cacheUser)
        }
        promise.then((account) => {
            this.$cancel("login");
        })
    }

    render() {
        const
            {component: Component, type, ...rest} = this.props;
        let account = JSONParse(cookies.getItem(consts.USER))
        // 没登录过 或者 登陆过，则判断用户是否允许进入该路由
        let status = account && "valid";
        if (!account || (type && account.type !== type)) {
            status = 'ban';
        }
        if(account&&account.type ==='*'){
            status = 'valid';
        }
        return <Route {...rest} render={props => {
            return (
                (this.$isLoading("login") && <Spin/>) ||
                (status === 'ban' && <Modal visible={true} footer={null}>{this.$f("permission.ban.view")} <Link
                    to="/other">{this.$f("other")}</Link></Modal>) ||
                (status === 'valid' && <Component {...props}/>) ||
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            )
        }}/>

    }
}


export default AuthRoute;