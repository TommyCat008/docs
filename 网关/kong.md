```
标题：kong的相关能力学习
作者：张亚奇
时间：2019年12月10日
```

#### 创建一个服务

```shell
curl -i -X POST \
--url http://localhost:8001/services/ \
--data 'name=example-service' \
--data 'url=http://mockbin.org'
```

执行完之后得到如下的结果
```json
HTTP/1.1 201 Created
Content-Type: application/json
Connection: keep-alive

{
   "host":"mockbin.org",
   "created_at":1519130509,
   "connect_timeout":60000,
   "id":"92956672-f5ea-4e9a-b096-667bf55bc40c",
   "protocol":"http",
   "name":"example-service",
   "read_timeout":60000,
   "port":80,
   "path":null,
   "updated_at":1519130509,
   "retries":5,
   "write_timeout":60000
}
```

#### 给服务添加路由

```shell
curl -i -X POST \
--url http://localhost:8001/services/example-service/routes \
--data 'hosts[]=example.com'
```
执行结果
```json
HTTP/1.1 201 Created
Content-Type: application/json
Connection: keep-alive

{
   "created_at":1519131139,
   "strip_path":true,
   "hosts":[
      "example.com"
   ],
   "preserve_host":false,
   "regex_priority":0,
   "updated_at":1519131139,
   "paths":null,
   "service":{
      "id":"79d7ee6e-9fc7-4b95-aa3b-61d2e17e7516"
   },
   "methods":null,
   "protocols":[
      "http",
      "https"
   ],
   "id":"f9ce2ed7-c06e-4e16-bd5d-3a82daef3f9d"
}
```

#### 通过kong来转发请求

```shell
curl -i -X GET \
--url http://localhost:8000/ \
--header 'Host: example.com'
```
这个请求是来测试是否可以请求到资源


==以上操作可以通过konga来配置的，官方文档kong只是给出了命令行的创建方式，上诉命令执行完成之后可以在konga中查看services和routes会发现已经为其添加了配置项。==

#### 重新配置route的内容（给路由添加具体的地址）

1、选中routes，查找到当前的所有的路由；
2、选中ID查看当前的路由的配置项；
3、新加Paths内容，==注意此处填写的内容也即是需要访问的地址==
4、在Methods处设置请求的方法。GET/POST/PUT/DELETE
5、在postman里访问请求，例如已经添加好的path(/api/test)，通过GET请求地址localhost:8000/api/test，注意的是需要设置header中的host为你的route里面的host。

#### JWT插件的使用

JWT的作用是为api加入身份验证的功能，这样暴露出来的route就不会被随意访问了。

1、创建一个新的服务
```shell
curl -i -X POST \
--url http://localhost:8001/services/ \
--data 'name=service-jwt' \
--data 'url=http://www.baidu.com'

# 查询插件列表
curl -X GET localhost:8001/services/service-jwt/plugins

#开启jwt插件
curl -X POST localhost:8001/services/service-jwt/plugins \
-d "name=jwt"

#查看jwt插件 此命令无法访问到内容
curl -X GET localhost:8001/services/service-jwt/plugins/jwt
# 此命令可以访问当前服务下添加的plugins
curl -X GET localhost:8001/services/service-jwt/plugins

#删除jwt插件
curl -X DELETE localhost:8001/services/service-jwt/plugins/{jwt.id}
```

2、创建路由
```shell
curl -X POST localhost:8001/services/service-jwt/routes \
-d "name=route.jwt" \
-d "paths[]=/api/jwt"
```

3、创建用户
```shell
curl -i -X POST \
--url http://localhost:8001/consumers/  \
--data "username=zhangyaqiJWT"
```

4、用户生成JWT
```shell
# post方式获取jwt凭证
curl -X POST localhost:8001/consumers/zhangyaqiJWT/jwt \
-d "algorithm=HS256" \
-d "secret=uFLMFeKPPL525ppKrqmUiT2rlvkpLc9u"
# 用户在创建jwt的时候，可以查询到相关的jwt的内容。

# get方式获取jwt凭证
curl localhost:8001/consumers/zhangyaqiJWT/jwt


# 查看当前用户的凭证
curl -X GET localhost:8001/consumers/zhangyaqiJWT/jwt

# 删除添加的用户凭证
curl -X DELETE localhost:8001/consumers/zhangyaqiJWT/jwt/{id}
```
==此步骤在执行完成之后需要拿到key和secret这两个字段的值==

5、生成token

需要使用key和secret访问 https://jwt.io/ 来生成token凭证信息。进入页面之后需要在PAYLOAD填入以下信息。
```json
{
   "iss": "key"
}
```

通过网站获取到token添加到header中，开始请求。

#### oAuth2 用户认证

1. 用户发送用户名和密码到Kong的用户验证api；
1. kong将获取到的用户名和密码转发到用户验证服务器；
1. 用户验证服务器对账号和密码进行验证，如果不对即返回错误信息并关闭验证。如果正确，则将用户账号密码、client_id和client_secret、scope、provision_key、用户ID 发送给 Kong 的OAuth2 接口；
1. kong生成access_token返回给用户验证服务器，并缓存部分信息。
1. 认证服务器将4中收到的access_token返回请求2给Kong，Kong再返回请求1给用户（这个操作没有理解）
1. 用户得到access_token之后，就可以访问有OAuth2验证的接口了。access_token中已隐含了用户ID和scope。

1、创建一个服务并为这个服务添加oauth2插件。此操作是可以在konga上进行图形化操作完成。
```shell
curl -i -X POST \
--url http://localhost:8001/services/ \
--data 'name=service_auth' \
--data 'url=http://baidu.com/api/auth'
```

2、添加一个路由（paths[]的值必须与service_auth服务中的/api/auth一致）使service_auth服务暴露出来以供用户访问，book服务没必要添加多个路由。
```shell
curl -i -X POST \
--url http://localhost:8001/services/service_auth/routes \
--data 'hosts[]=baidu.com' \
--data 'paths[]=/api/auth'
```

3、向服务添加oauth2的插件，此步骤可以在konga上进行操作，但需要注意的是部分设置要开启。可以参照下方的配置去开启。
```shell
curl -i -X POST \
--url http://localhost:8001/services/service_auth/plugins \
--data "name=oauth2"  \
--data "config.scopes=email,phone,address" \
--data "config.mandatory_scope=true" \
--data "config.enable_authorization_code=true"
```

4、添加一个消费者consumer，建议在konga上设置。
```shell
curl -i -X POST \
--url http://localhost:8001/consumers/  \
--data "username=oauth2"
```

5、为消费者oauth2创建一个Credentials>oauth2的应用，回调地址一定要填写。此步骤建议在konga上面执行。查询信息也是可以在konga上查看创建好的具体的详情。

6、向验证服务器发送用户名和密码获取code
```shell
curl -i -X POST \
--url https://localhost:8443/api/auth/oauth2/authorize \
# --header "Authorization: Basic emhhbmd5YXFpOjEyMzQ1Njc=" \
--header 'Host: baidu.com' \
--data "client_id=MVe7etIm9Xn72kFnn65hVqn4ouP5bRET" \
--data "response_type=code" \
--data "scope=email" \
--data "provision_key=CUeVqSoKjluZApLL1RSZSdnaLIjRJxXW" \
--data "authenticated_userid=123" --insecure
# --data "state=xyz"  --insecure

# Authorization 发现没有这个参数也是可以的，所以就不用传这个东西。
# --insecure 允许不使用证书到SSL站点，在本地请求https的地址时，需要此命令。
# client_id 通过查询消费者的oauth2的详情来查询到
# response_type 根据service的plugin查看类型
# provision_key 通过查看service的plugin查询到，在添加oauth2的时候生成的
# authenticated_userid 也就是custom_id的值
# state 表示客户端的当前状态，可以指定任意值，认证服务器会原封不动地返回这个值。
```
==注意：这里之前一直有个问题，执行命令之后无法成功。之后一直调试中间的过程，发现在consumer那里创建oauth2的时候redirect_uris这个配置项没有能成功设置，将此配置项填写完成之后就能获取到code。==

遗留的配置项，没有理解state这个参数的意义是什么，故没有添加这个字段。需要先了解知道这个字段是做什么用的。

7、通过code值获取到token(注意这个code只能用一次，如果请求失败即使不是code的原因也要重新生成一下。)
```shell
curl -i -X POST \
--url https://localhost:8443/api/auth/oauth2/token \
--header "Host: baidu.com" \
--data "grant_type=authorization_code" \
--data "client_id=MVe7etIm9Xn72kFnn65hVqn4ouP5bRET" \
--data "client_secret=WzGHxosmOnLGUNKZeNH4tELH7bK0yA2R" \
--data "code=fLHqdob9B7E0TFOPMWqdRCLExKkY8BDY" --insecure

# client_secret 通过查询消费者的oauth2的详情来查询到
```

```json
// 有效时间是2个小时
{
   "refresh_token": "sbIy3L0iSkGa7nyEaOFiuojVN4GW7rDw",
   "token_type": "bearer",
   "access_token": "gqZXsDSdTaanxjcSwLV5hNqv4eGkNJyg",
   "expires_in":7200
}
```

8、通过拿到access_token来访问资源
```shell
curl -i -X GET \
--url https://localhost:8443/api/auth \
--header "Authorization: Bearer f315CjXmOpIaJAZp8DfgwShgTx2TlL1i" \
--header 'Host: baidu.com' --insecure
```

#### 问题及解决
Q1：通过使用JWT无法验证通过的问题，postman在请求route的时候展示没有权限'Unauthorized'？

A：通过curl来请求kong的接口，创建service、consumer、route等功能，但是在添加plugin的时候没有设置'header names'这个选项。
其主要的作用是识别在请求过程中header中的Authorization。

Q2：在学习oauth2的时候，发现了在通过token去访问资源的时候是没有响应。

A：通过改变host来试，发现是能够进行接口的访问了。

#### 遗留问题


#### 知识补充
```shell
# 显示头信息
curl -i [url]

# 保存当前网页
curl -o [文件名] [url]

# 跳转到新的网址
curl -L [url]

# 发送参数 -d后接以引号的参数
curl -d

# 发送表单信息 GET
curl [url]?data=xxx

# 发送表单信息 POST
curl -X POST --data "data=xxx" [url]

# 发送cookie
curl --cookie "name=xxx" [url]

# 添加头信息header
curl --header "Content-Type:application/json" [url]

# 用户认证
curl --user name:password [url]

```

#### 参考文档：

详细介绍了kong的特性:
https://segmentfault.com/a/1190000020375323?utm_source=tag-newest

通过curl来创建jwt:
https://juejin.im/post/5d09c307e51d4510a73280c4#heading-11

konga有关jwt的图形化教程:
https://blog.csdn.net/hhj724/article/details/103187166

oAuth2的相关配置名称的解释:
https://blog.csdn.net/dragonsmile/article/details/100042337

oauth2的实践:
https://blog.csdn.net/zhengzizhi/article/details/80221977