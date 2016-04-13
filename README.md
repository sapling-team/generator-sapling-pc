## generate-sapling-pc

音悦台PC端项目脚手架，项目所使用的工具如下：

> Node version v4.4.1

- webpack
- bower
- npm scripts
- browser-sync

## How use it?

download project

	git clone https://github.com/sapling-team/generator-sapling-pc.git

remove git `origin` and add your project `new origin`

	git remote remove origin
	
	git remote add origin git@github.com:sapling-team/generator-sapling-pc.git
	
	git pull

install global bower
    
    npm install -g bower

execute npm install

	npm install --verbose


we can using npm scripts `start` `dev` `product` `test`

- npm start 启动一个服务器
- npm test 启动mocha进行自动化测试
- npm run dev 启动webpack dev构建环境
- npm run product 启动gulp构建可发布的资源

## tools.js

你可以使用`tools.js`来快速的生成`model`和`view`文件，这样可以避免很多重复性的劳动。

	node tools.js name.view ./app/src/views

## include

在编译期来决定最终呈现什么样的HTML，使用jade的`include`特性来组合你的HTML。

## 模块化

js使用commonjs模块化规范来组织

## 基础库

- jquery
- underscore
- backbone
- base-extend-backbone
- now-extend-modules

阅读[base-extend-backbone API](https://github.com/sapling-team/base-extend-backbone)和[now-extend-modules](https://github.com/sapling-team/now-extend-modules)来熟悉如何使用base扩展和其他通用的函数库。



