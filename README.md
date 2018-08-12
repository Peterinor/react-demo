webproxy
===============

web proxy with koa @ nodejs


-----------

#### build
requirements:

* node.js 7.x.x+
* python 2.7.x
* msvc (vs 2013+ also ok)

sqlite 3 驱动编译需要 python 2.7

启动:

    npm install
    node index.js


---------------
#### 选型

web fx, koa 2, https://github.com/koajs/koa/blob/master/Readme.md 

view dot template语法

db 用的是sqlite 3, 文件数据库

内存缓存, cache 中间件

orm选择sequelize, 语法参加: https://github.com/sequelize/sequelize/blob/master/docs/models-definition.md 

JavaScript语法/版本推荐ES2017 
