import json
import pymysql
import os

def filename_search(dirname):
    filenames = os.listdir(dirname)
    for filename in filenames:
        if filename.endswith(".json"):
            #full_filename = os.path.join(dirname, filename)
            return filename

def fullname_search(dirname):
    filenames = os.listdir(dirname)
    for filename in filenames:
        if filename.endswith(".json"):
            full_filename = os.path.join(dirname, filename)
            return full_filename

conn = pymysql.connect(host='211.215.17.215', user='react',passwd='dlwnsqja13@$',db='react',charset='utf8')
full_filename = fullname_search('/root/')
file_time = filename_search('/root/')[:-5]
print(full_filename)
print(file_time)


with conn.cursor() as curs:
    with open(full_filename,encoding="UTF-8") as file:
        json_data =json.load(file)
        for i in json_data:
            try:
                #sql = """update""" +""" station set ID=%s, StationName=%s, StationLatitude=%s, StationLongitude=%s;"""
                #curs.execute(sql,(i['stationId'][3:],i['stationName'][4:],i['stationLatitude'],i['stationLongitude']))
                #conn.commit()

                sql = """insert into """ +"""station(ID,StationName,StationLatitude,StationLongitude) values(%s, %s, %s, %s) on duplicate key update ID=%s;"""
                curs.execute(sql,(i['stationId'][3:],i['stationName'][4:],i['stationLatitude'],i['stationLongitude'],i['stationId'][3:]))
                conn.commit()

            except pymysql.err.ProgrammingError:
                sql = """insert into """ +"""station(ID,StationName,StationLatitude,StationLongitude) values(%s, %s, %s, %s);"""
                curs.execute(sql,(i['stationId'][3:],i['stationName'][4:],i['stationLatitude'],i['stationLongitude']))
                print(sql)
                conn.commit()   
print(curs.rowcount, "개의 레코드가 입력되었습니다.")
conn.close()

conn = pymysql.connect(host='211.215.17.215', user='react',passwd='dlwnsqja13@$',db='react',charset='utf8')
with conn.cursor() as curs:
    with open(full_filename,encoding="UTF-8") as file:
        json_data =json.load(file)
        for i in json_data:
            try:
                sql = """insert into """ + """station_id_""" + i['stationId'][3:] +"""(ID,rackTotCnt,parkingBikeTotCnt,shared,Time) values(%s, %s, %s, %s, %s);"""
                #print(sql)
                curs.execute(sql,(i['stationId'][3:],i['rackTotCnt'],i['parkingBikeTotCnt'],i['shared'],file_time))
                conn.commit()

            except pymysql.err.ProgrammingError:
                sql = """create table """ + """station_id_""" + i['stationId'][3:] +""" (ID INT,rackTotCnt int(11),parkingBikeTotCnt int(11),shared int(11),Time bigint primary key,foreign key (ID) references station(ID) on update cascade);"""
                print(sql)
                curs.execute(sql)
                conn.commit()

                sql = """insert into """ + """station_id_""" + i['stationId'][3:] +"""(ID,rackTotCnt,parkingBikeTotCnt,shared,Time) values(%s, %s, %s, %s, %s);"""
                curs.execute(sql,(i['stationId'][3:],i['rackTotCnt'],i['parkingBikeTotCnt'],i['shared'],file_time))
                conn.commit()

            except pymysql.err.IntegrityError:
                sql = """delete from """ + """station_id_""" + i['stationId'][3:] +""" where Time=%s;"""
                print(sql)
                curs.execute(sql,file_time)
                conn.commit()
                sql = """insert into """ + """station_id_""" + i['stationId'][3:] +"""(ID,rackTotCnt,parkingBikeTotCnt,shared,Time) values(%s, %s, %s, %s, %s);"""
                #print(sql)
                curs.execute(sql,(i['stationId'][3:],i['rackTotCnt'],i['parkingBikeTotCnt'],i['shared'],file_time))
                conn.commit()
   
print(curs.rowcount, "개의 레코드가 입력되었습니다.")
conn.close()

os.remove(full_filename)

