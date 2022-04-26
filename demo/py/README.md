# 使用说明

## features

以线条数据（"type": "MultiLineString"）为原始数据
整理原始数据为包含一定规律的数据集， 生成features文件


## splitFeatures

以features文件为输入文件，根据需要将线条分成多段线条， featurs文件符合条件，不需再切分， 则不需要运行该文件

## polygon

以features文件或者以splitFeatures运行后生成的文件为输入文件， 生成多边形集合

example： chongqing/waice.geojson -> features.py -> features.geojson -> (线条分段过长 ？ splitFeatures.py -> splitFeatures.geojson : '') -> polygon.py -> polygon_xx.geojson

每个py文件执行所需要的初始geojson文件均为上一个py文件执行生成的文件