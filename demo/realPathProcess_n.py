# -*- coding:utf-8 -*-
#@Time  : 2021/8/10 15:42
#@Author: liuqian
#@File  : realPathProcess.py

import json
import math
import uuid

LON2M = 0.00001141
LAT2M = 0.00000899
FRAME_RATE = 10

realPathPosList = []

# 生成停止帧位置
def calStopVehicle(waitTime, lon1, lon2, lat1, lat2 ):
    vehicleList = []
    if(waitTime != 0):
        for i in range(int(waitTime * FRAME_RATE)):
            vehicleLDict = {"center": [lon1, lat1], "velocity": 0, "heading": calHeading(lon1, lon2, lat1, lat2)}
            vehicleList.append(vehicleLDict)
    return vehicleList


# 生成加速减速帧位置
def calAccVehicle(startV, thisTime, posList):
    vehicleList = []
    lon1 = posList[0][0]
    lat1 = posList[0][1]
    lon2 = posList[1][0]
    lat2 = posList[1][1]
    # 计算加速路程
    dist = calDist(lon1, lon2, lat1, lat2)
    # 加速期间平均速度（m/s）
    avrV = dist / thisTime
    # 实际的加速步骤
    step = int(math.floor(thisTime * FRAME_RATE))
    # 计算加速度
    acc = 2 * (dist / thisTime / thisTime - startV / 3.6 / thisTime)
    #print("dist:" + str(dist) + " startV:" + str(startV) + " endV:" + str(endV) + " acc:" + str(acc) + " time:" + str(thisTime))

    if step > 0:
        for i in range(step):
            # 计算当前时刻
            time = i / step * thisTime
            # 计算当前速度
            # velocity = format(startV + acc * time * 3.6, '.1f')
            velocity = round(startV + acc * time * 3.6)
            #print(velocity)
            if velocity < 0:
                velocity = 0
                lonStep = 0
                latStep = 0
            else:
                # 计算变化间隔 距离= v0t + 1/2*at^2
                lonStep = (startV / 3.6 * time + 0.5 * acc * time * time) / dist * (lon2 - lon1)
                latStep = (startV / 3.6 * time + 0.5 * acc * time * time) / dist * (lat2 - lat1)
            # 计算当前经纬度
            newLon = lon1 + lonStep
            newLat = lat1 + latStep

            vehicleLDict = {"center": [newLon, newLat], "velocity": velocity, "heading": calHeading(lon1, lon2, lat1, lat2)}
            vehicleList.append(vehicleLDict)

    return vehicleList


def calNormVehicle(posList, time):
    vehicleList = []
    aPathLen = calTotalDist(posList)
    bestStepDist = aPathLen / time / FRAME_RATE

    # 计算该段路径长度（米）
    thisPathLen = calTotalDist(posList)
    # print("thisPathLen: " + str(thisPathLen))

    # 计算正常行驶路径由多少点组成
    keyNum = len(posList)

    for i in range(keyNum):
        if i < keyNum-1:
            lon1 = posList[i][0]
            lat1 = posList[i][1]
            lon2 = posList[i+1][0]
            lat2 = posList[i+1][1]

            # 当前分段长度
            thisKeyLen = calDist(lon1, lon2, lat1, lat2)
            #print(thisKeyLen)
            # 计算行驶需花费帧数
            frameNum = round(thisKeyLen / bestStepDist)
            # 计算每帧行驶间隔
            # thisStepLen = thisKeyLen / frameNum

            if frameNum > 0:
                # 计算速度（同一组关键点内速度统一）
                velocity = round(thisKeyLen / (frameNum / FRAME_RATE) * 3.6)
                # 计算方向（同一组关键点内方向统一）
                heading = calHeading(lon1, lon2, lat1, lat2)

                # 计算固定间隔
                lonStep = (lon2 - lon1) / frameNum
                latStep = (lat2 - lat1) / frameNum

                for j in range(frameNum):
                    newLon = lon1 + j * lonStep
                    newLat = lat1 + j * latStep
                    vehicleLDict = {"center": [newLon, newLat], "velocity": velocity, "heading": heading}
                    vehicleList.append(vehicleLDict)

    return vehicleList


# 计算两点之间直线路径长度（m）
def calDist(lon1, lon2, lat1, lat2):
    dist = math.sqrt((abs(lon2 - lon1) / LON2M) ** 2 + (abs(lat2 - lat1) / LAT2M) ** 2)
    return dist


# 计算累计若干直线路径长度（米）
def calTotalDist(aList):
    pathLen = 0
    num = len(aList)
    for i in range(num):
        lon1 = aList[i][0]
        lat1 = aList[i][1]
        if i < num - 1:
            lon2 = aList[i + 1][0]
            lat2 = aList[i + 1][1]
            pathLen += calDist(lon1, lon2, lat1, lat2)
    return pathLen


# 根据经纬度计算朝向
def calHeading(lon1, lon2, lat1, lat2):
    lonDif = lon2 - lon1
    latDif = lat2 - lat1
    if lonDif == 0 and latDif == 0:
        heading = 0
    elif lonDif == 0 and latDif < 0:
        heading = math.pi
    elif lonDif == 0 and latDif > 0:
        heading = 0
    elif lonDif < 0 and latDif == 0:
        heading = 3 * math.pi / 2
    elif lonDif > 0 and latDif == 0:
        heading = math.pi / 2
    else:
        heading = math.atan(abs(lonDif) / abs(latDif))

        if lonDif > 0 and latDif > 0:
            heading = math.pi / 2 - heading
        elif lonDif > 0 and latDif < 0:
            heading = math.pi * 3 / 2 + heading
        elif lonDif < 0 and latDif > 0:
            heading = math.pi / 2 + heading
        elif lonDif < 0 and latDif < 0:
            heading = math.pi * 3 / 2 - heading

    #print(heading)

    return heading

# 计算倒车朝向
def calHeadingBack(heading):
    if 0 <= heading <= math.pi:
        return heading + math.pi
    elif math.pi < heading <= 2 * math.pi:
        return heading - math.pi


# 增加速度变化
def randomVelocity(pos, pathLen, time, frameRate):
    velocity = int(pathLen / time * 3.6)
    if (time * frameRate / 8) < pos < (time * frameRate / 7):
        velocity += 1
    elif (time * frameRate / 5.5) < pos < (time * frameRate / 4.8):
        velocity += 1
    elif (time * frameRate / 3.2) < pos < (time * frameRate / 2.7):
        velocity += 1
    elif (time * frameRate / 2.2) < pos < (time * frameRate / 2.0):
        velocity += 1
    elif (time * frameRate / 1.6) < pos < (time * frameRate / 1.5):
        velocity += 1
    elif (time * frameRate / 1.3) < pos < (time * frameRate / 1.2):
        velocity += 1
    return velocity


# 计算当前整个脚本长度（米）（不含加减速部分）
def calPathLen(list):
    pathLen = 0
    num = len(list)

    for i in range(num):
        aList = list[i]
        pathLen += calTotalDist(aList)
    #print(pathLen)
    return pathLen


# 读文件
def readF(url):
    with open(url, "r") as f:
        list = json.load(f)
    return list


# 写文件
def writeF(url, list):
    with open(url, "w") as f:
        json.dump(list, f)
    return


# 插入数组
def appendArr(curList, addlist):
    totalList = curList
    for x in range(len(addlist)):
        totalList.append(addlist[x])
    return totalList


# 读取realPath.txt，获取物流车原始位置数组
realPathPosList = readF("realPath.txt")

# 定义完整物流车数组
vehicles = []

# 计算当前脚本长度（米）
pathLen = calPathLen(realPathPosList)
print("pathLen: " + str(pathLen))

# 1 匀速行驶1（车辆出库）
vehicleList1 = calNormVehicle(realPathPosList[0], 20)
vehicles = appendArr(vehicles, vehicleList1)

# 2 匀速行驶2（至闸机1前）
vehicleList2 = calNormVehicle(realPathPosList[1], 10)
vehicles = appendArr(vehicles, vehicleList2)

# 3 匀速行驶3（闸机1抬起通过）
vehicleList3 = calNormVehicle(realPathPosList[2], 29)
vehicles = appendArr(vehicles, vehicleList3)
#print(vehicleList3)

# 4 匀速行驶4（转弯1）
vehicleList4 = calNormVehicle(realPathPosList[3], 16)
vehicles = appendArr(vehicles, vehicleList4)
#print(vehicleList4)

# 5 匀速行驶5（转弯1后低速直行）
vehicleList5 = calNormVehicle(realPathPosList[4], 20)
vehicles = appendArr(vehicles, vehicleList5)
#print(vehicleList5)

# 6 加速行驶1（过路坎后加速）
thisVelocity = int(vehicleList5[len(vehicleList5) - 1]["velocity"])
vehicleList6 = calAccVehicle(thisVelocity, 3, realPathPosList[5])
vehicles = appendArr(vehicles, vehicleList6)
#print(vehicleList6)

# 7 匀速行驶6（高速行驶）
vehicleList7 = calNormVehicle(realPathPosList[6], 10)
vehicles = appendArr(vehicles, vehicleList7)
#print(vehicleList7)

# 8 减速行驶1（转弯2前减速）
thisVelocity = int(vehicleList7[len(vehicleList7) - 1]["velocity"])
vehicleList8 = calAccVehicle(thisVelocity-6, 7, realPathPosList[7])
vehicles = appendArr(vehicles, vehicleList8)
#print(vehicleList8)

# 9 匀速行驶7（转弯2）
vehicleList9 = calNormVehicle(realPathPosList[8], 14)
vehicles = appendArr(vehicles, vehicleList9)
#print(vehicleList9)

# 10 匀速行驶8（转弯2后超车前）
vehicleList10 = calNormVehicle(realPathPosList[9], 4)
vehicles = appendArr(vehicles, vehicleList10)
#print(vehicleList10)

# 11 匀速行驶9（占道超车）
vehicleList11 = calNormVehicle(realPathPosList[10], 10)
vehicles = appendArr(vehicles, vehicleList11)
#print(vehicleList11)

# 12 匀速行驶10（占道超车后直行）
vehicleList12 = calNormVehicle(realPathPosList[11], 70)
vehicles = appendArr(vehicles, vehicleList12)
#print(vehicleList12)

# 13 减速行驶2（等候占道卡车前）
thisVelocity = int(vehicleList12[len(vehicleList12) - 1]["velocity"])
vehicleList13 = calAccVehicle(thisVelocity, 12, realPathPosList[12])
vehicles = appendArr(vehicles, vehicleList13)
#print(vehicleList13)

# 14 停车1（等候占道卡车）
vehicleList14 = calStopVehicle(3, realPathPosList[13][0][0], realPathPosList[14][1][0], realPathPosList[13][0][1], realPathPosList[14][1][1])
vehicles = appendArr(vehicles, vehicleList14)
#print(vehicleList14)

# 15 加速行驶2（等候占道卡车后）
vehicleList15 = calAccVehicle(0, 10, realPathPosList[14])
vehicles = appendArr(vehicles, vehicleList15)
#print(vehicleList15)

# 16 减速行驶3（接近闸机2减速）
thisVelocity = int(vehicleList15[len(vehicleList15) - 1]["velocity"])
vehicleList16 = calAccVehicle(thisVelocity-2, 9, realPathPosList[15])
vehicles = appendArr(vehicles, vehicleList16)
#print(vehicleList16)

# 17 匀速行驶11（缓慢通过闸机2）
vehicleList17 = calNormVehicle(realPathPosList[16], 22)
vehicles = appendArr(vehicles, vehicleList17)

# 18 匀速行驶12（弯道3）
vehicleList18 = calNormVehicle(realPathPosList[17], 31)
vehicles = appendArr(vehicles, vehicleList18)

# 19 减速行驶4（弯道3后）
thisVelocity = int(vehicleList18[len(vehicleList18) - 1]["velocity"])
vehicleList19 = calAccVehicle(thisVelocity, 4, realPathPosList[18])
vehicles = appendArr(vehicles, vehicleList19)

# 20 匀速行驶13（弯道3后）
vehicleList20 = calNormVehicle(realPathPosList[19], 39)
vehicles = appendArr(vehicles, vehicleList20)

# 21 减速行驶5（接近行人盲区1）
thisVelocity = int(vehicleList20[len(vehicleList20) - 1]["velocity"])
vehicleList21 = calAccVehicle(thisVelocity+2, 10, realPathPosList[20])
vehicles = appendArr(vehicles, vehicleList21)

# 22 加速行驶4（离开行人盲区1）
thisVelocity = int(vehicleList21[len(vehicleList21) - 1]["velocity"])
vehicleList22 = calAccVehicle(thisVelocity, 7, realPathPosList[21])
vehicles = appendArr(vehicles, vehicleList22)

# 23 减速行驶6（接近弯道4）
thisVelocity = int(vehicleList22[len(vehicleList22) - 1]["velocity"])
vehicleList23 = calAccVehicle(thisVelocity+3, 16, realPathPosList[22])
vehicles = appendArr(vehicles, vehicleList23)

# 24 匀速行驶14（弯道4）
vehicleList24 = calNormVehicle(realPathPosList[23], 25)
vehicles = appendArr(vehicles, vehicleList24)

# 25 加速行驶5（弯道4后）
thisVelocity = int(vehicleList24[len(vehicleList24) - 1]["velocity"])
vehicleList25 = calAccVehicle(thisVelocity, 23, realPathPosList[24])
vehicles = appendArr(vehicles, vehicleList25)

# 26 减速行驶7（接近行人盲区2）
thisVelocity = int(vehicleList25[len(vehicleList25) - 1]["velocity"])
vehicleList26 = calAccVehicle(thisVelocity, 9, realPathPosList[25])
vehicles = appendArr(vehicles, vehicleList26)

# 27 停车2（等候行人）
vehicleList27 = calStopVehicle(4, realPathPosList[26][0][0], realPathPosList[27][1][0], realPathPosList[26][0][1], realPathPosList[27][1][1])
vehicles = appendArr(vehicles, vehicleList27)

# 28 加速行驶6（离开行人盲区2）
vehicleList28 = calAccVehicle(0, 10, realPathPosList[27])
vehicles = appendArr(vehicles, vehicleList28)

# 29 匀速行驶15
vehicleList29 = calNormVehicle(realPathPosList[28], 35)
vehicles = appendArr(vehicles, vehicleList29)

# 30 减速行驶8（接近终点）
#thisVelocity = int(vehicleList29[len(vehicleList29) - 2]["velocity"])
vehicleList30 = calAccVehicle(thisVelocity-3, 21, realPathPosList[29])
vehicles = appendArr(vehicles, vehicleList30)

# 31 倒车
vehicleList31 = calNormVehicle(realPathPosList[30], 30)
for i in range(len(vehicleList31)):
    heading = vehicleList31[i]["heading"]
    vehicleList31[i]["heading"] = calHeadingBack(heading)
vehicles = appendArr(vehicles, vehicleList31)

# 32 减速入库
thisVelocity = int(vehicleList31[len(vehicleList31) - 1]["velocity"])
vehicleList32 = calAccVehicle(thisVelocity+1, 34, realPathPosList[31])
for i in range(len(vehicleList32)):
    heading = vehicleList32[i]["heading"]
    vehicleList32[i]["heading"] = calHeadingBack(heading)
vehicles = appendArr(vehicles, vehicleList32)



# ===============生成静态小汽车===============
def genStaticCars():
    staticCars = []
    staticCarPos = [
        [106.670982984179574, 29.775352406981263], #2号 占道超车场景车辆
        [106.667971050656206, 29.774717843242783], #4号 远处停车
        #[106.667829486974597, 29.774693326627535], #5号 远处停车
        #[106.667708485615449, 29.774674346022177], #6号 远处停车
        #[106.667572457943734, 29.774652992841151], #7号 远处停车
        [106.667967096363412, 29.774859011495131], #8号 远处停车
        #[106.667848072150662, 29.77483924003122], #9号 远处停车
        #[106.667727466220811, 29.774821445713691], #10号 远处停车
        #[106.667614768876518, 29.774803651396169], #11号 远处停车
        [106.668282233463415, 29.774405827994308] #12号 黄色面包车南北向头朝西
    ]
    staticCarHeading = [
        3.3081018946864955, #2号 占道超车场景车辆
        3.3081018946864955, #4号 东西向路侧远处停车
        #3.3081018946864955, #5号 东西向路侧远处停车
        #3.3081018946864955, #6号 东西向路侧远处停车
        #3.3081018946864955, #7号 东西向路侧远处停车
        3.3081018946864955, #8号 东西向路侧远处停车
        #3.3081018946864955, #9号 东西向路侧远处停车
        #3.3081018946864955, #10号 东西向路侧远处停车
        #3.3081018946864955, #11号 东西向路侧远处停车
        3.311005697527219 #12号 黄色面包车南北向头朝西
    ]
    for x in range(len(staticCarPos)):
        car = {
            "center": staticCarPos[x],
            "shape": {"x": 3.9, "y": 1.8, "z": 1.4},
            "id": ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'car')).split('-')),
            "velocity": 0,
            "heading": staticCarHeading[x],
            "type": 1,
            "state": 0
        }
        staticCars.append(car)
    return staticCars
# ===============生成静态小汽车===============


# ===============生成静态卡车===============
def genStaticTrucks():
    staticTrucks = []
    staticTruckPos = [
        [106.672067514047569, 29.776355255404813], #1号 开始停在物流车旁边的白色卡车
        [106.668287076974153, 29.77430317076097], #13号 南北向路边静止卡车
        [106.668264459180733, 29.773524042251783], #14号 另一辆物流车车头朝东 05:09 - 05:33 车外视频
        [106.666344569198387, 29.772521266785436], #15号 终点占道卡车 06:37 车外视频
        [106.667784969894527, 29.77285754275654]#, #16号 满载的静止橘红色卡车 07:07 车外视频
        #[106.665763852350437, 29.772503235525591], #17号 终点占路车旁边的车辆
    ]
    staticTruckHeading = [
        1.7033478575401673, #1号 开始停在物流车旁边的白色卡车
        3.311005697527219, #13号 南北向路边头朝西静止卡车
        0.06426780641391239, #14号 另一辆物流车车头朝东 05:09 - 05:33 车外视频
        0.18444664454932602, #15号 终点占道卡车 06:37 车外视频
        0.00023705576289190233#, #16号 满载的静止橘红色卡车 07:07 车外视频
        #4.52829050937386, #17号 终点占路车旁边的车辆
    ]
    for x in range(len(staticTruckPos)):
        truck = {
            "center": staticTruckPos[x],
            "shape": {"x": 7, "y": 2.0, "z": 2.1},
            "id": ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'truck')).split('-')),
            "velocity": 0,
            "heading": staticTruckHeading[x],
            "type": 4,
            "state": 0
        }
        staticTrucks.append(truck)
    return staticTrucks
# ===============生成静态卡车===============


# ===============生成坐着的人===============
def genStaticMen():
    staticMen = []
    staticMenPos = [
        [106.671615723994961, 29.776270302241851] #1号 路边坐着的人
    ]
    staticMenHeading = [
        1.7314308694262384 #1号 路边坐着的人
    ]
    for x in range(len(staticMenPos)):
        man = {
            "center": staticMenPos[x],
            "shape": {"x": 0.5, "y": 0.4, "z": 1.3},
            "id": ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'men')).split('-')),
            "velocity": 0,
            "heading": staticMenHeading[x],
            "type": 2,
            "state": 0
        }
        staticMen.append(man)
    return staticMen

# ===============生成坐着的人===============



# ===============生成一个人的对象===============
def genPedestrianDict(amenPos, id):
    aman = {
        "center": amenPos['center'],
        "shape": {"x": 0.5, "y": 0.4, "z": 1.8},
        "id": id,
        "velocity": amenPos['velocity'],
        "heading": amenPos['heading'],
        "type": 2,
        "state": 0
    }
    return aman


# ===============生成行人===============
def genPedestrians():
    pedestrians = []
    pedestrianPosList = readF("行人路径.txt")

    # 1号行人
    pedestrianPosList1 = []
    pedestrian1 = []
    temp = calNormVehicle(pedestrianPosList[0][0], 9)
    pedestrianPosList1 = appendArr(pedestrianPosList1, temp)

    temp = calNormVehicle(pedestrianPosList[0][1], 7)
    pedestrianPosList1 = appendArr(pedestrianPosList1, temp)

    temp = calNormVehicle(pedestrianPosList[0][2], 22)
    pedestrianPosList1 = appendArr(pedestrianPosList1, temp)

    pedestrianID1 = ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'men')).split('-'))
    for x in range(len(pedestrianPosList1)):
        aman = genPedestrianDict(pedestrianPosList1[x], pedestrianID1)
        pedestrian1.append(aman)

    pedestrians.append(pedestrian1)

    # 2号行人
    pedestrianPosList2 = []
    pedestrian2 = []
    temp = calNormVehicle(pedestrianPosList[1][0], 10)
    pedestrianPosList2 = appendArr(pedestrianPosList2, temp)

    temp = calNormVehicle(pedestrianPosList[1][1], 8)
    pedestrianPosList2 = appendArr(pedestrianPosList2, temp)

    temp = calNormVehicle(pedestrianPosList[1][2], 22)
    pedestrianPosList2 = appendArr(pedestrianPosList2, temp)

    pedestrianID2 = ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'men')).split('-'))
    for x in range(len(pedestrianPosList2)):
        aman = genPedestrianDict(pedestrianPosList2[x], pedestrianID2)
        pedestrian2.append(aman)

    pedestrians.append(pedestrian2)

    # 3号行人
    pedestrianPosList3 = []
    pedestrian3 = []
    temp = calNormVehicle(pedestrianPosList[2][0], 9)
    pedestrianPosList3 = appendArr(pedestrianPosList3, temp)

    temp = calNormVehicle(pedestrianPosList[2][1], 28)
    pedestrianPosList3 = appendArr(pedestrianPosList3, temp)

    temp = calNormVehicle(pedestrianPosList[2][2], 14)
    pedestrianPosList3 = appendArr(pedestrianPosList3, temp)

    pedestrianID3 = ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'men')).split('-'))
    for x in range(len(pedestrianPosList3)):
        aman = genPedestrianDict(pedestrianPosList3[x], pedestrianID3)
        pedestrian3.append(aman)

    pedestrians.append(pedestrian3)

    # 4号行人
    pedestrianPosList4 = []
    pedestrian4 = []
    temp = calNormVehicle(pedestrianPosList[3][0], 12)
    pedestrianPosList4 = appendArr(pedestrianPosList4, temp)

    temp = calNormVehicle(pedestrianPosList[3][1], 5)
    pedestrianPosList4 = appendArr(pedestrianPosList4, temp)

    temp = calNormVehicle(pedestrianPosList[3][2], 12)
    pedestrianPosList4 = appendArr(pedestrianPosList4, temp)

    pedestrianID4 = ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'men')).split('-'))
    for x in range(len(pedestrianPosList4)):
        aman = genPedestrianDict(pedestrianPosList4[x], pedestrianID4)
        pedestrian4.append(aman)

    pedestrians.append(pedestrian4)


    # 5号行人 盲区1
    pedestrianPosList5 = []
    temp = calNormVehicle(pedestrianPosList[4][0], 4)
    pedestrianPosList5 = appendArr(pedestrianPosList5, temp)

    temp = calNormVehicle(pedestrianPosList[4][1], 41)
    pedestrianPosList5 = appendArr(pedestrianPosList5, temp)

    temp = calNormVehicle(pedestrianPosList[4][2], 20)
    pedestrianPosList5 = appendArr(pedestrianPosList5, temp)

    pedestrianID5 = ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'men')).split('-'))

    pedestrian5 = []
    for x in range(len(pedestrianPosList5)):
        aman = genPedestrianDict(pedestrianPosList5[x], pedestrianID5)
        pedestrian5.append(aman)

    pedestrians.append(pedestrian5)

    # 行人6 盲区2
    pedestrianPosList6 = []
    temp = calNormVehicle(pedestrianPosList[5][0], 52)
    pedestrianPosList6 = appendArr(pedestrianPosList6, temp)

    temp = calNormVehicle(pedestrianPosList[5][1], 13)
    pedestrianPosList6 = appendArr(pedestrianPosList6, temp)

    temp = calStopVehicle(8, pedestrianPosList[5][2][0][0], pedestrianPosList[5][2][1][0], pedestrianPosList[5][2][0][1], pedestrianPosList[5][2][1][1])
    pedestrianPosList6 = appendArr(pedestrianPosList6, temp)

    temp = calNormVehicle(pedestrianPosList[5][2], 12)
    pedestrianPosList6 = appendArr(pedestrianPosList6, temp)

    temp = calNormVehicle(pedestrianPosList[5][3], 66)
    pedestrianPosList6 = appendArr(pedestrianPosList6, temp)

    pedestrianID6 = ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'men')).split('-'))

    pedestrian6 = []
    for x in range(len(pedestrianPosList6)):
        aman = genPedestrianDict(pedestrianPosList6[x], pedestrianID6)
        pedestrian6.append(aman)

    pedestrians.append(pedestrian6)

    return pedestrians

# 获得所有行人对象数组
pedestrianList = genPedestrians()
print("pedestrianList: " + str(len(pedestrianList)))
# ===============生成行人===============


# ===============生成一个运动小汽车的对象===============
def genMoveCarDict(acarPos, id):
    acar = {
        "center": acarPos['center'],
        "shape": {"x": 3.9, "y": 1.8, "z": 1.4},
        "id": id,
        "velocity": acarPos['velocity'],
        "heading": acarPos['heading'],
        "type": 1,
        "state": 0
    }
    return acar

# ===============生成运动小汽车===============
def genMoveCars():
    moveCars = []
    moveCarPosList = readF("运动小汽车路径.txt")

    # 1号运动小汽车
    moveCarPosList1 = []
    moveCar1 = []
    temp = calNormVehicle(moveCarPosList[0][0], 46)
    moveCarPosList1 = appendArr(moveCarPosList1, temp)

    temp = calNormVehicle(moveCarPosList[0][1], 2)
    moveCarPosList1 = appendArr(moveCarPosList1, temp)

    temp = calNormVehicle(moveCarPosList[0][2], 12)
    moveCarPosList1 = appendArr(moveCarPosList1, temp)

    moveCarID1 = ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'moveCar')).split('-'))
    for x in range(len(moveCarPosList1)):
        acar = genMoveCarDict(moveCarPosList1[x], moveCarID1)
        moveCar1.append(acar)

    moveCars.append(moveCar1)

    # 2号运动小汽车
    moveCarPosList2 = []
    moveCar2 = []

    temp = calNormVehicle(moveCarPosList[1][0], 60)
    moveCarPosList2 = appendArr(moveCarPosList2, temp)

    temp = calStopVehicle(8, moveCarPosList[1][1][0][0], moveCarPosList[1][1][1][0], moveCarPosList[1][1][0][1], moveCarPosList[1][1][1][1])
    moveCarPosList2 = appendArr(moveCarPosList2, temp)

    temp = calNormVehicle(moveCarPosList[1][1], 7)
    moveCarPosList2 = appendArr(moveCarPosList2, temp)

    temp = calNormVehicle(moveCarPosList[1][2], 30)
    moveCarPosList2 = appendArr(moveCarPosList2, temp)

    moveCarID2 = ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'moveCar')).split('-'))
    for x in range(len(moveCarPosList2)):
        acar = genMoveCarDict(moveCarPosList2[x], moveCarID2)
        moveCar2.append(acar)

    moveCars.append(moveCar2)

    # 3号运动小汽车
    moveCarPosList3 = []
    moveCar3 = []
    temp = calNormVehicle(moveCarPosList[2][0], 15)
    moveCarPosList3 = appendArr(moveCarPosList3, temp)

    temp = calNormVehicle(moveCarPosList[2][1], 5)
    moveCarPosList3 = appendArr(moveCarPosList3, temp)

    temp = calNormVehicle(moveCarPosList[2][2], 14)
    moveCarPosList3 = appendArr(moveCarPosList3, temp)

    moveCarID3 = ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'moveCar')).split('-'))
    for x in range(len(moveCarPosList3)):
        acar = genMoveCarDict(moveCarPosList3[x], moveCarID3)
        moveCar3.append(acar)

    moveCars.append(moveCar3)

    # 4号运动小汽车
    moveCarPosList4 = []
    moveCar4 = []
    temp = calNormVehicle(moveCarPosList[3][0], 70)
    moveCarPosList4 = appendArr(moveCarPosList4, temp)

    temp = calNormVehicle(moveCarPosList[3][1], 11)
    moveCarPosList4 = appendArr(moveCarPosList4, temp)

    temp = calNormVehicle(moveCarPosList[3][2], 3)
    moveCarPosList4 = appendArr(moveCarPosList4, temp)

    moveCarID4 = ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'moveCar')).split('-'))
    for x in range(len(moveCarPosList4)):
        acar = genMoveCarDict(moveCarPosList4[x], moveCarID4)
        moveCar4.append(acar)

    moveCars.append(moveCar4)

    return moveCars

# 获得所有运动小汽车对象数组
moveCarList = genMoveCars()
print("moveCarList: " + str(len(moveCarList)))

# ===============生成运动车辆===============


# ===============生成运动卡车===============
def genMoveTrucks():
    moveTrucks = []
    moveTruckPosList = readF("运动卡车路径.txt")

    # 1号运动卡车
    moveTruckPosList1 = []
    moveTruck1 = []

    temp = calStopVehicle(224, moveTruckPosList[0][0][0][0], moveTruckPosList[0][0][1][0], moveTruckPosList[0][0][0][1], moveTruckPosList[0][0][1][1])
    moveTruckPosList1 = appendArr(moveTruckPosList1, temp)

    temp = calNormVehicle(moveTruckPosList[0][0], 20)
    moveTruckPosList1 = appendArr(moveTruckPosList1, temp)

    temp = calNormVehicle(moveTruckPosList[0][1], 120)
    moveTruckPosList1 = appendArr(moveTruckPosList1, temp)

    moveTruckID1 = ''.join(str(uuid.uuid5(uuid.NAMESPACE_DNS, 'moveTruck')).split('-'))
    for x in range(len(moveTruckPosList1)):
        atruck = {
            "center": moveTruckPosList1[x]['center'],
            "shape": {"x": 7, "y": 2.0, "z": 2.1},
            "id": moveTruckID1,
            "velocity": moveTruckPosList1[x]['velocity'],
            "heading": moveTruckPosList1[x]['heading'],
            "type": 4,
            "state": 0
        }
        moveTruck1.append(atruck)

    moveTrucks.append(moveTruck1)

    return moveTrucks


# 获得所有运动卡车对象数组
moveTruckList = genMoveTrucks()
print("moveTruckList: " + str(len(moveTruckList[0])))

# ===============生成运动卡车===============


# 合并数据
# 计算总帧数
fullFrameNum = len(vehicles)
fullFrameList = []


for i in range(fullFrameNum):
    # 时间戳
    timestamp = int(i * 1000 / FRAME_RATE)

    # objects
    objects = []
    # ==========================插入静止车辆==========================
    staticCars = genStaticCars()
    for j in range(len(staticCars)):
        carDict = staticCars[j];
        # 超车过程标记占道车辆
        if 1290 <= i < 1480:
            if j == 0:
                carDict["state"] = 1
        objects.append(carDict)

    staticTrucks = genStaticTrucks()
    for j in range(len(staticTrucks)):
        truckDict = staticTrucks[j]
        objects.append(truckDict)

    # ==========================插入坐着的人=============================
    #staticMen = genStaticMen()
    #for j in range(len(staticMen)):
    #    manDict = staticMen[j]
    #    objects.append(manDict)

    # ==========================插入行人==========================
    # 行人1
    p1 = pedestrianList[0]
    pLen = len(p1)
    pStart = 0
    if pStart <= i < pStart + pLen:
        objects.append(p1[i-pStart])

    # 行人2
    p2 = pedestrianList[1]
    pLen = len(p2)
    pStart = 0
    if pStart <= i < pStart + pLen:
        objects.append(p2[i-pStart])

    # 行人3
    p3 = pedestrianList[2]
    pLen = len(p3)
    pStart = 2140
    if pStart <= i < pStart + pLen:
        objects.append(p3[i-pStart])

    # 行人4
    p4 = pedestrianList[3]
    pLen = len(p4)
    pStart = 2300
    if pStart <= i < pStart + pLen:
        objects.append(p4[i-pStart])

    # 行人5
    p5 = pedestrianList[4]
    pLen = len(p5)
    pStart = 3260
    if pStart <= i < pStart + 400:
        p5[i-pStart]["state"] = 1
        objects.append(p5[i-pStart])
    elif pStart + 400 <= i < (pStart + pLen):
        objects.append(p5[i-pStart])

    # 行人6
    p6 = pedestrianList[5]
    pLen = len(p6)
    pStart = 3550
    if pStart <= i < pStart + 520:
        objects.append(p6[i-pStart])
    elif pStart + 520 <= i < pStart + 850:
        p6[i-pStart]["state"] = 2
        objects.append(p6[i - pStart])
    elif pStart + 850 <= i < (pStart + pLen):
        objects.append(p6[i-pStart])
    # ==========================插入行人==========================


    # ==========================插入运动小汽车==========================
    # 运动小汽车1
    mc1 = moveCarList[0]
    mcLen = len(mc1)
    mcStart = 0
    if mcStart <= i < mcStart + mcLen:
        objects.append(mc1[i-mcStart])
    # 运动小汽车2
    mc2 = moveCarList[1]
    mcLen = len(mc2)
    mcStart = 0
    if mcStart <= i < mcStart + mcLen:
        objects.append(mc2[i-mcStart])
    # 运动小汽车3
    mc3 = moveCarList[2]
    mcLen = len(mc3)
    mcStart = 870
    if mcStart <= i < mcStart + mcLen:
        objects.append(mc3[i-mcStart])
    # 运动小汽车4
    mc4 = moveCarList[3]
    mcLen = len(mc4)
    mcStart = 930
    if mcStart <= i < mcStart + mcLen:
        objects.append(mc4[i-mcStart])
    # ==========================插入运动小汽车==========================

    # ==========================插入运动卡车==========================
    # 运动卡车1
    mt1 = moveTruckList[0]
    mtLen = len(mt1)
    mtStart = 0
    if mtStart <= i < mtStart + mtLen:
        objects.append(mt1[i-mtStart])
    # ==========================插入运动卡车==========================


    # ==========================插入物流车==========================
    vehicle = vehicles[i]
    # ==========================插入物流车==========================

    fullFrameList.append(
        {
            "time_stamp": timestamp,
            "objects": objects,
            "vehicle": vehicle
        }
    )

writeF("fakedata.txt", fullFrameList)

