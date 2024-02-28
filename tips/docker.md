# docker some tips

- 查看docker 中某个容器的详细信息，比如ip等
```
docker inspect \--format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' -containerName-
eg: docker inspect \--format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' some-nginx
```


# docker 镜像搭建
参考地址： https://blog.51cto.com/u_16213354/9152471
https://juejin.cn/post/6992848354753380389?searchId=20240228151604412A6CD72053DF66421F

1、文件配置
Dockerfile， default.conf
将打包的文件，比如前端dist文件夹和以上配置文件放在同一个目录下
2、构建镜像 build images
docker build -t admin .
3、查看镜像images
docker images
4、启动容器
docker run -d -p 8136:80 --name dooringx-admin admin




## 将本地镜像文件上传至服务器并运行

```
5、 将本地镜像打包压缩 imageName 为本地镜像名称 imgage.zip：将本地镜像打包,生成的文件
docker save -o imgage.zip imageName

6、上传镜像文件至服务器
scp imgage.zip root@192.168.0.0/root/path/


7、导入镜像文件
docker load -i imgage.zip

8、运行镜像文件
docker run -d -p 8136:80 imgage:latest 
```