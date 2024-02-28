# docker some tips

- 查看docker 中某个容器的详细信息，比如ip等
```
docker inspect \--format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' -containerName-
eg: docker inspect \--format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' some-nginx
```