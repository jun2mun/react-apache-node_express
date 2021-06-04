import requests
import json
import datetime
## parameters ##
API_KEY = "6e484a62436a756e3834754e734341"
URL = "http://openapi.seoul.go.kr:8088/"
TYPE = "/json/"

## 1 ~ 100 station##
now = datetime.datetime.now()
filename = str(now)[:4] +str(now)[5:7] + str(now)[8:10] + str(now)[11:13] +str(now)[14:16] + str(now)[17:19] + ".json"


response = requests.get(URL + API_KEY + TYPE + "bikeList/1/1000/")
result_1 = response.json()
## 1000 ~ 1471 station ##

response = requests.get(URL + API_KEY + TYPE + "bikeList/1001/1471/")
result_2 = response.json()

## one cycle (request) ##
result = result_1['rentBikeStatus']['row'] + result_2['rentBikeStatus']['row']


## save file to json ##
with open(filename,"w+",encoding="UTF-8") as file:
    file.write(json.dumps(result,ensure_ascii=False))

