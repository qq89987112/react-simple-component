import React from "react";
import {Modal} from 'antd';
import ApiUtils from "../js/api/Utils";
import {FormattedMessage} from 'react-intl';

class BaseAntPage extends React.Component {

    state = {}
    page = 10
    apiUtils = new ApiUtils(this)

    // 多语言的语言库制作思路：先分词，然后可能出现频率高的放在前面，然后用 . 拼接分词，然后排序。如 请输入邮箱 = email.placeholder 。这样的好处是结构清晰，想词容易。
    $f = (id, defaultMessage = '') => {
        // import PropTypes from "prop-types"
        // import { injectIntl } from 'react-intl';
        //  static propTypes = {
        //     intl: PropTypes.object.isRequired,
        // }
        // export default injectIntl(ProjectManager);

        //BaseAntPage.$f2 = this.props.intl.formatMessage;
        return BaseAntPage.formatMessage({id, defaultMessage}) || this.props.intl.formatMessage({id, defaultMessage});
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
            return names.reduce((prev, name) => {
                    form[name] && (prev[name] = form[name])
                    return prev
                }, {}
            )
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