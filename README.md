## 项目介绍 ##
> 基于webpack的react/es6开发环境

## 目录结构 ##
```
|--bin  配置文件（包括webpack）
|--build  打包代码
|--server  服务器
|--src  开发代码
|--package.json  npm配置文件
|--README.md  项目说明
```

## start ##
```
启动开发服务
npm run dev-server
启动预览服务
npm run build-server
打包正式代码
npm run build
```

## 开发说明 ##
* 样式只能使用scss文件开发
* 任何文件只有被引用才会进入打包loader
