

# import json
# # from statistics import mode  
# f =open('./merge.geojson',mode="t") #打开‘product.json’的json文件
# res=f.read()  #读文件
# # res2 = json.loads(res)
# print(json.loads(res))

import json
file_path = './merge.geojson'

with open(file_path) as f:
    js = json.load(f)  # js是转换后的字典

count = 0
for item in js['features']:
    item['properties']['id'] = 'id_' + str(count)
    item['customerSplit'] = []
    count = count + 1
    sin = 0
    if item['geometry']['coordinates']:
        cluster = item['geometry']['coordinates'][0]
        for i in range(len(cluster)):
            if i + 2 == len(cluster): break
            # print(cluster[i])
            sinT = (cluster[i][0] - cluster[i + 1][0]) / (cluster[i][1] - cluster[i + 1][1])
            print('******************', abs(sinT - sin))
            if i != 0 and abs(sinT - sin) > 1:
                item['customerSplit'].append(i + 1)
            sin = sinT
            
            


# print(js)

filename = "numbers.geojson"
with open(filename, 'w') as file_obj:
    json.dump(js, file_obj)
