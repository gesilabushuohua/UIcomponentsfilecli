文件上传下载命令工具

## 安装
命令行执行，win10 无权限，使用管理员权限执行
```
npm link hello
```

win10 下使用 git 命令行工具执行，或其他 shell | bash 命令行工具
```
hello
```

## 踩坑
npm link 后执行 hello，提示没有该命令
确认用户环境变量 PATH 中 npm 路径 node_global 与 链接后生成的文件路径是否一致，不一致更改环境即可解决