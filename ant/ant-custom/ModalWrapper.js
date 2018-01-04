import React from 'react';
import {Modal} from 'antd'
import ReactDOM from 'react-dom';
import BaseAntPage from "./BaseAntPage";

// 使用方式为
// this.$showModal(({resolve,reject,params,form})=><div></div>).then((result)=>{})
class ModalWrapper extends React.Component {

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

    state = {
        children: undefined,
        visible: false
    }

    static instance;

    static $getInstance = ()=>{
        if(!ModalWrapper.instance){
            let div = document.createElement('div');
            document.body.appendChild(div);
            ModalWrapper.instance = ReactDOM.render(React.createElement(ModalWrapper,{footer:null}), div);
        }
        return ModalWrapper.instance;
    }

    static $close = (...params)=>{
        return ModalWrapper.$getInstance().close(...params);
    }


    static $show = (...params) => {
        return ModalWrapper.$getInstance().show(...params);
    }

    show = (reactNodeFunc, params = {}) => {
        return new Promise((resolve, reject) => {
            this.modalContentFun = ()=>reactNodeFunc({
                resolve,
                reject,
                //params, // showModal时传过来的。 reactNode就跟在show后面.....
                form: {},  // 供modal里的表单使用,方便resolve result,而不是把相关变量放在父组件中。
                instance: this
            });

            this.setState({
                visible: true
            })
        });
    }

    modalContentFun = ()=>{}

    close = (clear = true) => {
        this.setState({
            visible: false
        });
        clear&&(this.modalContentFun = ()=>{});
    }



    render() {
        return (
            <Modal
                {...this.props}
                onCancel={this.close}
                visible={this.state.visible}
            >
                {this.modalContentFun()}
            </Modal>
        )
    }

}


export default ModalWrapper;