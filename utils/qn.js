//  导入依赖

let qiniu = require("qiniu")
let exec = require("child_process").exec

// 权限配置

let accessKey = 'your ak'
let secretKey = 'your sk'
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

// 上传配置

let options = {
    scope: "image",
}
let putPolicy = new qiniu.rs.PutPolicy(options)
let uploadToken = putPolicy.uploadToken(mac)

//  上传函数

function upload(path, file) {
    var localFile = path
    var config = new qiniu.conf.Config()
    qiniu.zone.Zone_z2
    var formUploader = new qiniu.form_up.FormUploader(config)
    var putExtra = new qiniu.form_up.PutExtra()
    var key = file
    
    return new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, key, localFile, putExtra, function (err, res,
            info) {

            if (err) {
                reject(err)
            }
            if (info.statusCode==200) {
                let markdown = `![](http://images.xifan.fun/${key})`
                resolve(markdown)
            }
        })
    })
}

module.exports = { upload }