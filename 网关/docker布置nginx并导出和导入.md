### 启动nginx镜像
```shell
docker run -it -p 80:80 nginx
```

### 拷贝容器中的资源到本地，或者拷贝本地的资源到容器中

```shell
docker cp  793f33152806:/etc/nginx/conf.d/default.conf /Users/zhangyaqi31/Desktop

docker cp /Users/zhangyaqi31/Desktop/default.conf 793f33152806:/etc/nginx/conf.d/default.conf 
```

### 拷贝本地资源到容器
```shell
docker cp /Users/zhangyaqi31/nginx/app 793f33152806://usr/share/nginx/html
```

### docker下安装vim
```shell
apt-get update
 
apt-get install vim
```

### 镜像的导出和导入
```shell
docker save -o /Users/zhangyaqi31/nginx.tar nginx

docker load --input /Users/zhangyaqi31/Desktop/nginx.tar
```
### 容器导入和导出
```shell
docker export 793f33152806 > /Users/zhangyaqi31/Desktop/prd.tar

docker import /Users/zhangyaqi31/Desktop/prd.tar prd
```

### 只需要导出容器即可，因为容器中会有添加的静态资源

### 运行导入的容器
```shell
# 运行nginx的内容，后接的内容是docker容器运行的COMMAND
docker run -d -p 80:80 prd nginx -g 'daemon off;'
```

<!-- /docker-entrypoint.sh kong docker-start -->