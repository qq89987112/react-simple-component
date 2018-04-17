import React from 'react';
import {Select, Icon,Input} from 'antd'
import BaseComponent from "./BaseAntPage";
import "./SelectWrapper.scss"

const
    Option = Select.Option;


export default class SelectWrapper extends BaseComponent {

    state = {
        list: []
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
        let result;
        //避免 当指定了 dataIndex 且 在onChange拿到的也是dataIndex (一般情况下dataIndex是title,onChange拿到的是id),就会拿到nothing
        if(v===0){
            result= {};
        }else{
            result= this.getData()[v];
        }

        onChange && onChange(result);
    }

    getData = () => {
        let {dataSource = [], placeholder, dataIndex} = this.props;
        const {list} = this.state;
        dataSource = list || dataSource || [];
        // return [{[dataIndex]:placeholder||""},...dataSource];
        return [{[dataIndex]: this.$f("nothing")}, ...dataSource];
    }


    render() {
        let {dataIndex, defaultValue, onChange, value, keyIndex,showClose = false,onClose=()=>{}, ...rest} = this.props;
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
                        dataSource.map((item, index) =>
                            <Option
                                title={item[dataIndex]}
                                key={index}
                                value={index}>

                                {item[dataIndex]}
                                {showClose&&index!==0&&<Icon style={{float:"right"}} type="close-circle-o" onClick={()=>onClose(item,index)} />}
                            </Option>)
                    }
                </Select>
            }</span>

        )
    }
}