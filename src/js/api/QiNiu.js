import axios from "axios"

export default class QiNiu {
    static initUpload(id,tokenUrl,cb = {}){
        return new Promise((resolve,reject)=>{
            axios.get(tokenUrl).then((token)=>{
                window.Qiniu.uploader({
                    runtimes: 'html5,flash,html4', //上传模式,依次退化
                    browse_button: id+"", //上传选择的点选按钮，**必需**
                    uptoken_func:()=>token.token,
                    domain:token.urlPrefix+"/", //bucket 域名，下载资源时用到，**必需**
                    max_file_size: '100mb', //最大文件体积限制
                    flash_swf_url: 'http://cdn.staticfile.org/plupload/2.1.9/Moxie.swf', //引入flash,相对路径
                    max_retries: 3, //上传失败最大重试次数
                    chunk_size: '4mb', //分块上传时，每片的体积
                    auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    init:Object.assign(cb,{
                        'FileUploaded': function(up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info);
                            var sourceUrl = domain + res.key; //获取上传成功后的文件的Url
                            resolve(sourceUrl);
                        },
                        'Error': function(up, err, errTip) {
                            //上传出错时,处理相关的事情
                            reject(errTip);
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

        })

    }
}