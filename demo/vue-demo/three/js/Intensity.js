define([
    'dojo/_base/declare',
], function (
    declare,
) {
    var Intensity = declare([], {
        constructor: function (options) {
            options = options || {};
            this.gradient = options.gradient || {
                0.25: 'rgba(0, 0, 255, 1)',
                0.55: 'rgba(0, 255, 0, 1)',
                0.85: 'rgba(255, 255, 0, 1)',
                1.0: 'rgba(255, 0, 0, 1)'
            };
            this.maxSize = options.maxSize || 35;
            this.minSize = options.minSize || 0;
            this.max = options.max || 100;
            this.min = options.min || 0;
            this.initPalette();

        },
        setMax: function (value) {
            this.max = value || 100;
        },

        setMin: function (value) {
            this.min = value || 0;
        },

        setMaxSize: function (maxSize) {
            this.maxSize = maxSize || 35;
        },

        setMinSize: function (minSize) {
            this.minSize = minSize || 0;
        },

        initPalette: function () {

            var gradient = this.gradient;

            var canvas = this.Canvas(256, 1);

            var paletteCtx = this.paletteCtx = canvas.getContext('2d');

            var lineGradient = paletteCtx.createLinearGradient(0, 0, 256, 1);

            for (var key in gradient) {
                lineGradient.addColorStop(parseFloat(key), gradient[key]);
            }

            paletteCtx.fillStyle = lineGradient;
            paletteCtx.fillRect(0, 0, 256, 1);
            // canvas.toBlob(function (blob) {

            //     var a = document.createElement("a");
            //     var body = document.getElementsByTagName("body");
            //     document.body.appendChild(a);
            //     a.download = "imgb" + ".jpg";
            //     a.href = window.URL.createObjectURL(blob);

            //     a.click();
            //     body.removeChild("a");

            // });
        },

        getColor: function (value) {

            var imageData = this.getImageData(value);

            return 'rgba(' + imageData[0] + ', ' + imageData[1] + ', ' + imageData[2] + ', ' + imageData[3] / 256 + ')';

        },

        getImageData: function (value) {

            var imageData = this.paletteCtx.getImageData(0, 0, 256, 1).data;

            if (value === undefined) {
                return imageData;
            }

            var max = this.max;
            var min = this.min;

            if (value > max) {
                value = max;
            }

            if (value < min) {
                value = min;
            }

            var index = Math.floor((value - min) / (max - min) * (256 - 1)) * 4;

            return [imageData[index], imageData[index + 1], imageData[index + 2], imageData[index + 3]];
        },
        getSize: function (value) {

            var size = 0;
            var max = this.max;
            var min = this.min;
            var maxSize = this.maxSize;
            var minSize = this.minSize;

            if (value > max) {
                value = max;
            }

            if (value < min) {
                value = min;
            }

            if (max > min) {
                size = minSize + (value - min) / (max - min) * (maxSize - minSize);
            } else {
                return maxSize;
            }

            return size;

        },

        getLegend: function (options) {
            var gradient = this.gradient;


            var width = options.width || 20;
            var height = options.height || 180;

            var canvas = this.Canvas(width, height);

            var paletteCtx = canvas.getContext('2d');

            var lineGradient = paletteCtx.createLinearGradient(0, height, 0, 0);

            for (var key in gradient) {
                lineGradient.addColorStop(parseFloat(key), gradient[key]);
            }

            paletteCtx.fillStyle = lineGradient;
            paletteCtx.fillRect(0, 0, width, height);

            return canvas;
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
        }
    })
    return Intensity;
});