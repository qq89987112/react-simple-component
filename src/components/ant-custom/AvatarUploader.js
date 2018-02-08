import { Upload, Icon, message } from 'antd';
import React from "react"

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    if (/image\/(jpeg|jpg|png|bmp)/.test(file.type)) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (isLt2M) {
            return true;
        }else{
            message.error('Image must smaller than 2MB!');
        }
    }else{
        message.error('please upload JPG|PNG|JPEG ');
    }
    return false
}
// props limit:num
class AvatarUploader extends React.Component {
    state = {
        loading: false,
    };
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                accept="image/jpeg,image/jpg,image/png"
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                style={{maxWidth:125,maxHeight:125}}
            >
                {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
            </Upload>
        );
    }
}


export default AvatarUploader