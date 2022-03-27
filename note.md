# 爬山笔记

## commander option 定义
option('-n, --name <items1> [items2]', 'name description', 'default value')

1. 自定义标签 <必须>，分为长短标签，中间用逗号、竖线或者空格分隔；标签后面可跟必须参数或可选参数，前者用 <> 包含，后者用 [] 包含
2. 


## 使用 api 访问 github
* 个人所有 repo [https://api.github.com/users/用户名/repos]
* repo 详细信息 [https://api.github.com/repos/用户名/仓库名]
* 获取内容列表（只返回根目录内容）[https://api.github.com/repos/用户名/gists/contents/目录名]
* 获取 repo 子目录内容列表 [https://api.github.com/repos/用户名/gists/contents/目录名]，需要完全遵循源文件的大小写，需要获取更深层内容，则在链接列按照顺序逐级写上目录名称
* 获取 repo 中某个文件信息 [https://api.github.com/repos/用户名/gists/contents/文件路径]，
* 获取某文件的原始内容 [https://raw.githubusercontent.com/用户名/仓库名/分支名/文件路径]，或者通过上面文件信息中提取 [download_url] 链接

## cross-spawn 定义命令
```javascript
const spawn = require('cross-spawn');
const chalk = require('chalk');

const dependencies = ['vue', 'vuex', 'vue-router'];
const child = spawn('npm', ['install', '-D'].concat(dependencies), { stdio: 'inherit' });

// 监听执行结果
child.on('close', function(code) {
  // 执行失败
  if(code!==0) {
    console.log(chalk.red('Error occurred while installing dependencies!'));
    process.exit(1);
  } else { // 执行成功
    console.log(chalk.cyan('Install finished'));
  }
})
```

## 相关脚手架工具库
* commander 命令行自定义指令
* inquirer 命令行询问用户问题，记录回答结果
* chalk 控制台输出内容样式美化
* ora 控制台 loading 样式
* figlet 控制台打印 logo
* easy-table 控制台输出表格
* download-git-repo 下载远程模板
* fs-extra 系统 fs 模块扩展，体更更多便利的 API，并继承 fs 模块 API
* cross-spawn 支持跨平台调用系统上命令

## 怎样解决 webpack 

## 参考
[https://juejin.cn/post/6966119324478079007]
[https://segmentfault.com/a/1190000015144126]