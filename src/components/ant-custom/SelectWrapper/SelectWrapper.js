import React from 'react';
import {Select,Input} from 'antd'
import BaseComponent from "./BaseAntPage";

const
    Option = Select.Option;



export default class SelectWrapper extends BaseComponent {

    state = {
        list:undefined
    }

    componentWillMount(){
        //判断是否有dataSource 和 request 来选择性loaded
        let { request,defaultValue,keyIndex } = this.props;
        request&&request().then(list=>{
            if(defaultValue&&keyIndex){
                const value = list.find(item=>item[keyIndex]===defaultValue);
                defaultValue = list.indexOf(value);
                defaultValue = defaultValue===-1 ? undefined :defaultValue;
            }else{
                defaultValue = undefined
            }


            this.setState({
                list,
                defaultValue,
                loaded:true
            })
        })
    }

    onChange = (v)=>{
        let {onChange} = this.props;
        onChange&&onChange(this.getData()[v]);
    }

    getData = ()=>{
        let { dataSource=[],placeholder,dataIndex } = this.props;
        const { list } = this.state;
        dataSource = list || dataSource || [];
        // return [{[dataIndex]:placeholder||""},...dataSource];
        return [{[dataIndex]:this.$f("nothing")},...dataSource];
    }


    render() {
        let { dataIndex,defaultValue,onChange,value,keyIndex,...rest } = this.props;
        let {loaded,list} = this.state;
        let dataSource = this.getData();

        if (value && keyIndex) {
            const tempValue = list.find(item=>item[keyIndex]===value);
            value = list.indexOf(tempValue);
        }


        return (
            <span>{
                loaded&&<Select defaultValue={this.state.defaultValue} style={{ width: 120 }} value={value} onChange={this.onChange} {...rest}>
                    {
                        dataSource.map((item,index)=><Option title={item[dataIndex]} key={index} value={index}>{item[dataIndex]}</Option>)
                    }
                </Select>
            }</span>

        )
    }
}