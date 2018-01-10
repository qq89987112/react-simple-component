import React from "react";
import {Modal} from 'antd';
import ApiUtils from "../../js/api/Utils";
import {FormattedMessage } from 'react-intl';

class BaseAntPage extends React.Component {

    state = {}
    page = 10
    apiUtils = new ApiUtils(this)


    $f = (id,defaultMessage='')=>{
    // export 时,
    return <FormattedMessage id={id} defaultMessage={defaultMessage} />;
}

// 当使用ModalWrapper打开、且封装成组件时，将获取不到context里的intl所需内容，需要通过props把$2提供出来。
// 可以尽量不抽取出组件
$f2 = (id,defaultMessage='')=>{
    // import PropTypes from "prop-types"
    // import { injectIntl } from 'react-intl';
    //  static propTypes = {
    //     intl: PropTypes.object.isRequired,
    // }
    // export default injectIntl(ProjectManager);
    return this.props.intl.formatMessage({id,defaultMessage});
}


//form表单相关
__form_value__ = {}
$onInput = (name, realTime) => {
    const type = Object.prototype.toString.call(name);
    switch (type) {
        case "[object String]":
            return (event) => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            // const name = target.name;
            this.$setInputValue(name, value, realTime)
        }
        case "[object Function]":
            return (event) => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            // const name = target.name;
            name(value)
        }
            break;
        default:
            break;
    }

}

$getInputValue = (name, realTime) => {
    const
        names = [].concat(name),
        form = realTime ? this.state : this.__form_value__;
    if (name) {
        return names.reduce((prev,name) => form[name]&&(prev[name] = form[name]),{})
    }
    else {
        return form;
    }
}


$setInputValue = (name, value, realTime) => {
    if (realTime) {
        this.setState({
            [name]: value
        });
    } else {
        this.__form_value__[name] = value;
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
    names.forEach(name => __loaded__.add(name) && __loadings__.add(name))

    return this.setState({
        __loadings__: __loadings__
    })
}

$isLoaded = (name) => {
    let
        __loaded__ = this.__loaded__ = this.__loaded__ || new Set(),
        names = [].concat(name);

    return names.every(name => __loaded__.has(name))
}

$cancel = (name) => {
    let
        __loadings__ = this.state.__loadings__ || new Set(),
        names = [].concat(name);

    names.forEach(name => __loadings__.delete(name));
    return this.setState({
        __loadings__: __loadings__
    })
}

// 可以用来做 ant button 的 loading 绑定
// <Button type='primary' loading={this.$isLoading('submitForget')}>{this.$f("submit")}</Button>

$isLoading(name) {
    let
        __loadings__ = this.state.__loadings__ || new Set(),
        names = [].concat(name);

    return names.every(name => __loadings__.has(name));
}
}

export default BaseAntPage;