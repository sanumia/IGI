"""
LR 3 Standard data types, collections, functions, modules

Gorodetskaya Diana 25.03.2025

Task 5. Find the number of the maximum element of the list by modulus and the product
        of the elements located between the first and second zero elements
"""
def input_list():
    """Gets a list of numbers from user input, validates the input"""
    while True:
        try:
            input_str = input("Enter list elements separated by spaces: ")
            elements = list(map(float, input_str.split()))
            return elements
        except ValueError:
            print("Error: all elements must be numbers. Please try again.")

def find_max_abs_index(lst):
    """Finds the index of the element with maximum absolute value"""
    if not lst:
        return None
    max_abs = abs(lst[0])
    max_index = 0
    for i in range(1, len(lst)):
        if abs(lst[i]) > max_abs:
            max_abs = abs(lst[i])
            max_index = i
    return max_index

def product_between_zeros(lst):
    """Calculates the product of elements between first two zeros in the list"""
    try:
        first_zero = lst.index(0)
        second_zero = lst.index(0, first_zero + 1)
    except ValueError:
        return None
    
    if second_zero - first_zero <= 1:
        return None
    
    product = 1
    for num in lst[first_zero + 1 : second_zero]:
        product *= num
    return product

def print_list(lst):
    """Prints the current list"""
    print("Current list:", lst)