def initialize_from_generator(sequence):
    """A generator that returns the elements of a source sequence one by one"""
    print("\nGenerator processing (yielding values one by one)...")
    for num in sequence:
        yield num

def initialize_from_input(sequence):
    """Function for manual input, returns a new sequence"""
    print("\nManual input mode. Current sequence:", sequence)
    modified = []
    
    while True:
        user_input = input("Add a number (or 'done' to finish): ").strip()
        if user_input.lower() == 'done':
            break
        try:
            num = int(user_input)
            modified.append(num)
        except ValueError:
            print("Error! Please enter a valid integer or 'done'.")
    return sequence + modified