"""
LR 3 Standard data types, collections, functions, modules

Gorodetskaya Diana 25.03.2025

Task 2. Create a loop that takes integers from the keyboard and counts the number of even numbers
"""

def count_par(numbers):
    """
    Counts even numbers in a sequence that grows with user input.
    Stops when user enters a number >1000.
    Returns count of even numbers (excluding the terminating number).
    """
    while True:
        try:
            num = int(input("Enter a number (>1000 to finish): "))
            
            if num > 1000:
                even_count = sum(1 for x in numbers if x % 2 == 0)
                print(f"\nFinal sequence: {numbers}")
                print(f"Count of even numbers: {even_count}")
                return even_count
            
            numbers.append(num)
            print(f"Current sequence: {numbers}")
            
        except ValueError:
            print("Please enter a valid integer!")
