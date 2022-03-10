import json
import copy

city = input('请输入数据对应的城市名称-汉语拼音全拼：')

interval = int(input('请输入切分的段数值：'))

fileType = input('请输入导出的文件格式：')
# interval = 10
if city == 'beijing':
    file_path = '../beijing/features.geojson'
    filename = "../beijing/polygon_" + str(interval) + "." + fileType
else:
    file_path = '../chongqing/newFeatures.geojson'
    filename = "../chongqing/newpolygon_" + str(interval) + "." + fileType

with open(file_path) as f:
    js = json.load(f)  # js是转换后的字典

def return_sum(cord, interNum):
    x1 = cord[0][0]
    y1 = cord[0][1]
    x2 = cord[1][0]
    y2 = cord[1][1]
    interX = (x1 - x2) / interNum
    interY = (y1 - y2) / interNum
    cluster = []
    for i in range(interNum):
        point = [x1 - interX * i, y1 - interY * i]
        cluster.append(point)
    cluster.append([x2, y2])
    return cluster


result = copy.deepcopy(js)
result['features'] = []
lenth = len(js['features'])
for i in range(lenth):
    # print(js['features'][i]['properties']['customerInter'].split('_')[1])
    if i < lenth - 1:
        clusterInter1 = js['features'][i]['properties']['customerInter'].split('_')[1]
        clusterInter2 = js['features'][i + 1]['properties']['customerInter'].split('_')[1]
        if  clusterInter1 == clusterInter2:
            cluster1 = return_sum(js['features'][i]['geometry']['coordinates'][0], interval)
            cluster2 = return_sum(js['features'][i + 1]['geometry']['coordinates'][0], interval)
            cor = []
            for j in range(interval + 1):
                if j + 1 < interval + 1:
                    cor.append([cluster1[j], cluster1[j + 1], cluster2[j + 1], cluster2[j], cluster1[j]])
            
            for k in range(len(cor)):
                result['features'].append({
                    "type": "Feature",
                    "showTooltip": 0,
                    "properties": {
                        'id': 'polygon_' + str(i) + '_' + str(k),
                        'clusterId': 'cluster_' + clusterInter1 + '_' + js['features'][i]['properties']['customerInter'].split('_')[2],
                        'location': k + 1,
                        'interVal': interval
                    },
                    "geometry": { 
                        "type": "MultiPolygon",
                        "coordinates": [[cor[k]]]
                    }
                })

with open(filename, 'w') as file_obj:
    json.dump(result, file_obj , indent=2)