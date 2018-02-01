import {Upload, Icon, message} from 'antd';
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
        } else {
            message.error('Image must smaller than 2MB!');
        }
    } else {
        message.error('只能上传 JPG|PNG|JPEG 格式的文件');
    }
    return false
}

class AvatarUploader extends React.Component {
    state = {
        loading: false,
        id: new Date().getTime() / Math.random(),
        uploaded: false
    };


    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
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

    componentDidMount() {
        this.initUpload();
    }

    initUpload(){
        const {
            onFileSelect = () => {
            }
        } = this.props;
        QiNiu.initUpload(this.state.id, "/api/admin/pub/GetQiniuPictureToken", {
            FileUploaded:(res)=>{
                const onInput = this.props.onInput;
                this.setState({
                    url: res,
                    loading: false
                })
                onInput && onInput(res);
            },
            BeforeUpload: (up, file) => {
                if (/^audio/i.test(file.type)) {
                    const audio = document.createElement("audio");
                    audio.src = window.createObjectURL && window.createObjectURL(file) || window.URL && window.URL.createObjectURL(file) || window.webkitURL && window.webkitURL.createObjectURL(file);

                    function g() {
                        let value = audio.duration;
                        let
                            hour = String(Math.floor(value / 3600)).padStart(2, '0'),
                            min = String(Math.floor(value / 60) % 60).padStart(2, '0'),
                            sec = String(value % 60).padStart(2, '0');
                        if (isNaN(value)) {
                            requestAnimationFrame(g)
                        } else {
                            onFileSelect({
                                type: file.type,
                                file,
                                duration: {
                                    value,
                                    format: `${hour}时${min}分${sec}秒`
                                }
                            })
                        }
                    }

                    requestAnimationFrame(g);
                }
                this.setState({
                    loading: true
                })
            }
        })
    }

    render() {
        const {url, id} = this.state;
        const {type = 'image', reeligible = true, defaultUrl, addOn} = this.props;

        //<div id={id}>
        //    <Icon style={{
        //        border:"1px solid #e4e4e4",
        //        width:100,
        //        lineHeight:"100px"
        //    }} type={this.state.loading ? 'loading' : 'plus'} />
        //</div>
        const
            style = {
                border: "1px solid #e4e4e4",
                width: 100,
                lineHeight: "100px",
                display: 'inline-block',
                height: "100px",
            };
        let viewUrl = url || defaultUrl, //用于显示的视图url
            content = <div style={{position: "relative"}}>
                {/*如果有视图URL，就显示*/}
                {viewUrl && (
                    <a style={style} target="_blank" href={viewUrl}>
                        {
                            this.state.loading && <Icon style={style} type='loading'/> ||
                            type === 'image' && <img style={style} src={viewUrl} alt=""/> ||
                            <Icon style={style} type="file"/>
                        }
                        {addOn && addOn}
                    </a>)
                }
                <div id={id} style={style}>
                    {/*如果是图片就显示+号否则上传图标*/}
                    <Icon style={style} type={viewUrl ? 'reload':type === 'image' ? 'plus' : 'upload'}/>
                </div>
            </div>;

        return (
            <div>{
                content
            }</div>
        );
    }
}


export default AvatarUploader