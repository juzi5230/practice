# 功能比较比较

1、Three.js作为WebGL框架中的佼佼者，由于它的易用性和扩展性，使得它能够满足大部分的开发需求。利用基于web的渲染器创建GPU增强的3d图形和动画.

- Three.js掩盖了3D渲染的细节：Three.js将WebGL原生API的细节抽象化，将3D场景拆解为网格、材质和光源(即它内置了图形编程常用的一些对象种类)。
- 面向对象：开发者可以使用上层的JavaScript对象，而不是仅仅调用JavaScript函数。
- 功能非常丰富：Three.js除了封装了WebGL原始API之外，Three.js还包含了许多实用的内置对象，可以方便地应用于游戏开发、动画制作、幻灯片制作、髙分辨率模型和一些特殊的视觉效果制作。
- 速度很快：Three.js采用了3D图形最佳实践来保证在不失可用性的前提下，保持极高的性能。
- 支持交互：WebGL本身并不提供拾取（picking)功能（即是否知道鼠标正处于某个物体上）。而Three.js则固化了拾取支持，这就使得你可以轻松为你的应用添加交互功能。
- 包含数学库：Three.js拥有一个强大易用的数学库，你可以在其中进行矩阵、投影和矢量运算。
- 内置文件格式支持：你可以使用流行的3D建模软件导出文本格式的文件，然后使用Three.js加载；也可以使用Three.js自己的JSON格式或二进制格式。
- 扩展性很强：为Three.js添加新的特性或进行自定义优化是很容易的事情。如果你需要某个特殊的数据结构，那么只需要封装到Three.js即可。

缺点： Three.js不是游戏引擎，一些游戏相关的功能没有封装在里面，如果需要相关的功能需要进行二次开发

2、与Babylon.js对比

Babylon.JS是最好的JavaScript3D游戏引擎，它能创建专业级三维游戏。主要以游戏开发和易用性为主。与Three.js之间的对比：

- Three.js比较全面，而Babylon.js专注于游戏方面。
- Babylon.js提供了对碰撞检测、场景重力、面向游戏的照相机，Three.js本身不自带，需要依靠引入插件实现。
- 对于WebGL的封装，双方做的各有千秋，Three.js浅一些，好处是易于扩展，易于向更底层学习；Babylon.js深一些，好处是易用扩展难度大一些。
- Three.js的发展是依靠社区推动，出来的比较早，发展比较成熟，Babylon.js是由微软公司在2013推出，文档和社区都比较健全，国内还不怎么火。


# 使用比较

threejs 
- 在国内使用比较广泛，资料多
- 在不用WebGL的情况下允许它使用SVG和HTML5画布元素
- 对 WebGL 进行了封装，将复杂的接口简单化，而且基于面向对象思维
- 缺少一些渲染之外的扩展功能， 比如声音普通控制等
- 加载速度慢、缺少碰撞检测等功能

babylonjs
- 功能较为全面,功能比较丰富、灵活、模型显示不失真
- 中文资料较少
- 同Three.js类似，加载大模型时速度较慢


核心使用：
1. scense 场景的创建
2. 创建相机
3. 灯光
4. 物体、模型创建