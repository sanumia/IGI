import csv
import pickle
from datetime import datetime

class HistoricalEvent:
    """
    A class to represent a historical event with year and description.
    
    Attributes:
        year (int): The year when the event occurred
        event (str): Description of the historical event
        century (int): Calculated century of the event
    """
    
    def __init__(self, year, event):
        """
        Initialize a HistoricalEvent instance.
        
        Args:
            year (int): Year of the historical event
            event (str): Description of the event
        """
        self.year = year
        self.event = event
        self.century = (year - 1) // 100 + 1  # Calculate century
    
    def __repr__(self):
        """String representation of the historical event"""
        return f"{self.year}: {self.event} (century {self.century})"

class HistoryDatabase:
    """
    A class to manage a database of historical events with various operations.
    
    Attributes:
        events (list): List of HistoricalEvent objects
    """
    
    def __init__(self):
        """Initialize an empty HistoryDatabase"""
        self.events = []
    
    def add_event(self, year, event):
        """
        Add a new historical event to the database.
        
        Args:
            year (int): Year of the event
            event (str): Description of the event
        """
        self.events.append(HistoricalEvent(year, event))
    
    def find_by_century(self, century):
        """
        Find all events from a specific century.
        
        Args:
            century (int): Century to search for
            
        Returns:
            list: List of HistoricalEvent objects from specified century
        """
        return [event for event in self.events if event.century == century]
    
    def sort_by_year(self):
        """Sort events chronologically by year"""
        self.events.sort(key=lambda x: x.year)
    
    def sort_by_century(self):
        """Sort events first by century, then by year within each century"""
        self.events.sort(key=lambda x: (x.century, x.year))
    
    def save_to_csv(self, filename):
        """
        Save events to a CSV file.
        
        Args:
            filename (str): Path to the output CSV file
        """
        with open(filename, 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['Year', 'Event', 'Century'])
            for event in self.events:
                writer.writerow([event.year, event.event, event.century])
        print(f"Successfully saved {len(self.events)} events to {filename}")
    
    def load_from_csv(self, filename):
        """
        Load events from a CSV file.
        
        Args:
            filename (str): Path to the input CSV file
        """
        self.events = []
        try:
            with open(filename, 'r', encoding='utf-8') as file:
                reader = csv.reader(file)
                next(reader)  # Skip header row
                for row in reader:
                    if row:  # Check if row is not empty
                        year = int(row[0])
                        event = row[1]
                        self.events.append(HistoricalEvent(year, event))
            print(f"Successfully loaded {len(self.events)} events from {filename}")
        except FileNotFoundError:
            print(f"File {filename} not found. A new file will be created when saving.")
    
    def save_to_pickle(self, filename):
        """
        Save events to a binary pickle file.
        
        Args:
            filename (str): Path to the output pickle file
        """
        with open(filename, 'wb') as file:
            pickle.dump(self.events, file)
        print(f"Successfully pickled {len(self.events)} events to {filename}")
    
    def load_from_pickle(self, filename):
        """
        Load events from a binary pickle file.
        
        Args:
            filename (str): Path to the input pickle file
        """
        try:
            with open(filename, 'rb') as file:
                self.events = pickle.load(file)
            print(f"Successfully unpickled {len(self.events)} events from {filename}")
        except FileNotFoundError:
            print(f"File {filename} not found. A new file will be created when saving.")

def initialize_data():
    """
    Initialize the database with sample historical data about Belarus.
    
    Returns:
        HistoryDatabase: Pre-populated database with historical events
    """
    data = {
        862: "First mention of Polotsk",
        988: "Christianization of Rus'",
        1569: "Union of Lublin, creation of the Polish-Lithuanian Commonwealth",
        1795: "Third Partition of Poland, lands transferred to Russian Empire",
        1918: "Proclamation of the Belarusian People's Republic",
        1922: "Byelorussian SSR became part of the USSR",
        1945: "End of WWII, Byelorussian SSR as UN founding member",
        1991: "Declaration of Independence of the Republic of Belarus",
    }
    db = HistoryDatabase()
    for year, event in data.items():
        db.add_event(year, event)
    print("Initialized database with sample historical data")
    return db

def print_events(events):
    """
    Print a list of historical events in a formatted way.
    
    Args:
        events (list): List of HistoricalEvent objects to print
    """
    if not events:
        print("No events found.")
    else:
        print("\nHistorical Events:")
        for event in events:
            print(f"{event.year}: {event.event} (century {event.century})")
        print(f"Total events: {len(events)}")

def run_history_analyzer():
    """Run the historical events analyzer"""
    db = initialize_data()
    
    while True:
        print("\nHistorical Events Analyzer Menu:")
        print("1. Find events by century")
        print("2. Add new event")
        print("3. Sort events by year")
        print("4. Sort events by century and year")
        print("5. Save to CSV")
        print("6. Load from CSV")
        print("7. Save to pickle")
        print("8. Load from pickle")
        print("9. Show all events")
        print("0. Return to main menu")
        
        choice = input("Select an option: ")
        
        if choice == "1":
            try:
                century = int(input("Enter century number: "))
                events = db.find_by_century(century)
                print(f"\nEvents of the {century} century:")
                print_events(events)
            except ValueError:
                print("Error: please enter an integer for century.")
        
        elif choice == "2":
            try:
                year = int(input("Enter event year: "))
                event = input("Enter event description: ")
                db.add_event(year, event)
                print("Event added successfully!")
            except ValueError:
                print("Error: year must be a number.")
        
        elif choice == "3":
            db.sort_by_year()
            print("Events sorted by year.")
        
        elif choice == "4":
            db.sort_by_century()
            print("Events sorted by century and year.")
        
        elif choice == "5":
            db.save_to_csv('history.csv')
            print("Data saved to history.csv")
        
        elif choice == "6":
            db.load_from_csv('history.csv')
            print("Data loaded from history.csv")
        
        elif choice == "7":
            db.save_to_pickle('history.pkl')
            print("Data saved to history.pkl")
        
        elif choice == "8":
            db.load_from_pickle('history.pkl')
            print("Data loaded from history.pkl")
        
        elif choice == "9":
            print("\nAll events:")
            print_events(db.events)
        
        elif choice == "0":
            break
        
        else:
            print("Invalid input. Please try again.")