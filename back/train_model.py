import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import joblib

# Load merged dataset
df = pd.read_csv("data/merged_weather_data.csv")  # Use a cleaned, merged file

# Drop missing
df.dropna(inplace=True)

# Encode labels
le = LabelEncoder()
df['condition_encoded'] = le.fit_transform(df['condition'])

# Features and target
X = df[['temperature', 'humidity', 'pressure', 'wind_speed']]
y = df['condition_encoded']

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
print("Accuracy:", accuracy_score(y_test, model.predict(X_test)))

# Save model & label encoder
joblib.dump(model, 'backend/model/random_forest_weather.pkl')
joblib.dump(le, 'backend/model/label_encoder.pkl')
