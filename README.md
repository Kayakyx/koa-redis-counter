# docker-compose.yml 部署一个 计数器服务

> 根目录的 counter_1.2.tar.gz 文件是个空的, 不可直接使用(文件超100M了上传不到仓库了) 。
> 
> 请根据下文的介绍自行构建。

访问 `/hello` 就会通过 `redis` 计数, 并返回访问次数

## 部署

### 构建本地镜像

构建一个  [镜像名]:[版本] counter:1.2; docker build 有一个 --output 选项可以直接生成，
详见：[docker build](https://docs.docker.com/engine/reference/commandline/build/)
```shell

docker build -t counter:1.2 .

# 查看镜像是否构建成功
docker images

# 将镜像保持到本地
docker save -o ./counter_1.2.tar.gz counter:1.2

```

将 `docker 镜像` 和 `docker-compose.yml` 上传到服务器
```shell
scp ./counter_1.2.tar.gz root@服务器IP:/you_path/counter_1.2.tar.gz

scp ./docker-compose.yml root@服务器IP:/you_path/docker-compose.yml
```

### 服务器加载镜像
需要再 你存放 `counter_1.2.tar.gz` 和 `docker-compose.yml` 文件夹下
```shell
docker load -i counter_1.2.tar.gz
```

### 运行
```shell
docker-compose up
# 或后台运行
docker-compose up -d
```

### 访问测试
```shell
curl localhost:8080/hello
```

每次数量都会加 1

附：

如果想进入刚刚运行中的容器 (并重新分配一个命令行终端)
```shell
docker exec -it counter:1.2 /bin/sh
```

如果想进入刚刚运行中的容器 (并使用原来的命令行终端)

```shell
docker attach 容器ID
```

