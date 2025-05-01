import pandas as pd
import numpy as np

def load_spotify_data(file_path='spotify_top_1000_tracks.csv'):
    """Load and prepare Spotify dataset"""
    try:
        df = pd.read_csv(file_path)
        
        # Check if required columns exist
        required_columns = {'track_name', 'artist', 'popularity', 'duration_min'}
        if not required_columns.issubset(df.columns):
            missing = required_columns - set(df.columns)
            print(f"Missing required columns: {missing}")
            print("Available columns:", df.columns.tolist())
            return None
            
        # No need for duration conversion since it's already in minutes
        return df
    
    except Exception as e:
        print(f"Error loading data: {e}")
        return None

def analyze_spotify_data(df):
    """Perform complete analysis of Spotify data according to requirements"""
    if df is None:
        return
    
    print("\n=== Spotify Data Analysis ===")
    
    # Task a: Pandas Basics
    print("\n--- Part a: Pandas Basics ---")
    
    # 1. Pandas import (implicit in the code)
    print("\n1. Pandas imported successfully")
    
    # 2-3. Create Series from popularity column
    popularity_series = pd.Series(df['popularity'].values, 
                                index=df['track_name'],
                                name='Track Popularity')
    print("\n2-3. Created Popularity Series:")
    print(popularity_series.head())
    
    # 4. Display demonstration
    print("\n4. Display example (shows first 5 tracks):")
    print(popularity_series.head())
    
    # 5. Series indexing
    print("\n5. Series Indexing Examples:")
    print("First track popularity (iloc):", popularity_series.iloc[0])
    print("Random track popularity (loc):", popularity_series.loc[popularity_series.index[40]])
    
    # 6. Create DataFrame subset
    print("\n6. DataFrame Creation Example:")
    sample_df = df[['track_name', 'artist', 'popularity', 'duration_min']].head()
    print(sample_df)
    
    # Task b: DataFrame Operations
    print("\n--- Part b: DataFrame Operations ---")
    
    # 2. DataFrame information
    print("\n2. DataFrame Information:")
    print(f"Shape: {df.shape} (rows, columns)")
    print("\nData types:")
    print(df.dtypes)
    print("\nDescriptive statistics:")
    print(df[['popularity', 'duration_min']].describe())
    
    # 5. Statistical comparison
    print("\n5. Statistical Comparison:")
    
    # Get most/least popular tracks
    max_pop = df['popularity'].max()
    min_pop = df['popularity'].min()
    
    # Calculate average duration for each group
    avg_dur_max_pop = df[df['popularity'] == max_pop]['duration_min'].mean()
    avg_dur_min_pop = df[df['popularity'] == min_pop]['duration_min'].mean()
    
    # Calculate ratio
    ratio = avg_dur_max_pop / avg_dur_min_pop if avg_dur_min_pop != 0 else np.nan
    
    print(f"Most popular tracks (popularity={max_pop}):")
    print(f"- Average duration: {avg_dur_max_pop:.2f} minutes")
    print(f"- Example track: {df[df['popularity'] == max_pop]['track_name'].iloc[0]}")
    
    print(f"\nLeast popular tracks (popularity={min_pop}):")
    print(f"- Average duration: {avg_dur_min_pop:.2f} minutes")
    print(f"- Example track: {df[df['popularity'] == min_pop]['track_name'].iloc[0]}")
    
    print(f"\nRatio of durations (most popular/least popular): {ratio:.2f}")

