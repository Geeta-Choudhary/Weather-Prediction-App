from flask import Flask, request, jsonify
import joblib
import numpy as np
import requests
from datetime import datetime 
from collections import defaultdict

app = Flask(__name__)

model = joblib.load("model/random_forest_weather.pkl")
label_encoder = joblib.load("model/label_encoder.pkl")

API_KEY = "0d63b0619fa65a848b052aa60fc32767"  # Replace with your actual API key

def fetch_weather_data(city_name):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    if response.status_code == 200:
        return {
            "temperature": data['main']['temp'],
            "humidity": data['main']['humidity'],
            "pressure": data['main']['pressure'],
            "wind_speed": data['wind']['speed']
        }
    else:
        return {"error": data.get("message", "Error fetching weather data")}


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array([
        data['temperature'],
        data['humidity'],
        data['pressure'],
        data['wind_speed']
    ]).reshape(1, -1)

    prediction = model.predict(features)[0]
    label = label_encoder.inverse_transform([prediction])[0]

    return jsonify({"predicted_condition": label})

@app.route('/predict/city', methods=['POST'])
def predict_by_city():
    data = request.get_json()
    city = data.get('city')

    if not city:
        return jsonify({'error': 'City name is required'}), 400

    weather = fetch_weather_data(city)

    if "error" in weather:
        return jsonify(weather), 400

    features = np.array([
        weather['temperature'],
        weather['humidity'],
        weather['pressure'],
        weather['wind_speed']
    ]).reshape(1, -1)

    prediction = model.predict(features)[0]
    label = label_encoder.inverse_transform([prediction])[0]

    return jsonify({
        "city": city,
        "weather_data": weather,
        "predicted_condition": label
    })

@app.route('/forecast/7days', methods=['POST'])
def forecast_5_days():
    data = request.get_json()
    city = data.get('city')

    if not city:
        return jsonify({"error": "City name is required"}), 400

    forecast_url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(forecast_url)

    if response.status_code != 200:
        return jsonify({"error": "Could not fetch forecast"}), 500

    forecast_data = response.json().get("list", [])

    # Organize forecast by date
    grouped = defaultdict(list)
    for entry in forecast_data:
        date = entry["dt_txt"].split(" ")[0]
        grouped[date].append(entry)

    simplified = []
    for i, (date, day_entries) in enumerate(grouped.items()):
        if i >= 5:  # Limit to 5 days
            break

        temps = [e["main"]["temp"] for e in day_entries]
        pressures = [e["main"]["pressure"] for e in day_entries]
        humidities = [e["main"]["humidity"] for e in day_entries]
        wind_speeds = [e["wind"]["speed"] for e in day_entries]
        descriptions = [e["weather"][0]["description"] for e in day_entries]

        most_common_desc = max(set(descriptions), key=descriptions.count)

        simplified.append({
            "date": date,
            "avg_temperature": round(sum(temps) / len(temps), 2),
            "avg_pressure": round(sum(pressures) / len(pressures), 2),
            "avg_humidity": round(sum(humidities) / len(humidities), 2),
            "avg_wind_speed": round(sum(wind_speeds) / len(wind_speeds), 2),
            "common_weather_description": most_common_desc
        })

    return jsonify({
        "city": city,
        "5_day_forecast": simplified
    })


@app.route('/forecast/hourly', methods=['POST'])
def forecast_hourly():
    data = request.get_json()
    city = data.get('city')

    if not city:
        return jsonify({"error": "City name is required"}), 400

    forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(forecast_url)

    if response.status_code != 200:
        return jsonify({"error": "Could not fetch hourly forecast"}), 500

    forecast_list = response.json().get('list', [])

    hourly_forecast = []
    for item in forecast_list[:16]:  # Next 48 hours (16 x 3-hour intervals)
        temperature = item['main']['temp']
        humidity = item['main']['humidity']
        pressure = item['main']['pressure']
        wind_speed = item['wind']['speed']

        # Prepare features for prediction
        features = np.array([
            temperature,
            humidity,
            pressure,
            wind_speed
        ]).reshape(1, -1)

        prediction = model.predict(features)[0]
        predicted_label = label_encoder.inverse_transform([prediction])[0]

        hourly_forecast.append({
            "datetime": item['dt_txt'],
            "temperature": temperature,
            "humidity": humidity,
            "pressure": pressure,
            "wind_speed": wind_speed,
            "weather": item['weather'][0]['description'],
            "predicted_condition": predicted_label
        })

    return jsonify({
        "city": city,
        "hourly_forecast": hourly_forecast
    })






if __name__ == '__main__':
    app.run(debug=True)
