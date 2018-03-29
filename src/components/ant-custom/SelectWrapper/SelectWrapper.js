import React from 'react';
import {Select, Input} from 'antd'
import BaseComponent from "./BaseAntPage";

const
    Option = Select.Option;


export default class SelectWrapper extends BaseComponent {

    state = {
        list: undefined
    }

    componentWillMount() {
        //判断是否有dataSource 和 request 来选择性loaded
        let {request, defaultValue, keyIndex} = this.props;
        request && request().then(list => {
            if (defaultValue && keyIndex) {
                const value = list.find(item => item[keyIndex] === defaultValue);
                defaultValue = list.indexOf(value);
                // +1是因为多了一个unset选项
                defaultValue = defaultValue === -1 ? undefined : defaultValue + 1;
            } else {
                defaultValue = undefined
            }


            this.setState({
                list,
                defaultValue,
                loaded: true
            })
        })
    }

    onChange = (v) => {
        // 为了避免自己触发的改变还会再次在render里触发。
        this.lastValue = v;
        let {onChange} = this.props;
        onChange && onChange(this.getData()[v]);
    }

    getData = () => {
        let {dataSource = [], placeholder, dataIndex} = this.props;
        const {list} = this.state;
        dataSource = list || dataSource || [];
        // return [{[dataIndex]:placeholder||""},...dataSource];
        return [{[dataIndex]: this.$f("nothing")}, ...dataSource];
    }


    render() {
        let {dataIndex, defaultValue, onChange, value, keyIndex, ...rest} = this.props;
        let {loaded, list} = this.state;
        let dataSource = this.getData();

        if (value && keyIndex) {
            const tempValue = list.find(item => item[keyIndex] === value);
            value = list.indexOf(tempValue);
            // +1是因为多了一个unset选项
            value = value === -1 ? undefined : value + 1;
            //为了监听外部对value变量的更新，及时触发改变。
            if (value !== this.lastValue) {
                this.onChange(value);
                // this.lastValue=value;
            }
        }

        value = JSON.parse(JSON.stringify({value}))


        return (
            <span>{
                loaded && <Select defaultValue={this.state.defaultValue} style={{width: 120}}
                                  onChange={this.onChange} {...{...value, ...rest}}>
                    {
                        dataSource.map((item, index) => <Option title={item[dataIndex]} key={index}
                                                                value={index}>{item[dataIndex]}</Option>)
                    }
                </Select>
            }</span>

        )
    }
}