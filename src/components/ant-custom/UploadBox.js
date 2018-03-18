import React from "react"
import {Upload, Icon, message} from 'antd';
import axios from "axios"


function beforeUpload(file) {
    return true;
}

export default class UploadBox extends React.Component {
    state = {
        loading: false,
    };
    handleChange = (info) => {
        let file = info.file;
        if (file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (file.status === 'done') {
            const data = file.response;
            const {onInput} = this.props;
            let fileUrl = `${axios.defaults.baseURL || ""}${data.data.fileUrl}`;
            onInput && onInput(fileUrl);
            this.setState({
                url: fileUrl,
                loading:false
            })
        }
    }

    render() {
        const {url} = this.state;
        const {defaultUrl,type = 'image'} = this.props;
        const
            style = {
                border: "1px solid #e4e4e4",
                width: 100,
                lineHeight: "100px",
                display: 'inline-block',
                height: "100px",
            };

        let viewUrl = url || defaultUrl; //用于显示的视图url
        return (
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={`${axios.defaults.baseURL || ""}/api/base/UploadFile`}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {
                    this.state.loading&&<Icon type='loading'/>||
                    // 如果有视图URL，就显示
                    viewUrl && (
                        <div style={style} target="_blank" href={viewUrl}>
                            {
                                this.state.loading && <Icon style={style} type='loading'/> ||
                                type === 'image' && <img style={style} src={viewUrl} alt=""/> ||
                                <Icon style={style} type="file"/>
                            }
                        </div>) ||
                    //没有就上传
                    <Icon type='plus'/>
                }
            </Upload>
        );
    }
}