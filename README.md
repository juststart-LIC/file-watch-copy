## 该服务用于监听文件发生变化后同步到服务器，
比如`webpack`打包之后的文件，我们要部署到服务器测试之类的，我们可能会采用远程服务器复制粘贴的方式部署，或者直接使用自动化部署，可是目前看到的自动化部署大多数都是要推送代码到git仓库的方式，我们一般的内测之类的可以采用该服务进行部署，也可以算自动化部署的一种，只是更轻巧。

### 使用
> 配置fwx.config.js即可,可以监听多个不同的文件，然后上传到不同的服务器，这里要保证`serverUrls`、`watchFile`、`fileSavePath`它们的对应的顺序一致，比如监听的`watchFile`数组中下标为0的文件，会发送到下标为0的`serverUrls`的服务器,并把文件保存在下标为0的`fileSavePath`中的服务器路径中。
```
module.exports = {
  mode: "client-server",
  // 服务器地址
  serverUrls: [
    {
      serverUrl: ""
    }
  ],
  // 监听的文件
  watchFile: [
    {
      path: ""
    }
  ],
  // 服务器保存位置
  fileSavePath: [
    {
      path: ""
    }
  ]
};

```
