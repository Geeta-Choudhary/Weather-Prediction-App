import pandas as pd

# List of cities to be added (Cities from China, India, Pakistan, UK, Russia)
new_cities = {
    'China': ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu'],
    'India': ['Delhi', 'Mumbai', 'Kolkata', 'Bangalore', 'Chennai'],
    'Pakistan': ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar'],
    'UK': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Edinburgh'],
    'Russia': ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Nizhny Novgorod']
}

# Flatten the dictionary into a list of cities
cities_to_add = [city for country in new_cities.values() for city in country]

# List of CSV files to be merged
csv_files = [
    "humidity.csv",
    "pressure.csv",
    "temperature.csv",
    "weather_description.csv",
    "wind_speed.csv"
]


# Function to add new cities to a dataframe
def add_new_cities_to_df(df):
    for city in cities_to_add:
        if city not in df.columns:
            df[city] = None  # Add new column with None as the default value
    return df


# List to hold dataframes after modification
dataframes = []

# Read the first CSV to get the 'datetime' column (reference)
first_df = pd.read_csv(csv_files[0])
first_df.columns = first_df.columns.str.strip()  # Clean up column names
first_df['datetime'] = first_df['datetime'].str.strip()  # Clean 'datetime' column
first_df['datetime'] = pd.to_datetime(first_df['datetime'], errors='coerce')  # Convert to datetime

# Add new cities to the first dataframe
first_df = add_new_cities_to_df(first_df)

# Add the first dataframe to the list
dataframes.append(first_df)

# Process the rest of the CSV files
for csv_file in csv_files[1:]:
    df = pd.read_csv(csv_file)

    # Strip any leading or trailing whitespace from column names
    df.columns = df.columns.str.strip()

    # Check if 'datetime' column exists and clean it by stripping spaces
    if 'datetime' in df.columns:
        df['datetime'] = df['datetime'].str.strip()  # Remove any leading/trailing spaces or non-visible characters

    # Ensure 'datetime' is of datetime type
    if 'datetime' in df.columns:
        df['datetime'] = pd.to_datetime(df['datetime'],
                                        errors='coerce')  # Convert to datetime, invalid parsing will return NaT (Not a Time)

    # Add new cities to the dataframe
    df = add_new_cities_to_df(df)

    # Rename the columns with a suffix to avoid conflict (file name is used as the suffix)
    suffix = csv_file.split('.')[0]  # Get the file name without extension (e.g., "pressure", "temperature")
    df = df.rename(columns={col: f"{col}_{suffix}" if col != 'datetime' else col for col in df.columns})

    # Add the dataframe to the list
    dataframes.append(df)

# Now merge all dataframes sequentially, ensuring no conflicts
merged_df = dataframes[0]
for df in dataframes[1:]:
    merged_df = pd.merge(merged_df, df, on="datetime", how="outer")

# Save the merged dataframe to a new CSV
merged_df.to_csv("merged_weather_data.csv", index=False)

print("Merged weather data saved as 'merged_weather_data.csv'")
