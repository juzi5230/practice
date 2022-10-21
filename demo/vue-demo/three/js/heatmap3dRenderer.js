define([
    'dojo/_base/declare',
    "esri/views/3d/externalRenderers",
    "utils/Intensity"
], function (
    declare,
    externalRenderers,
    Intensity
) {
    var THREE = window.THREE;
    var CANVAS_MAX_SIZE = 2048;
    var WaterRenderer = declare([], {
        constructor: function (view, data, options) {
            this.view = view;
            if (!Array.isArray(data)) {
                this.data = [data];
            } else {
                this.data = data;
            }
            const OPTIONS = {
                interactive: false,
                min: 0,
                max: 100,
                size: 13,
                gradient: {
                    0.25: 'rgb(0,0,255)',
                    0.55: 'rgb(0,255,0)',
                    0.85: 'yellow',
                    1.0: 'rgb(255,0,0)'
                },
                gridScale: 0.5
            }
            this.options = this.extend({}, OPTIONS, options, {
                points: this.data
            });
        },

        setup: function (context) {
            this.renderer = new THREE.WebGLRenderer({
                context: context.gl, // 可用于将渲染器附加到已有的渲染环境(RenderingContext)中
                premultipliedAlpha: false, // renderer是否假设颜色有 premultiplied alpha. 默认为true
            });
            this.renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
            this.renderer.setViewport(0, 0, this.view.width, this.view.height); // 视口大小设置

            // Make sure it does not clear anything before rendering
            this.renderer.autoClear = false;
            this.renderer.autoClearDepth = false;
            this.renderer.autoClearColor = false;
            // this.renderer.autoClearStencil = false;

            // The ArcGIS JS API renders to custom offscreen buffers, and not to the default framebuffers.
            // We have to inject this bit of code into the three.js runtime in order for it to bind those
            // buffers instead of the default ones.
            var originalSetRenderTarget = this.renderer.setRenderTarget.bind(this.renderer);
            this.renderer.setRenderTarget = function (target) {
                originalSetRenderTarget(target);
                if (target == null) {
                    context.bindRenderTarget();
                }
            };
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera();

            const axesHelper = new THREE.AxesHelper(1);
            axesHelper.position.copy(1000000, 100000, 100000);
            this.scene.add(axesHelper);
            
            this._setupScene(context);


        },

        transparentObject: function (geometry, material) {
            var obj = new THREE.Object3D();
            var mesh = new THREE.Mesh(geometry, material);
            mesh.material.side = THREE.BackSide;
            mesh.renderOrder = 0;
            obj.add(mesh)

            var mesh = new THREE.Mesh(geometry, material.clone());
            mesh.material.side = THREE.FrontSide; // front faces
            mesh.renderOrder = 1;
            obj.add(mesh);
            return obj
        },
        _setupScene: function (context) {
            var scope = this;
            let minX = Infinity,
                minY = Infinity,
                maxX = -Infinity,
                maxY = -Infinity;
            const vs = [];
            for (let i = 0, len = scope.data.length; i < len; i++) {
                const {
                    coordinate,
                    lnglat,
                    xy
                } = scope.data[i];
                const coord = coordinate || lnglat || xy;
                if (!coord) {
                    console.warn('not find coordinate');
                    continue;
                }
                const v = scope.coordinateToVector3(coord);

                vs.push(v);
                const {
                    x,
                    y
                } = v;
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }

            let {
                gridScale,
                altitude
            } = scope.options;
            const offsetX = Math.abs(maxX - minX),
                offsetY = Math.abs(maxY - minY);
            const maxOffset = Math.max((offsetX * gridScale), (offsetY * gridScale));
            if (maxOffset > CANVAS_MAX_SIZE) {
                console.warn(`gridScale: ${gridScale} it's too big. I hope it's a smaller value,canvas max size is ${CANVAS_MAX_SIZE}* ${CANVAS_MAX_SIZE}`);
                const offset = maxOffset / gridScale;
                gridScale = CANVAS_MAX_SIZE / offset;
            }
            const canvasWidth = Math.ceil(offsetX * gridScale),
                canvasHeight = Math.ceil(offsetY * gridScale);
            const scaleX = canvasWidth / offsetX,
                scaleY = canvasHeight / offsetY;
            const pixels = [];
            for (let i = 0, len = vs.length; i < len; i++) {
                const v = vs[i];
                v.x -= minX;
                v.y -= minY;
                v.x *= scaleX;
                v.y *= scaleY;
                v.y = canvasHeight - v.y;
                //for heat draw data
                pixels.push({
                    coordinate: [v.x, v.y],
                    count: scope.data[i].count
                });
            }

            let shadowCanvas = this.Canvas(canvasWidth, canvasHeight);
            let shadowContext = shadowCanvas.getContext('2d');
            scope.drawGray(shadowContext, pixels, scope.options);
            const colored = shadowContext.getImageData(0, 0, shadowContext.canvas.width, shadowContext.canvas.height);
            // console.log(shadowCanvas.toDataURL());
            // shadowCanvas.toBlob(function (blob) {

            //     var a = document.createElement("a");
            //     var body = document.getElementsByTagName("body");
            //     document.body.appendChild(a);
            //     a.download = "img" + ".jpg";
            //     a.href = window.URL.createObjectURL(blob);

            //     a.click();
            //     body.removeChild("a");

            // });
            // window.open(
            //     shadowCanvas.toDataURL('image/png'),
            //     "canvasImage",

            //     "left=0;top=0;" +
            //     "width=" + shadowCanvas.width +
            //     ";height=" + shadowCanvas.height +
            //     ";toolbar=0;resizable=0;"
            // )

            let maxAlpha = -Infinity;
            const blackps = {},
                alphas = [];
            for (let i = 3, len = colored.data.length, j = 0; i < len; i += 4) {
                const alpha = colored.data[i];
                maxAlpha = Math.max(maxAlpha, alpha);
                alphas.push(alpha);
                //Points that do not need to be drawn
                if (alpha <= 0) {
                    blackps[j] = 1;
                }
                j++;
            }

            const intensity = new Intensity({
                gradient: scope.options.gradient
            });
            scope.colorize(colored.data, intensity.getImageData(), scope.options);
            shadowCanvas = null;
            shadowContext = null;
            const geometry = new THREE.PlaneBufferGeometry(offsetX, offsetY, canvasWidth - 1, canvasHeight - 1);
            const index = geometry.getIndex().array;
            const position = geometry.attributes.position.array;
            const filterIndex = [];
            const colors = [];
            const color = new THREE.Color();
            // debugger/
            for (let i = 0, len = position.length, j = 0, len1 = index.length, m = 0, len2 = colored.data.length, n = 0; i < Math.max(len, len1, len2); i += 3) {
                if (i < len) {
                    const alpha = alphas[n];
                    if (alpha > 0) {
                        position[i + 2] = alpha / maxAlpha;
                    }
                }
                if (j < len1) {
                    const a = index[j],
                        b = index[j + 1],
                        c = index[j + 2];
                    if ((!blackps[a]) || (!blackps[b]) || (!blackps[c])) {
                        filterIndex.push(a, b, c);
                    }
                }
                if (m < len2) {
                    const r = colored.data[m],
                        g = colored.data[m + 1],
                        b = colored.data[m + 2]; // a = colored.data[i + 3];
                    const rgb = `rgb(${r},${g},${b})`;
                    color.setStyle(rgb);
                    colors.push(color.r, color.g, color.b);
                }
                j += 3;
                m += 4;
                n++;
            }
            var material = new THREE.MeshBasicMaterial({
                transparent: true,
                wireframe: scope.options.wireframe === undefined ? false : scope.options.wireframe,
                opacity: scope.options.opacity || 1,
                color: scope.options.color || "#ac3d3d"
            });
            geometry.setIndex(new THREE.Uint32BufferAttribute(filterIndex, 1));
            scope.addAttribute(geometry, 'color', new THREE.Float32BufferAttribute(colors, 3, true));
            material.vertexColors = THREE.VertexColors;
            scope.object3d = new THREE.Mesh(geometry, material);
            var z = scope.options.altitude === undefined ? 0 : scope.options.altitude;
            scope.object3d.position.copy(new THREE.Vector3((minX + maxX) / 2, (minY + maxY) / 2, z));
            scope.object3d.scale.z = scope.options.scaleZ == undefined ? 1 : scope.options.scaleZ;
            scope.scene.add(scope.object3d);
            context.resetWebGLState();
        },

        setMaterialColor: function (rgb) {
            if (!this.object3d) { return }
            this.object3d.material.color.set(rgb);
        },
        setwireframe: function () {
            if (!this.object3d) { return }
            this.object3d.material.wireframe = !this.object3d.material.wireframe;
        },
        setopacity: function (opacity) {
            if (!this.object3d) { return }
            this.object3d.material.opacity = opacity;
        },
        setaltitude: function (altitude) {
            if (!this.object3d) { return }
            this.object3d.position.z = altitude;
        },

        setscaleZ: function (scaleZ) {
            if (!this.object3d) { return }
            this.object3d.scale.z = scaleZ;
        },
        addAttribute: function (bufferGeomertry, key, value) {
            bufferGeomertry.setAttribute(key, value);
            return bufferGeomertry;
        },
        coordinateToVector3: function (coord, z = 0) {
            // const p = webMercatorUtils.lngLatToXY(coord[0], coord[1]);
            const p = coord;
            let transform = new THREE.Matrix4(); // 变换矩阵
            let transformation = new Array(16);
            // const z = point.z === undefined ? 0 : point.z
            transform.fromArray(
                externalRenderers.renderCoordinateTransformAt(
                    this.view,
                    [p[0], p[1], z], // 坐标在地面上的点[x值, y值, 高度值]
                    this.view.spatialReference,
                    transformation
                )
            );
            let vector3 = new THREE.Vector3(
                transform.elements[12],
                transform.elements[13],
                transform.elements[14]
            );
            return vector3;
        },
        distanceToVector3: function (w, h, coord) {

            const zoom = this.view.zoom;
            let center = coord || this.view.center;

            const target = this._locate(center, w, h);
            const p0 = map.coordinateToPoint(center, zoom),
                p1 = map.coordinateToPoint(target, zoom);
            const x = Math.abs(p1.x - p0.x) * maptalks.Util.sign(w);
            const y = Math.abs(p1.y - p0.y) * maptalks.Util.sign(h);
            return new THREE.Vector3(x, y, 0);
        },

        _locate: function (c, xDist, yDist) {
            if (!c) {
                return null;
            }
            if (!xDist) {
                xDist = 0;
            }
            if (!yDist) {
                yDist = 0;
            }
            if (!xDist && !yDist) {
                return c;
            }
            let x, y;
            let ry = toRadian(c.y);
            if (yDist !== 0) {
                const dy = Math.abs(yDist);
                const sy = Math.sin(dy / (2 * this.radius)) * 2;
                ry = ry + sy * (yDist > 0 ? 1 : -1);
                y = wrap(ry * 180 / Math.PI, -90, 90);
            } else {
                y = c.y;
            }
            if (xDist !== 0) {
                // distance per degree
                const dx = Math.abs(xDist);
                let rx = toRadian(c.x);
                const sx = 2 * Math.sqrt(Math.pow(Math.sin(dx / (2 * this.radius)), 2) / Math.pow(Math.cos(ry), 2));
                rx = rx + sx * (xDist > 0 ? 1 : -1);
                x = wrap(rx * 180 / Math.PI, -180, 180);
            } else {
                x = c.x;
            }
            c.x = x;
            c.y = y;
            return c;
        },
        drawGray: function (context, dataSet, options) {

            var max = this.getMax(options);
            // var min = getMin(options);
            // console.log(max)
            var size = options._size || options.size || 13;

            var circle = this.createCircle(size);
            var circleHalfWidth = circle.width / 2;
            var circleHalfHeight = circle.height / 2;

            var data = dataSet;

            var dataOrderByAlpha = {};

            data.forEach(function (item) {
                var count = item.count === undefined ? 1 : item.count;
                var alpha = Math.min(1, count / max).toFixed(2);
                dataOrderByAlpha[alpha] = dataOrderByAlpha[alpha] || [];
                dataOrderByAlpha[alpha].push(item);
            });

            for (var i in dataOrderByAlpha) {
                if (isNaN(i)) continue;
                var _data = dataOrderByAlpha[i];
                context.beginPath();
                if (!options.withoutAlpha) {
                    context.globalAlpha = i;
                }
                // context.strokeStyle = intensity.getColor(i * max);
                _data.forEach(function (item) {
                    var coordinates = item.coordinate;
                    var count = item.count === undefined ? 1 : item.count;
                    context.globalAlpha = count / max;
                    context.drawImage(circle, coordinates[0] - circleHalfWidth, coordinates[1] - circleHalfHeight);
                });

            }
        },
        createCircle: function (size) {
            var shadowBlur = size / 2;
            var r2 = size + shadowBlur;
            var offsetDistance = 10000;

            var circle = this.Canvas(r2 * 2, r2 * 2);
            var context = circle.getContext('2d');

            context.shadowBlur = shadowBlur;
            context.shadowColor = 'black';
            context.shadowOffsetX = context.shadowOffsetY = offsetDistance;

            context.beginPath();
            context.arc(r2 - offsetDistance, r2 - offsetDistance, size, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
            return circle;
        },
        colorize: function (pixels, gradient, options) {
            var max = this.getMax(options);
            var min = this.getMin(options);
            var diff = max - min;
            var range = options.range || null;

            var jMin = 0;
            var jMax = 1024;
            if (range && range.length === 2) {
                jMin = (range[0] - min) / diff * 1024;
            }

            if (range && range.length === 2) {
                jMax = (range[1] - min) / diff * 1024;
            }

            var maxOpacity = options.maxOpacity || 0.8;
            var minOpacity = options.minOpacity || 0;
            // var range = options.range;

            for (var i = 3, len = pixels.length, j; i < len; i += 4) {
                j = pixels[i] * 4; // get gradient color from opacity value

                if (pixels[i] / 256 > maxOpacity) {
                    pixels[i] = 256 * maxOpacity;
                }
                if (pixels[i] / 256 < minOpacity) {
                    pixels[i] = 256 * minOpacity;
                }

                if (j && j >= jMin && j <= jMax) {
                    pixels[i - 3] = gradient[j];
                    pixels[i - 2] = gradient[j + 1];
                    pixels[i - 1] = gradient[j + 2];
                } else {
                    pixels[i] = 0;
                }
            }
        },
        getMax: function (options) {
            var max = options.max || 100;
            return max;
        },

        getMin: function (options) {
            var min = options.min || 0;
            return min;
        },

        extend: function (dest) { // (Object[, Object, ...]) ->
            for (let i = 1; i < arguments.length; i++) {
                const src = arguments[i];
                for (const k in src) {
                    dest[k] = src[k];
                }
            }
            return dest;
        },
        Canvas: function (width = 1, height = 1) {
            let canvas;
            if (typeof document === 'undefined') {
                // var Canvas = require('canvas');
                // canvas = new Canvas(width, height);
            } else {
                canvas = document.createElement('canvas');
                if (width) {
                    canvas.width = width;
                }
                if (height) {
                    canvas.height = height;
                }
            }
            return canvas;
        },
        render: function (context) {
            const cam = context.camera;
            this.camera.position.set(cam.eye[0], cam.eye[1], cam.eye[2]);
            this.camera.up.set(cam.up[0], cam.up[1], cam.up[2]);
            this.camera.lookAt(
                new THREE.Vector3(cam.center[0], cam.center[1], cam.center[2])
            );

            // console.log('?????????', this.camera)
            this.camera.projectionMatrix.fromArray(cam.projectionMatrix);
            this.renderer.state.reset();
            this.renderer.render(this.scene, this.camera);
            externalRenderers.requestRender(this.view);
            context.resetWebGLState();
        }
    });
    return WaterRenderer;
});