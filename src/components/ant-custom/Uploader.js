import { Upload, Icon, message } from 'antd';
import React from "react"
import QiNiu from "../../js/api/QiNiu";

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
        message.error('只能上传 JPG|PNG|JPEG 格式的文件');
    }
    return false
}

class AvatarUploader extends React.Component {
    state = {
        loading: false,
        id:new Date().getTime()/Math.random(),
        uploaded:false
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

    componentDidMount(){
        QiNiu.initUpload(this.state.id,"/api/admin/pub/GetQiniuPictureToken",{
            BeforeUpload:()=>{
                this.setState({
                    loading:true
                })
            }
        }).then((res)=>{
            const onInput = this.props.onInput;
            this.setState({
                url:res,
                uploaded:true,
                loading:false
            })
            onInput&&onInput(res);
        })
    }

    render() {
        const {url,id,uploaded} = this.state;
        const {type = 'image'} = this.props;

       //<div id={id}>
       //    <Icon style={{
       //        border:"1px solid #e4e4e4",
       //        width:100,
       //        lineHeight:"100px"
       //    }} type={this.state.loading ? 'loading' : 'plus'} />
       //</div>
        const style={
            border:"1px solid #e4e4e4",
            width:100,
            lineHeight:"100px",
            display:'inline-block',
            height:"100px",
        } ,uploadButton = (
            <div style={{position:"relative"}}>
                <div id={id} style={{
                    border:"1px solid #e4e4e4",
                    width:100,
                    lineHeight:"100px",
                    position:"absolute",
                    left:'0',
                    right:'0',
                    top:'0',
                    bottom:'0',
                    zIndex:uploaded ? -1 : 1
                }}>
                </div>
                <Icon style={style} type={this.state.loading ? 'loading' : 'plus'} />
            </div>
        );
        return (
            <div>{uploaded ? (type==='image'&&<img style={style} src={url} alt="" />|| <a style={style} target="_blank" href={url}><Icon style={style} type={type}/></a>) : uploadButton}</div>
        );
    }
}


export default AvatarUploader