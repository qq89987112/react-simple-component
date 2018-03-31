import React from "react"
import {Upload, Icon, message} from 'antd';
import axios from "axios"




export default class DraggerUploadBox extends React.Component {
    state = {
        loading: false,
    };
    handleChange = (info) => {
        let file = info.file;
        const data = file.response;
        if (file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (file.status === 'done') {
            const {onInput,onResponse} = this.props;
            if (data.errCode !== 0) {
                message.error(data.errMsg);
            }else{
                let fileUrl = `${axios.defaults.baseURL || ""}${data.data.fileUrl}`;
                onResponse&&onResponse(data);
                onInput && onInput(fileUrl);
                this.setState({
                    url: fileUrl
                })
            }

            this.setState({
                loading:false
            })
        }
        if (file.status === 'error') {
            message.error(data.errMsg);
            this.setState({
                loading:false
            })
        }
    }

    render() {
        const {url} = this.state;
        const {actionUrl=`${axios.defaults.baseURL || ""}/api/base/UploadFile`,defaultUrl,type = 'image'} = this.props;
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
            <Upload.Dragger
                name="file"
                action={actionUrl}
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
                    <Icon type='inbox'/>
                }
            </Upload.Dragger>
        );
    }
}