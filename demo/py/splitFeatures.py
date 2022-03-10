
import json
import copy
from unittest import result


city = input('请输入需要处理数据对应的城市名称的全拼：')

if city == 'chongqing':
    file_path = '../chongqing/features.geojson'
    filename = "../chongqing/newFeatures.geojson"
else:
    file_path = '../beijing/features.geojson'
    filename = "../beijing/newFeatures.geojson"

with open(file_path) as f:
    js = json.load(f)  # js是 转换后的字典

result1 = copy.deepcopy(js)
result2 = copy.deepcopy(js)
result1['features'] = []
result2['features'] = []
for i in range(len(js['features'])):
    res1 = copy.deepcopy(js['features'][i])
    res2 = copy.deepcopy(js['features'][i])
    customerInterArr = js['features'][i]['properties']['customerInter'].split('_')
    res2['properties']['id'] = 'id_customer000_' + js['features'][i]['properties']['id'].split('_')[2]
    res2['properties']['customerInter'] = 'cluster_000' + customerInterArr[1] + '_' + customerInterArr[2]
    cor = js['features'][i]['geometry']['coordinates'][0]
    midCor = [(cor[0][0] + cor[1][0]) / 2, (cor[0][1] + cor[1][1]) / 2]
    res1['geometry']['coordinates'] = [[cor[0], midCor]]
    res2['geometry']['coordinates'] = [[midCor, cor[1]]]
    result1['features'].append(res1)
    result2['features'].append(res2)
result = copy.deepcopy(js)
result['features'] = result1['features'] + result2['features']
with open(filename, 'w') as file_obj:
    json.dump(result, file_obj , indent=2)