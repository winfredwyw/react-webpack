
## 技术选型
* react——前端渲染视图、虚拟dom、组件化
* redux——单向数据流
* react-router——前端路由
* es6——模块化
* sass——CSS预处理器，使得CSS的开发，变得简单和可维护
* webpack——模块化管理和打包

## 优势
* SPA
* 模块化
* 组件化

## 目录结构 ##
```
|--spa  spa开发代码
|--bin  配置文件（包括webpack）
|--build  打包代码
|--server  服务器
|--mpa  多页面开发代码
|--lib  项目辅助函数库
|--source 项目依赖的资源（不会经过webpack打包的，放在该文件夹会自动复制到build下面）
|--package.json  npm配置文件
|--README.md  项目说明
```

## 开发路由

### spa

```
/mob/*(*代表前端路由)
```

### mpa

```
/m/mpa下面文件夹名
```

#### 样式约定
```
页面样式以page开头，如：订单详情————page-order-detail
组件样式以c开头，如：评价项展示组件————c-comment
```


## 项目命令

```
1、nom run dev
    开启本地开发环境，会开一个本地服务器，模拟服务环境，方便本地开发
2、npm run build
    打包上线代码
3、npm run build-show
    打包上线代码，并生成分析文件stats.json
4、npm run debug
    开启debug模式，监听开发代码，并随时生成上线代码
```
