import json
import copy

city = input('请输入需要处理数据对应的城市名称的全拼：')

if city == 'chongqing':
    file_path = '../chongqing/waice.geojson'
    placeholderList = [3, 2, 2, 2, 2, 2, 2, 2,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2, 2, 2, 2]
    filename = "../chongqing/features.geojson"
else:
    file_path = '../beijing/merge.geojson'
    placeholderList = [3, 3, 3, 2, 3, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3 ,3, 3, 3, 3, 3, 3, 3, 3, 3]
    filename = "../beijing/features.geojson"

with open(file_path) as f:
    js = json.load(f)  # js是转换后的字典

result = copy.deepcopy(js)
result['features'] = []
lenth = 0
placeholder = 0
interVal = 1
# chongqing interval
# beijing
for i in range(len(js['features'])):
    if js['features'][i]['properties']['id']:
        result['features'].append(js['features'][i])
        lenth = lenth + 1
        result['features'][lenth - 1]['properties']['id'] = 'id_customer_' + str(lenth)
        result['features'][lenth - 1]['geometry']['coordinates'][0] = js['features'][i]['geometry']['coordinates'][0][0:2]

for i in range(len(result['features'])):
    if interVal > placeholderList[placeholder]:
        placeholder = placeholder + 1
        interVal = 1
    result['features'][i]['properties']['customerInter'] = 'cluster_' + str(placeholder + 1) + '_' + str(interVal)
    interVal = interVal + 1

with open(filename, 'w') as file_obj:
    json.dump(result, file_obj , indent=2)