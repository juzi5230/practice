# flutter知识点总结

## SizedBox

+ 使用场景

  + 一般是用来限制孩子控件的大小

  + 还有这么一种场景也可以使用SizeBox，就是可以代替padding和container，然后 用来设置两个控件之间的间距，比如在行或列中就可以设置两个控件之间的间距 主要是可以比使用一个padding或者container简单方便 （在Flutter中可能用不同的控件可以实现到相同的目的，尽量使用越简单的widget来实现）

## path_provider.dart

使用 path_provider.dart 库之前，需要先在 pubspec.yaml 文件的 dependencies: 中添加如下依赖：

```javascript
path_provider: ^0.5.0+1
```

在项目需要的文件中引入

```javascript
import 'package:path_providerpath_provider.dart';
```

path_provider.dart 库屏蔽了 Android 和 iOS 两个平台上文件存储路径的差异。path_provider.dart 库主要提供了如下几个方法用于获取存储路径：

+ getTemporaryDirectory()：获取临时文件夹，针对于 Android 设备 getCacheDir() 和 iOS 设备 NSTemporaryDirectory() 返回的值

+ getApplicationDocumentsDirectory()：获取 Document 文件夹，针对 Android 设备的 AppDate 目录，iOS 设备的 NSDocumentDirectory 目录

+ getExternalStorageDirectory()： 获取存储卡目录，只有 Android 设备可用
