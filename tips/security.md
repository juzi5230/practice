# 前端安全问题整理

参考文档： https://juejin.im/post/5eb250f3f265da7bf6742594#heading-2

## 跨站脚本攻击

+ 跨站脚本攻击又名xss(Cross-Site-Scripting). XSS这类安全问题发生的本质原因在于： 浏览器错误的将攻击者提供的用户输入数据当作Javascript脚本给执行了

+ Http-only字段，就是加在cookie身上的一个“护身符”。浏览器存在这种机制，只要cookie中含有Http-only字段，那么任何JavaScript脚本都没有权限读取这条cookie的内容

      HttpOnly
      浏览器禁止页面的Javascript访问带有HttpOnly属性的cookie。（实质解决的是：XSS后的cookie劫持攻击）如今已成为一种“标准”的做法
      
      输入检查（XSS Filter）
      让一些基于特殊字符的攻击失效。（常见的Web漏洞如XSS、SQLInjection等，都要求攻击者构造一些特殊字符）
      
      输出检查
      在变量输出到HTML页面时，使用编码或转义的方式来防御XSS攻击

## csrf

## https

+ HTTPS 是在 HTTP 的基础上，利用 SSL/TLS 加密数据包
+ 两个主要目的：1.对数据加密 2.验证网站服务器身份
+ 在传递过程把对称加密中的密钥用非对称加密的方式去传递

      增加token
      在请求中放入攻击者所不能伪造的信息，并且该信总不存在于cookie之中。鉴于此，系统开发人员可以在HTTP请求中以参数的形式加入一个随机产生的token，并在服务端进行token校验，如果请求中没有token或者token内容不正确，则认为是CSRF攻击而拒绝该请求
      
      通过Referer识别
      根据HTTP协议，在HTTP头中有一个字段叫Referer，它记录了该HTTP请求的来源地址。在通常情况下，访问一个安全受限的页面的请求都来自于同一个网站
      
      网站重要操作增加验证码
      CSRF攻击过程中，用户在不知情的情况下构造了网络请求，添加验证码后，强制用户必须与应用进行交互
