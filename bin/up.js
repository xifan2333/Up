#!/usr/bin/env node
// 导入依赖
let chalk = require("chalk")
let fs = require("fs")
let md5 = require("md5")
let moment = require("moment")
let qn = require("../utils/qn")
let exec = require('child_process').exec

//  简化写法

let stdout = process.stdout
let stdin = process.stdin

// 标题

stdout.write(chalk.cyan(
    `
 __  __       ______    
\/_\/\\\/_\/\\     \/_____\/\\   
\\:\\ \\:\\ \\    \\:::_ \\ \\  
 \\:\\ \\:\\ \\    \\:(_) \\ \\ 
  \\:\\ \\:\\ \\    \\: ___\\\/ 
   \\:\\_\\:\\ \\    \\ \\ \\   
    \\_____\\\/     \\_\\\/   
        
        upload pictures to qiniu 
                    图片上传工具
`
)
    +
    `
- ctrl v 上传    - ctrl c 退出 

`
)
stdin.setRawMode(true) //？1
stdin.resume()//？2
stdin.setEncoding('utf-8')

//上传函数

async function up(path, file) {
    let result = await qn.upload(path, file).catch(err => console.log(err))
    exec("echo " +"'"+result+"'"+" | xclip -selection clipboard")
    stdout.write(result+"\n")
}

//监听按键

stdin.on('data', function (key) {

    // 监听 ctrl v \u0016 为其在 utf-8 的编码

    if (key === '\u0016') {
        let file = moment().format("YYYY-MM-DD-hh-mm-ss")+".png"
        let dir = "/tmp/"
        let path = dir + file
        exec(`xclip -selection clipboard -t image/png -o > ${path}`)

        // 监听文件变化，参考 https://segmentfault.com/a/1190000015159683

        let md5Previous = null;
        let fsWait = false;
        fs.watch(dir, (event, file) => {
            if (file) {
                if (fsWait) return
                fsWait = setTimeout(() => {
                    fsWait = false
                }, 20)
                const md5Current = md5(fs.readFileSync(path));
                if (md5Current === md5Previous) {
                    return
                }

                md5Previous = md5Current
                if (fs.statSync(path).size !== 0) {
                    up(path, file)
                }

            }
        })
    }

    //    监听 ctrl c

    if (key === '\u0003') {
        process.exit()
    }

})

