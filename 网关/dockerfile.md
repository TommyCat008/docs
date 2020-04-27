##### dockerfile中使用的指令

###### FROM
FROM指令用于指定其后构建新镜像所使用的基础镜像。FROM指令必是Dockerfile文件中的首条命令，启动构建流程后，Docker将会基于该镜像构建新镜像，FROM后的命令也会基于这个基础镜像。

FROM的语法格式为：
```
FROM <image>

FROM <image>:<tag>

FROM <image>:<digest>
```

1. FROM必须是Dockerfile中第一条非注释命令；

1. 在一个Dockerfile文件中创建多个镜像时，FROM可以多次出现。只需在每个新命令FROM之前，记录提交上次的镜像ID；

1. tag或digest是可选的，如果不使用这两个值时，会使用latest版本的基础镜像。


###### RUN
用于在镜像容器中执行命令，其有两种执行方式shell执行以及exec执行方式。

```shell
# shell执行方式，默认即是shell的方式。
RUN <command>

# exec执行
RUN ["executable", "param1", "param2"]

```

###### CMD
CMD用于指定在容器启动时所要执行的命令

```shell
CMD ["executable","param1","param2"]
CMD ["param1","param2"]
CMD command param1 param2

# CMD不同于RUN，CMD用于指定在容器启动时所要执行的命令，而RUN用于指定镜像构建时所要执行的命令。

docker run -t -i itbilu/static_web_server /bin/true
# 等价于：
cmd ["/bin/true"]
```

==CMD在Dockerfile文件中仅可指定一次，指定多次时，会覆盖前的指令。另外，docker run命令也会覆盖Dockerfile中CMD命令。如果docker run运行容器时，使用了Dockerfile中CMD相同的命令，就会覆盖Dockerfile中的CMD命令。==

###### ENTRYPOINT
ENTRYPOINT用于给容器配置一个可执行程序。也就是说，每次使用镜像创建容器时，通过ENTRYPOINT指定的程序都会被设置为默认程序。ENTRYPOINT有以下两种形式：
```shell
ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2
```

ENTRYPOINT与CMD非常类似，不同的是通过docker run执行的命令不会覆盖ENTRYPOINT，而docker run命令中指定的任何参数，都会被当做参数再次传递给ENTRYPOINT。Dockerfile中只允许有一个ENTRYPOINT命令，多指定时会覆盖前面的设置，而只执行最后的ENTRYPOINT指令。

###### LABEL
用于为镜像添加元数据，元数以键值对的形式指定。

```shell
LABEL <key>=<value> <key>=<value> <key>=<value> ...

# eg
LABEL version="1.0" description="这是一个Web服务器" by="IT笔录"
```

###### EXPOSE
用于指定容器在运行时监听的端口

```shell
EXPOSE <port> [<port>...]
```
EXPOSE并不会让容器的端口访问到主机。要使其可访问，需要在docker run运行容器时通过-p来发布这些端口，或通过-P参数来发布EXPOSE导出的所有端口。

###### ENV
用于设置环境变量，其有以下两种设置形式。
```
ENV <key> <value>
ENV <key>=<value> ...
```

###### ADD
用于复制构建环境中的文件或目录到镜像中。其有以下两种使用方式
```shell
ADD <src>... <dest>
ADD ["<src>",... "<dest>"]

# eg
ADD http://wordpress.org/latest.zip $ITBILU_PATH

```

###### COPY
用于复制构建环境中的文件或目录到镜像中。其有以下两种使用方式：
```shell
COPY <src>... <dest>
COPY ["<src>",... "<dest>"]

```

###### VOLUME
用于创建挂载点，即向基于所构建镜像创始的容器添加卷。
```shell
VOLUME ["/data"]
```

###### USER
指定运行镜像所使用的用户
```shell
USER user
USER user:group
USER uid
USER uid:gid
USER user:gid
USER uid:group
```
使用USER指定用户后，Dockerfile中其后的命令RUN、CMD、ENTRYPOINT都将使用该用户。镜像构建完成后，通过docker run运行容器时，可以通过-u参数来覆盖所指定的用户。

###### WORKDIR
用于在容器内设置一个工作目录
```shell
WORKDIR /path/to/workdir
```
通过WORKDIR设置工作目录后，Dockerfile中其后的命令RUN、CMD、ENTRYPOINT、ADD、COPY等命令都会在该目录下执行。

###### ARG
用于指定传递给构建运行时的变量
```shell
ARG <name>[=<default value>]
```