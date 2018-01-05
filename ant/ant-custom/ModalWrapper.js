import React from 'react';
import {Modal} from 'antd'
import ReactDOM from 'react-dom';
import BaseAntPage from "./BaseAntPage";

// 使用方式为
// this.$showModal(({resolve,reject,params,form})=><div></div>).then((result)=>{})
class ModalWrapper extends BaseAntPage {

    state = {
        children: undefined,
        visible: false
    }

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

    static $showNew = (...params)=>{
        return ModalWrapper.$new().show(...params);
    }

    static $show = (...params) => {
        return ModalWrapper.$getInstance().show(...params);
    }

    show = (reactNodeFunc, params = {}) => {
        return new Promise((resolve, reject) => {
            this.modalContentFun = () => reactNodeFunc({
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

    modalContentFun = () => {
    }

    close = ({destory = false, clear = true} = {}) => {
        this.setState({
            visible: false
        });
        clear && (this.modalContentFun = () => {});

        if(destory){
            let div = this.__div__;

            const unmountResult = ReactDOM.unmountComponentAtNode(div);
            if (unmountResult && div.parentNode) {
                div.parentNode.removeChild(div);
                if(ModalWrapper.instance === this){
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
                {this.modalContentFun()}
            </Modal>
        )
    }

}


export default ModalWrapper;