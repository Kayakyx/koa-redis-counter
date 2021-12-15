FROM node:16.13.1-alpine3.13

# 拷贝当前目录下所有的文件到 镜像内的 /home/koa-redis-counter 下
# 这里为了方便把 node_modules 可 copy 到了镜像内, 好的做法应该是
# 不拷贝，应该用 RUN "npm install --production" 或 RUN "npm ci --production"
# 在惊醒内 进行 开发依赖下载
COPY . /home/koa-redis-counter

# 生命容器对外暴露 8080 端口
EXPOSE 8080

# 镜像运行是 执行的命令(启动node 服务)
ENTRYPOINT ["node", "/home/kkk-redis-counter/app.js"]
