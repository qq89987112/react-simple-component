import React from 'react';
import {Select,Input} from 'antd'

const
    Option = Select.Option;



export default class SelectWrapper extends React.Component {

    state = {
        list:undefined
    }

    componentWillMount(){
        const { request } = this.props;
        request&&request().then(list=>{
            this.setState({
                list
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
            <Select style={{ width: 120 }} onChange={this.onChange} {...rest}>
                {
                    dataSource.map((item,index)=><Option key={index} value={index}>{item[dataIndex]}</Option>)
                }
            </Select>
        )
    }
}