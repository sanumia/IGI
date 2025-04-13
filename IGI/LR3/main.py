"""
LR 3 Standard data types, collections, functions, modules
Gorodetskaya Diana 25.03.2025
Main program for laboratory work 3
"""

import math
from functools import wraps

from analyze_text import count_str
from power_row import get_user_input, handle_errors, ln_1_minus_x, log_execution
from cycle_for import count_par
from generator import initialize_from_generator, initialize_from_input
from count_space import count_spaces
from real_list import input_list, find_max_abs_index, product_between_zeros, print_list


def main():
    while True:
        print("\nMain Menu:")
        print("1. Calculate power series (ln(1-x))")
        print("2. Sum of a sequence of numbers")
        print("3. Count spaces in text")
        print("4. Analyze text")
        print("5. Work with list of real numbers")
        print("6. Exit")
        
        choice = input("Enter your choice (1-6): ").strip()
        
        if choice == '1':
            x, eps = get_user_input()
            if x is None or eps is None:
                continue
            result, terms = ln_1_minus_x(x, eps)
            if result is not None:
                print(f"\nFinal result: {result:.8f}")
                print(f"Iterations: {terms}")
                print(f"Exact value: {math.log(1 - x):.8f}")
                print(f"Difference: {abs(result - math.log(1 - x)):.2e}")
                
        elif choice == '2':
            while True:
                input_str = input("Enter initial numbers separated by spaces: ").strip()
                try:
                    initial_sequence = list(map(int, input_str.split()))
                    break
                except ValueError:
                    print("Error! Enter integers only.")

            print("\nChoose initialization method:")
            print("1. Generator (process one by one)")
            print("2. Manual input (add numbers interactively)")

            while True:
                choice = input("> ").strip()
                if choice == '1':

                    gen = initialize_from_generator(initial_sequence)
                    processed = list(gen)  
                    count_par(processed)
                    break
                elif choice == '2':
     
                    modified_sequence = initialize_from_input(initial_sequence)
                    count_par(modified_sequence)
                    break
                else:
                    print("Invalid choice. Enter 1 or 2.")

        elif choice == '3':
            text = input("Enter text to analyze: ")
            count_spaces(text)
            
        elif choice == '4':
            sample_text = "So she was considering in her own mind, as well as she could, for the hot day made her feel very sleepy and stupid, whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her."  # Your full text here
            short_count, smallest_d, sorted_words = count_str(sample_text)
            print(f"Words shorter than 5 characters: {short_count}")
            print(f"Smallest word ending with 'd': {smallest_d}")
            print("Words sorted by length (descending):")
            print(', '.join(sorted_words))
            
        elif choice == '5':
            numbers = input_list()
            print_list(numbers)
            
            max_index = find_max_abs_index(numbers)
            if max_index is not None:
                print(f"Index of maximum absolute value: {max_index}")
            else:
                print("List is empty")
                
            product = product_between_zeros(numbers)
            if product is not None:
                print(f"Product between zeros: {product}")
            else:
                print("No two zeros found in the list")
                
        elif choice == '6':
            print("Exiting program...")
            break
            
        else:
            print("Invalid choice. Please enter a number between 1 and 6")

if __name__ == "__main__":
    main()