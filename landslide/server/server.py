import os
import datetime
import requests
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def get_history(area_type: str):
    filepath = 'static/history_0' + area_type + '.csv'
    try:
        df = pd.read_csv(filepath)
        lat = df['latitude'].tolist()
        lon = df['longitude'].tolist()
        ls_prob = df['ls_prob'].tolist()
    except:
        lat = None
        lon = None
        ls_prob = None
    return lat, lon, ls_prob

@app.route('/api/home')
def home():
    rain_total = pd.read_csv('static/rain_total.csv')
    area_name = rain_total['area_name'].tolist()
    rain_1d = rain_total['rain_1d'].tolist()
    rain_5d = rain_total['rain_5d'].tolist()
    ls_risk = rain_total['landslide_risk'].tolist()
    return jsonify({'datetime': datetime.datetime.now().strftime('%d/%m/%Y'), 'rain_1d': [f"{num:.1f}" for num in rain_1d], 'rain_5d': [f"{num:.1f}" for num in rain_5d], 'area_name': area_name,'ls_risk': [round(float(num), 2) for num in ls_risk]})

@app.route('/api/angkhang')
def angkhang():
    rain_station_csv = pd.read_csv('static/rain_station.csv')
    station_name = rain_station_csv[rain_station_csv['area_id'] == 1]['station_id'].tolist()
    rain_1d = rain_station_csv[rain_station_csv['area_id'] == 1]['rain_1d'].tolist()
    lat, lon, ls_prob = get_history('1')
    return jsonify({'datetime': datetime.datetime.now().strftime('%d/%m/%Y'), 'station_name': station_name, 'rain_1d': [round(float(num), 2) for num in rain_1d], 'lat': lat, 'lon': lon, 'ls_prob': ls_prob })

@app.route('/api/maekampong')
def maekampong():
    rain_station_csv = pd.read_csv('static/rain_station.csv')
    station_name = rain_station_csv[rain_station_csv['area_id'] == 2]['station_id'].tolist()
    rain_1d = rain_station_csv[rain_station_csv['area_id'] == 2]['rain_1d'].tolist()
    lat, lon, ls_prob = get_history('2')
    return jsonify({'datetime': datetime.datetime.now().strftime('%d/%m/%Y'), 'station_name': station_name, 'rain_1d': [round(float(num), 2) for num in rain_1d], 'lat': lat, 'lon': lon, 'ls_prob': ls_prob })

@app.route('/api/monjam')
def monjam():
    rain_station_csv = pd.read_csv('static/rain_station.csv')
    station_name = rain_station_csv[rain_station_csv['area_id'] == 3]['station_id'].tolist()
    rain_1d = rain_station_csv[rain_station_csv['area_id'] == 3]['rain_1d'].tolist()
    lat, lon, ls_prob = get_history('3')
    return jsonify({'datetime': datetime.datetime.now().strftime('%d/%m/%Y'), 'station_name': station_name, 'rain_1d': [round(float(num), 2) for num in rain_1d], 'lat': lat, 'lon': lon, 'ls_prob': ls_prob })

@app.route('/api/suthep')
def suthep():
    rain_station_csv = pd.read_csv('static/rain_station.csv')
    station_name = rain_station_csv[rain_station_csv['area_id'] == 4]['station_id'].tolist()
    rain_1d = rain_station_csv[rain_station_csv['area_id'] == 4]['rain_1d'].tolist()
    lat, lon, ls_prob = get_history('4')
    return jsonify({'datetime': datetime.datetime.now().strftime('%d/%m/%Y'), 'station_name': station_name, 'rain_1d': [round(float(num), 2) for num in rain_1d], 'lat': lat, 'lon': lon, 'ls_prob': ls_prob })

@app.route('/api/khunklang')
def khunklang():
    rain_station_csv = pd.read_csv('static/rain_station.csv')
    station_name = rain_station_csv[rain_station_csv['area_id'] == 5]['station_id'].tolist()
    rain_1d = rain_station_csv[rain_station_csv['area_id'] == 5]['rain_1d'].tolist()
    lat, lon, ls_prob = get_history('5')
    return jsonify({'datetime': datetime.datetime.now().strftime('%d/%m/%Y'), 'station_name': station_name, 'rain_1d': [round(float(num), 2) for num in rain_1d], 'lat': lat, 'lon': lon, 'ls_prob': ls_prob })

@app.route('/api/history')
def history():
    dates = []
    areas = []
    rains = []
    ls_probs = []
    files = os.listdir('static/history')
    for file in files:
        if file.endswith('.csv'):
            df = pd.read_csv('static/history/' + file)
            rain = round(df['IDW-5d'].max(),1)
            ls_prob = int(df['ls_prob'].max() * 100)
            date_str = file[:8]
            area_code = file[9:11]
            date = datetime.datetime.strptime(date_str, '%d%m%Y').strftime('%d/%m/%Y')
            areas.append(area_code)
            dates.append(date)
            rains.append(rain)
            ls_probs.append(ls_prob)
    for i in range(len(areas)):
        if areas[i] == "01":
            areas[i] = "อ่างขาง"
        elif areas[i] == "02":
            areas[i] = "แม่กำปอง"
        elif areas[i] == "03":
            areas[i] = "ม่อนแจ่ม"
        elif areas[i] == "04":
            areas[i] = "ดอยสุเทพปุย"
        elif areas[i] == "05":
            areas[i] = "ขุนกลาง"
    return jsonify({'area_name': areas, 'datetime': dates, 'rain5d': rains, 'ls_risk': ls_probs, 'filename': files})


@app.route('/api/history/<filename>')
def history_filename(filename):
    area_lat_lon = []
    area_code = filename[9:11]
    if area_code == "01":
        area_lat_lon = [19.901635393640483, 99.0424094582897]
    elif area_code == "02":
        area_lat_lon = [18.86555322762568, 99.34943132834088]
    elif area_code == "03":
        area_lat_lon = [18.939043235127237, 98.81246711157635]
    elif area_code == "04":
        area_lat_lon = [18.81638834589227, 98.89125771293459]
    elif area_code == "05":
        area_lat_lon = [18.540612605384062, 98.52361195667108]

    try:
        df = pd.read_csv(f'static/history/{filename}')
        lat = df['latitude'].tolist()
        lon = df['longitude'].tolist()
        ls_prob = df['ls_prob'].tolist()
    except:
        lat = None
        lon = None
        ls_prob = None

    return jsonify({'lat': lat, 'lon': lon, 'ls_prob': ls_prob, 'area_lat_lon': area_lat_lon }) 

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5050)
