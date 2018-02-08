import React from 'react';
import {Select,Input} from 'antd'

const
    Option = Select.Option;



export default class SelectWrapper extends React.Component {

    state = {
        list:undefined
    }

    componentWillMount(){
        let { request,defaultValue,keyIndex } = this.props;
        request&&request().then(list=>{
            if(defaultValue&&keyIndex){
                const value = list.find(item=>item[keyIndex]===defaultValue);
                defaultValue = list.indexOf(value);
            }


            this.setState({
                list,
                defaultValue
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
        let { dataIndex,onChange,...rest } = this.props;
        let dataSource = this.getData();

        return (
            <Select  style={{ width: 120 }} onChange={this.onChange} {...rest}>
                {
                    dataSource.map((item,index)=><Option key={index} value={index}>{item[dataIndex]}</Option>)
                }
            </Select>
        )
    }
}