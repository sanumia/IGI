"""
LR 3 Standard data types, collections, functions, modules

Gorodetskaya Diana 25.03.2025

Task 3. Count the number of space characters in a line entered from the keyboard
"""
def count_spaces(text):
    
    count = sum(1 for char in text if char.isspace())
    print(f"Number of spaces: {count}")
    