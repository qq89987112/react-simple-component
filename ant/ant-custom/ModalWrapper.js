import React from 'react';
import {Modal} from 'antd'
import ReactDOM from 'react-dom';

// 使用方式为
// this.$showModal(({resolve,reject,params,form})=><div></div>).then((result)=>{})
class ModalWrapper extends React.Component {
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
            this.setState({
                children: reactNodeFunc({
                    resolve,
                    reject,
                    //params, // showModal时传过来的。 reactNode就跟在show后面.....
                    form: {},  // 供modal里的表单使用,方便resolve result,而不是把相关变量放在父组件中。
                    instance: this
                }),
                visible: true
            })
        });
    }

    close = (clear = true) => {
        this.setState(Object.assign({
            visible: false
        }, clear ? {children: undefined} : {}));
    }



    render() {
        return (
            <Modal
                {...this.props}
                onCancel={this.close}
                visible={this.state.visible}
            >
                {this.state.children}
            </Modal>
        )
    }

}


export default ModalWrapper;