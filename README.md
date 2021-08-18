## 介绍

- SVGO是一个跨平台校园投票系统，使用github进行代码更新迭代。有登录模块、活动模块、搜索模块、投票模块、报名模块、权限模块。

- 前端使用Taro+React+TypeScript，依照MVVM结构模式规范代码；设置语言包方便更新文案；将多次用到的业务逻辑进行封装，提高代码复用性；封装Taro.request请求、设置token过期拦截并兼容H5；利用mobx与localstorage把一些获取到的用户信息做页面缓存；运用防抖节流的技术减少服务器压力，运用单例模式、装饰者等设计模式提高页面性能。

- 后端使用nodejs，利用koa搭建项目；使用jsonwebtoken设置token传给前端，防止CSRF攻击，并通过token设计SSO单点登录；采用模块化编程提高代码复用性；以sequelize做ORM，不仅让代码更容易理解，还能防止SQL注入。

## 启动

### 后端

```
#  yarn server
```

### 前端

目前只兼容了h5、weapp、alipay3端

```
#  yarn dev:[端] 具体在package.json
```

## 说明

入口在项目 package.json，服务器入口为了图方便也在那个入口中，下载 node 与项目依赖，后端项目依赖就能跑了。下载 yarn 就用 yarn 跑，没下载也能用 npm 跑。数据库初始化我也写在/test/db-init 里了，方便测试。启动大致顺序是：

1. Github 拉项目，进入项目目录，安装依赖；yarn

2. 进入 server 文件夹，安装依赖。cd ./server && yarn

3. 开两个进程，一个启动服务器，一个启动项目。
   进程 1：yarn server
   进程 2：yarn xx 项目（后缀-win 是 windows 系统，没有就是 ios）

4. get 请求’/test/db-init’（默认配置在./server/config，mysql 要有配置用户与数据库）

   

请求成功后，数据库有 3 个用户：2017210575，2017211444，2017210444。重启服务器就能跑了。



## 待改进

有些基础功能还没有优化，UI 也不太好看。总的来说，通过项目的搭建，我学到了很多。开始用的 ios 系统进行的开发，后面因为个人原因转 window，然后同步代码时入口进不去，结果是 window 打开方式有点区别，就做兼容了。H5 跨域时，如果要用 Taro 的 request api，需要配的接口太麻烦了，所以我封装了针对该项目 h5 版本的 ajax，封装完后感觉还是配 axios 的成本低，不过已经封装好了就算了。

因为我的后端不是很好，所以先写的后台接口。好不容易写得差不多了，结果发现很多判断都没必要放后端，比如判断用户登录，前端没拿到就已经做了处理了，后端写一些接口的时候没注意，也兜底了，只能安慰自己安全性更高了。

之后再往restful API规范靠。
