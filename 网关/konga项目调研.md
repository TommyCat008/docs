### 关于konga项目的调研

##### 项目启动问题（FAQ）

###### 1、无法安装node-sass

全局安装node-sass，然后尝试在项目中安装node-sass依赖。

###### 2、启动之后，注册完成后进入主页面，显示空白

打开浏览器debug，发现控制台大量报错提示，angular未定义。说明项目并没有安装angular的依赖包。

在GitHub的项目readme文件中有此问题的解决方案

```javascript
npm run bower-deps
```
but:使用上诉的解决方案并没有真正解决问题，在安装的过程中有个bootstrap.js无法从GitHub上下载，提示ssl没有权限。

以上问题的解决方案：在命令提示行执行如下命令，git config --system http.sslverify false，也即禁止掉ssl的验证。然后重新执行bower-deps命令即可

```javascript
// 如果在安装过程中没有遇到白屏的问题，忽略即可。
```
##### 技术能力需求(不分优先级)

1、前端框架技术angular框架的使用能力

2、grunt打包工具使用能力

3、数据库使用能力MySQL/MongoDB/PostgresSQL

4、sails.js使用能力，文档地址 (https://sailsjs.com/whats-that)

5、chart.js 图表框架使用能力

6、kong源码的修改

##### 本地konga执行过程

1、执行命令npm start来启动项目，项目的过程需要执行node --harmony app.js，也即是启动harmony模式的app.js文件。
harmony模式是支持ES6的语法的一种执行模式。

2、app.js做的事情，app.js中首先是通过dotenv库来读取根目录下的配置文件.env的配置项。接下来需要判断sails、rc这两个模块是否启动，寻找makedb目录下的数据库加载情况，最后通过sails来lift/load当前的项目。
问题遗留，暂时不知道rc是用来做什么事情的。

3、sails启动之后，会根据约定好的文件路径去寻找相应的文件。例如会从config/routes.js文件下去执行路由控制。

4、在routes.js文件中查看到（其中使用的是restful接口），如果触发到了相应的path，则会通过res.view()方法传递相应的文件模板。（在这里需要注意的是./view/layout.ejs文件属于主页面文件，当前app在运行的时候会使用这个文件作为展示页面，其中body部分是根据路由来切换展示。）

5、如何在模板中注入数据？
&nbsp;&nbsp;&nbsp;&nbsp;首先了解需要知道 ./view/layout.ejs和 ./view/homepage.ejs这两个文件的关系。layout作为主要的展示模板，而homepage是属于插入模板会在路由匹配到'/'的时候引入。

6、homepage文件包含了几个组件，左侧的Nav，右侧的主体部分，右侧包含了header，content，footer三个组件部分。

7、如何实现在url上的路由控制？
&nbsp;&nbsp;&nbsp;&nbsp;通过注释掉config/routes.js文件下的内容，然后重新启动项目，发现路由是无法正常工作的。说明此文件生效的时间是在项目启动的时候才会去执行相关路由。sails的路由控制是用来加载html页面的，真正修改url上路由的内容是assets/js/app/app.js在此路径下的判定逻辑。

8、angular是如何控制路由的？
&nbsp;&nbsp;&nbsp;&nbsp;angular是在html页面中被引用的，所以只需要知晓assets/js/app/app.js是如何执行的即可。

#### kong

###### 1、kong的features

1）Analytics: Detailed data analytics to inspect, monitor and visualize your microservices traffic.
分析:详细的数据分析来检查、监视和可视化您的微服务流量。
2）Authentication: An authentication layer to protect your services and ensure only authorized access.
身份验证:一个身份验证层，用于保护您的服务并确保只有经过授权的访问。
3）Logging: Real-time and continuous logging of API request and response data.
日志记录:对API请求和响应数据进行实时和连续的日志记录。
4）Serverless: Deploy serverless functions without the need to restart or redeploy Kong.
无服务器:部署无服务器功能，不需要重新启动或重新部署Kong。
5）Traffic Control: Granular control over inbound and outbound API traffic, including the ability to throttle and restrict traffic as required.
流量控制:对入站和出站API流量的细粒度控制，包括根据需要控制和限制流量的能力。
6）Transformations: Handle request and response data transformations on the fly.
转换:动态地处理请求和响应数据转换。

###### 2、kong的端口

8000：监听来自客户端的HTTP流量，转发到你的upstream服务上。
8443：监听HTTPS的流量，功能跟8000一样。可以通过配置文件禁止。
8001：Kong的HTTP监听的API管理接口。
8444：Kong的HTTPS监听的API管理接口。

###### 3、kong的执行流程
加入kong后，每个客户端对API的请求将首先到达Kong，然后被代理到最终API，在请求和响应之间，Kong将执行任何已安装的插件，扩展API功能集，Kong有效的成为每个API的入口点。

#### 启动docker，在docker中运行kong/postgreSQL/konga

1、本机安装docker。。。。。安装镜像有点慢。

```json
docker-machine create --engine-registry-mirror=https://gdufzd4z.mirror.aliyuncs.com -d virtualbox default
```
可以使用当前命令来创建阿里的镜像服务，方便快速下载镜像包。

2、创建一个网络容器
```json
docker network create kong-net
```

3、安装数据库postgres:9.6
```json
docker run -d --name kong-database \
--network=kong-net \
-p 5432:5432 \
-e "POSTGRES_USER=kong" \
-e "POSTGRES_DB=kong" \
postgres:9.6
```
4、准备数据库
```json
docker run --rm \
--network=kong-net \
-e "KONG_DATABASE=postgres" \
-e "KONG_PG_HOST=kong-database" \
-e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" \
kong:latest kong migrations bootstrap
```
5、下载并启动kong
```json
docker run -d --name kong \
--network=kong-net \
-e "KONG_DATABASE=postgres" \
-e "KONG_PG_HOST=kong-database" \
-e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" \
-e "KONG_PROXY_ACCESS_LOG=/dev/stdout" \
-e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" \
-e "KONG_PROXY_ERROR_LOG=/dev/stderr" \
-e "KONG_ADMIN_ERROR_LOG=/dev/stderr" \
-e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" \
-p 8000:8000 \
-p 8443:8443 \
-p 8001:8001 \
-p 8444:8444 \
kong:latest
```
6、测试是否启动成功
```json
curl -i http://localhost:8001/
```
此处有个问题，之前设置了docker的国内镜像，创建了一个default machine，然后访问localhost地址的时候就无法访问。

解决方案：
1)首先查到default的IP地址
```
docker-machine ip default
```
2)查到IP地址之后可以尝试访问
```
curl -i http://$(docker-machine ip default):8001/
```
7、下载ui管理 konga，并且连接数据库(目前认为这个步骤可以不用，直接使用docker pull pantsel/konga即可。)

```json
docker run --rm \
--network=kong-net \
pantsel/konga -c prepare -a postgres -u postgresql://kong@kong-database:5432/konga_db
```

8、启动konga
```json
docker run -d --name konga \
-p 1337:1337 \
--network=kong-net \
-e "DB_ADAPTER=postgres" \
-e "DB_HOST=kong-database" \
-e "DB_USER=kong" \
-e "DB_DATABASE=konga_db" \
-e "KONGA_HOOK_TIMEOUT=120000" \
-e "NODE_ENV=production" \
pantsel/konga
```

#### postgresql查询

1、进入docker的数据库容器

```json
docker exec -ti 容器名 bash
// 实例
docker exec -it kong-database bash
```

2、进入数据库

```
su postgres
```

3、指定用户和DB
```shell
psql DB 用户名
# 进入用户为kong的kong数据库
psql kong kong

# 进入用户为kong的konga_db数据库
psql konga_db kong
```

4、常用的psql命令

```javascript
1、\l   // 列出所有的数据库
2、\dt  // 列出当前数据库下的所有表
3、\c 数据库 用户 // 切换数据库和用户，如果后面不跟数据库和用户，则会显示当前的连接信息
4、\q // 退出数据库的连接
5、支持写入sql语句
```

#### konga的菜单
1、Dashboard：仪表盘显示有关当前连接的Kong实例，基础数据库和可用插件的基本信息。

2、Snapshots：快照功能可以做到跨节点备份，恢复和移动Kong配置。

3、API Gateway：创建连接之后才能展示的相关菜单

#### sails的内容

1、sails是内置express的框架，如果对express比较熟悉的话，上手会比较快的。

<!-- 现在主要介绍一下一些常用的库 -->
2、unirest 是一种http的客户端库。
具体的使用方法：https://blog.csdn.net/bigbigsman/article/details/90707669


#### konga项目的调试体验
1、项目未配置热更新
2、缓存严重，查看到页面的缓存设置是public, max-age=31536000，脚本文件没有设置缓存。

参考文档：

sails的创建以及各个文件夹的主要作用：
http://yijiebuyi.com/blog/a965928843dd3fbedeaa6e64d4e19589.html

kong的官方文档：
https://konghq.com/learning-center/api-gateway/

kong和postgreSQL配置文档: 
https://docs.konghq.com/install/docker/?_ga=2.10537140.126994872.1575560710-160319642.1575560710

konga的使用手册：
https://blog.csdn.net/u011142688/article/details/89841773

