import React from 'react';
import {Select,Input} from 'antd'

const
    Option = Select.Option;

class EditCell extends React.Component {

    render() {
        let { editable, children:value} = this.props;
        return (
            <div>
                {
                    editable ? <Input {...this.props}/> : value
                }
            </div>
        )
    }
}

export default EditCell