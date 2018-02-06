import React from 'react';
import {Select,Input} from 'antd'
import { AutoComplete } from 'antd';
import axios from 'axios';

const
    Option = Select.Option;

export default class AutoCompleteWrapper extends React.Component {

    handleSearch = (value) => {
        let { onSearch,dataIndex} = this.props;

        onSearch&&onSearch().then(data=>{
            const array = data.map(item=>item[dataIndex]);
            this.setState({
                dataSource:array
            });
        })

    }

    onSelect(key){
        let {onSelect} = this.props;

        onSelect&&onSelect(this.state.dataSource[key]);
    }

    render() {
        // onSearch : return a promise that return array of object
        const { dataSource } = this.state;
        return (
            <AutoComplete
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                style={{ width: 200 }}
            >
                {dataSource.map((item,index) => {
                    return <Option key={index}>{item}</Option>;
                })}
            </AutoComplete>
        )
    }
}