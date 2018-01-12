import React from 'react';
import {Table} from 'antd';
import './App.css';
import common from "../js/api/common";
import TableComponent from "../components/TableComponent";

class App extends TableComponent {
    componentWillMount() {
        const tableUtils = this.tableUtils;
        tableUtils.wrapApi(common.table,"users")
    }

    render() {
        return (
            <div>
                <Table
                    columns={[
                        {title:'姓名',dataIndex:"a"},
                        {title:'年龄',dataIndex:"a"},
                    ]}
                    dataSource={this.state.users}
                    loading={this.$isLoading("users")}
                    pagination={this.state.usersPagi}
                />
            </div>
        );
    }
}

export default App;
