import React from 'react';
import {Modal} from 'antd'
import ReactDOM from 'react-dom';
import BaseAntPage from "./BaseAntPage";

// 使用方式为
// this.$showModal(({resolve,reject,params,form})=><div></div>).then((result)=>{})
class ModalWrapper extends BaseAntPage {


    static instance;

    static $new = () => {
        let
            div = document.createElement('div'),
            instance;

        document.body.appendChild(div);
        instance = ReactDOM.render(React.createElement(ModalWrapper, {footer: null}), div);
        instance.__div__ = div;
        return instance;
    }

    static $getInstance = () => {
        if (!ModalWrapper.instance) {
            ModalWrapper.instance = ModalWrapper.$new();
        }
        return ModalWrapper.instance;
    }

    static $close = (...params) => {
        return ModalWrapper.$getInstance().close(...params);
    }

    static $showNew = (...params) => {
        return ModalWrapper.$new().show(...params);
    }

    static $show = (...params) => {
        return ModalWrapper.$getInstance().show(...params);
    }

    show = (reactNodeFunc) => {
        return new Promise((resolve, reject) => {
            // 不能保存函数,否则 const orderList = apiUtils.wrapWidthLoading(warehouse.orderList, 'orderList', 'orderList'); 不能在函数里使用,因为render里不能操作state
            // this.modalContentFun = () => reactNodeFunc(....);
            // 如果使用非函数的话,则对instance的setState就没有效果(拿的缓存)。
            let
                type = Object.prototype.toString.call(reactNodeFunc),
                render,
                onShow,
                params = {
                    resolve,
                    reject,
                    //params, // showModal时传过来的。 reactNode就跟在show后面.....
                    // form: {},  // 供modal里的表单使用,方便resolve result,而不是把相关变量放在父组件中。
                    instance: this // from 可以合并到这里
                };;

                if(type==='[object Function]'){
                    render = reactNodeFunc;
                    onShow = ()=>{};
                }else if(type==='[object Object]'){
                    render = reactNodeFunc.render;
                    onShow = reactNodeFunc.onShow || (()=>{});
                }



            onShow(params);
            this.contentRender = ()=>render(params)
            this.setState({
                visible: true
            })
        });
    }

    contentRender = () => {}

    close = ({destory = false, clear = true} = {}) => {
        this.setState({
            visible: false
        });
        clear && (this.contentRender = () => {
        });

        if (destory) {
            let div = this.__div__;

            const unmountResult = ReactDOM.unmountComponentAtNode(div);
            if (unmountResult && div.parentNode) {
                div.parentNode.removeChild(div);
                if (ModalWrapper.instance === this) {
                    ModalWrapper.instance = null;
                }
            }
        }
    }


    render() {
        return (
            <Modal
                {...this.props}
                onCancel={this.close}
                visible={this.state.visible}
            >
                {this.contentRender()}
            </Modal>
        )
    }

}


export default ModalWrapper;