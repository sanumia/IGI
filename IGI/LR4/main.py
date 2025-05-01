from analyze_text import TextAnalyzer, run_text_analyzer
from external_task import analyze_spotify_data, load_spotify_data
from figure import task4
from history_info import run_history_analyzer
from matrix import ArrayAnalyzer, demonstrate_numpy_features
from power_row import task3

def main():
    while True:
        print("\nMain Menu:")
        print("1. Analyze historical events")
        print("2. Analyze text")
        print("3. Analyze function")
        print("4. Draw a triangle") 
        print("5. Matrix operations")
        print("6. Extra Task (Spotify data analysis)")
        print("0. Exit")
        
        choice = input("Select a program to run: ")
        
        if choice == "1":
            run_history_analyzer()
        elif choice == "2":
            run_text_analyzer()
        elif choice == "3":
            task3() 
        elif choice == "4":
            task4()
        elif choice == "5":
            # Create a 5x5 matrix with random numbers from 0 to 100
            analyzer = ArrayAnalyzer(5, 5, 0, 100)
            
            # Display the matrix
            print("\nGenerated matrix:")
            print(analyzer.array)
            
            # 1. Count even and odd numbers
            print(f"\nNumber of even numbers: {analyzer.even_count}")
            print(f"Number of odd numbers: {analyzer.odd_count}")
            
            # 2. Calculate correlation coefficient
            correlation = analyzer.calculate_correlation()
            if correlation is not None:
                print(f"\nCorrelation coefficient between even and odd elements: {correlation:.4f}")
            else:
                print("\nNot enough data to calculate correlation")
            
            # 3. Calculate mathematical and statistical indicators
            stats = analyzer.calculate_stats()
            print("\nMathematical and statistical indicators:")
            print(f"Mean: {stats['mean']:.2f}")
            print(f"Median: {stats['median']:.2f}")
            print(f"Variance: {stats['variance']:.2f}")
            print(f"Standard deviation: {stats['std']:.2f}")
            
            
            # Demonstrate NumPy features
            demonstrate_numpy_features()
            
        elif choice == "6":
            # Try with default path first
            spotify_data = load_spotify_data()
            
            # If failed, try with the specific path
            if spotify_data is None:
                custom_path = 'C:/university/igi/353501_GORODETSKAYA_4/IGI/LR4/spotify_top_1000_tracks.csv'
                print(f"\nTrying with custom path: {custom_path}")
                spotify_data = load_spotify_data(custom_path)
            
            # Perform analysis if data loaded successfully
            if spotify_data is not None:
                analyze_spotify_data(spotify_data)
            else:
                print("\nFailed to load Spotify data. Possible reasons:")
                print("- File not found in expected locations")
                print("- Required columns missing in the dataset")
                print("- File might be corrupted")
                print("\nPlease ensure:")
                print("1. The CSV file exists in the specified path")
                print("2. It contains these required columns: popularity, duration_ms, track_name, artist")
                
        elif choice == "0":
            print("Exiting the program.")
            break
        else:
            print("Invalid input. Please try again.")

if __name__ == "__main__":
    main()