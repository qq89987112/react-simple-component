import React from 'react';
import { Upload, Icon, message } from 'antd';
import BaseComponent from "./ant-custom/BaseAntPage";
const Dragger = Upload.Dragger;



class UploadBox extends BaseComponent {

    render() {
        const {onResult} = this.props;
        const props = {
            name: 'file',
            multiple: true,
            action: this.props.url,
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    // message.success(`${info.file.name} file uploaded successfully.`);
                    onResult&&onResult(info);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到这个区域</p>
            </Dragger>
        )
    }
}

export default UploadBox