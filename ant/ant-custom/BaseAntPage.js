import React from "react";
import {Modal} from 'antd';

class BaseAntPage extends React.Component {


    $onInput = (name) => {
        return (event) => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            // const name = target.name;
            this.setState({
                [name]: value
            });
        }
    }




    // 用于向用户展示友好的提示信息
    $toast = (msg) => {
        // //暂时使用log
        // console.log(msg);

        return new Promise((resolve, rejct) => {
            let modal = Modal.success({
                content: msg,
                onOk: () => {
                    modal.destroy();
                    resolve();
                }
            });
        })
        // setTimeout(() => modal.destroy(), 1000);
    }

    // 用于向用户展示友好的报错
    $toastError = (msg) => {
        // //暂时使用error
        // console.error(msg);


        Modal.error({
            content: msg,
        });
        // setTimeout(() => modal.destroy(), 1000);
    }

    // loading相关
    $load = (name) => {
        let
            __loadings__ = this.state.__loadings__ || new Set(),
            __loaded__ = this.__loaded__ = this.__loaded__ || new Set(),
            names = [].concat(name);
            names.forEach(name=>__loaded__.add(name)&&__loadings__.add(name))

            return this.setState({
                __loadings__: __loadings__
            })
    }

    $isLoaded = (name)=>{
        let
            __loaded__ = this.__loaded__ = this.__loaded__ || new Set(),
            names = [].concat(name);

        return names.every(name=>__loaded__.has(name))
    }

    $cancel = (name) => {
        let
            __loadings__ = this.state.__loadings__ || new Set(),
            names = [].concat(name);

            names.forEach(name=>__loadings__.delete(name));
            return this.setState({
                __loadings__: __loadings__
            })
    }

    // 可以用来做 ant button 的 loading 绑定
    // <Button type='primary' loading={this.$isLoading('submitForget')}>提交</Button>

    $isLoading(name) {
        let __loadings__ = this.state.__loadings__ || new Set();
        return __loadings__.has(name);
    }
}

export default BaseAntPage;