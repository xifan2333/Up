## Up 图片上传工具

![2018-10-19_13-47.png](https://i.loli.net/2018/10/19/5bc97016dcdd4.png)

### 功能

复制上传图片到七牛云，并返回 markdown 形式文本到剪贴板

### 依赖

- xclip
- node

### 安装


```bash
git clone 
cd Up
npm install
npm link
```

### 使用

修改 `utils/qn.js` 中如下代码处为自己的配置。

```JavaScirpt
let accessKey = 'your ak'
let secretKey = 'your sk'
```
截图后在窗口粘贴上传即可。






