import React from 'react';
import {Select,Input} from 'antd'

const
    Option = Select.Option;



export default class SelectWrapper extends React.Component {

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
        let { dataSource=[] } = this.props;
        const { list } = this.state;
        return dataSource = list || dataSource || [];
    }


    render() {
        let { dataIndex,defaultValue,onChange,...rest } = this.props;
        let {loaded} = this.state;
        let dataSource = this.getData();

        return (
            <span>{
                loaded&&<Select defaultValue={this.state.defaultValue} style={{ width: 120 }} onChange={this.onChange} {...rest}>
                    {
                        dataSource.map((item,index)=><Option key={index} value={index}>{item[dataIndex]}</Option>)
                    }
                </Select>
            }</span>

        )
    }
}