import axios from "axios"

export default class QiNiu {
    static initUpload(id,tokenUrl,cb = {}){
        return  axios.get(tokenUrl).then((token)=>{
                window.Qiniu.uploader({
                    filters : {
                        mime_types: [
                            // {title: "flv files", extensions: "flv"}, // 限定flv后缀上传格式上传
                            {title: "Video files", extensions: "mp3"}, // 限定flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4后缀格式上传
                            {title: "Image files", extensions: "jpg,gif,png"}, // 限定jpg,gif,png后缀上传
                            // {title: "Zip files", extensions: "zip"} // 限定zip后缀上传
                        ]
                    },
                    runtimes: 'html5,flash,html4', //上传模式,依次退化
                    browse_button: id+"", //上传选择的点选按钮，**必需**
                    uptoken_func:()=>token.token,
                    domain:token.urlPrefix+"/", //bucket 域名，下载资源时用到，**必需**
                    max_file_size: '99999mb', //最大文件体积限制
                    flash_swf_url: 'http://cdn.staticfile.org/plupload/2.1.9/Moxie.swf', //引入flash,相对路径
                    max_retries: 3, //上传失败最大重试次数
                    chunk_size: '4mb', //分块上传时，每片的体积
                    auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    init:Object.assign({},cb,{
                        'FileUploaded': function(up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info);
                            var sourceUrl = domain + res.key; //获取上传成功后的文件的Url
                            let
                                fileUploaded = cb.FileUploaded,
                                promise = Promise.resolve();



                            if (/^audio/i.test(file.type)) {
                                //这个catch为了过拦截器
                                promise = axios.get(`${sourceUrl}?avinfo`).catch(data=>data).then(data=>{
                                    let
                                        value = data.format.duration,
                                        hour = String(Math.floor(value / 3600)).padStart(2, '0'),
                                        min = String(Math.floor(value / 60) % 60).padStart(2, '0'),
                                        sec = String(Math.floor(value % 60)).padStart(2, '0')

                                    return {
                                        duration:value,
                                        durationStr:`${hour}:${min}:${sec}`
                                    }
                                })

                            }
                            promise.then((data={})=>{
                                fileUploaded&&fileUploaded(sourceUrl,Object.assign({
                                        up, file, info
                                },data));
                            })
                        },
                        'Error': function(up, err, errTip) {
                            //上传出错时,处理相关的事情
                            let error = cb.error;
                            error&&error(up, err, errTip);
                        },
                        'Key': function(up, file) {
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在  unique_names: false , save_key: false 时才生效
                            var fileName = file.name;

                            var key = '';

                            var index1 = fileName.lastIndexOf(".");
                            if (index1 > 0) {
                                var index2 = fileName.length;
                                var houzui = fileName.substring(index1, index2);//后缀名

                                key = "pc_" + (new Date().getTime()) + houzui;
                            }
                            else {
                                key = "pc_" + (new Date().getTime());
                            }

                            return key
                        }
                    })
                });
            })

    }
}