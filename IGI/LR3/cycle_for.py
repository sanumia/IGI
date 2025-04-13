"""
LR 3 Standard data types, collections, functions, modules

Gorodetskaya Diana 25.03.2025

Task 2. Create a loop that takes integers from the keyboard and counts the number of even numbers
"""

def count_par(numbers):
    """Count even numbers in subsequence"""
    print("\nSequence to analyze:", numbers)
    even_count = sum(1 for num in numbers if num % 2 == 0)
    
    while True:
        try:
            user_num = int(input("Enter a check number (>1000 to show result): "))
            if user_num > 1000:
                print("Total even numbers:", even_count)
                return even_count
            print("Number must be >1000. Try again.")
        except ValueError:
            print("Invalid input! Enter an integer.")


