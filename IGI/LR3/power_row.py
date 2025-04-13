"""
LR 3 Standard data types, collections, functions, modules

Gorodetskaya Diana 25.03.2025

Task 1. Program for calculating the values ​​of the function c using the expansion of the function in a power series
"""
import math
import time
from functools import wraps

def handle_errors(func):
    """Decorator for error handling"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ValueError as e:
            print(f"Error: {e}")
            return None, None
        except Exception as e:
            print(f"Unexpected error: {e}")
            return None, None
    return wrapper

def log_execution(func):
    """Decorator for execution logging"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"\nExecuting {func.__name__}...")
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Execution completed in {end_time - start_time:.4f} seconds")
        return result
    return wrapper

def print_table_header():
    """Display the results table header"""
    print("\nCalculation progress:")
    print("|     x     |     n     |      F(x)     |  Math F(x)  |     eps     |")
    print("|-----------|-----------|---------------|-------------|------------|")

@handle_errors
@log_execution
def ln_1_minus_x(x, eps, max_iter=500):
    """
    Calculate ln(1-x) using power series expansion
    
    Args:
        x: Input value (|x| < 1)
        eps: Desired precision (constant)
        max_iter: Maximum iterations (default: 500)
    
    Returns:
        Tuple (approximation, iterations_used)
    """
    if abs(x) >= 1:
        raise ValueError("|x| must be < 1 for series convergence")
    
    result = 0.0
    exact = math.log(1 - x)
    print_table_header()
    
    for n in range(1, max_iter + 1):
        term = -(x**n)/n
        result += term
        
        print(f"| {x:9.6f} | {n:9d} | {result:13.8f} | {exact:11.8f} | {eps:10.2e} |")
        
        if abs(term) < eps:
            print("\nDesired precision achieved!")
            return result, n
    
    print(f"\nWarning: Max iterations ({max_iter}) reached without achieving precision")
    return result, max_iter

@handle_errors
@log_execution
def get_user_input():
    """Get and validate user input"""
    print("\nPower Series Calculation")
    print("-----------------------")
    
    try:
        x = float(input("Enter x value (|x| < 1): "))
        if abs(x) >= 1:
            raise ValueError("Invalid x value (must satisfy |x| < 1)")
            
        eps = float(input("Enter desired precision (e.g., 0.0001): "))
        if eps <= 0:
            raise ValueError("Precision must be positive")
            
        return x, eps
        
    except ValueError as e:
        print(f"Input error: {e}")
        return None, None

# Main execution
if __name__ == "__main__":
    x, eps = get_user_input()
    if x is not None and eps is not None:
        result, n = ln_1_minus_x(x, eps)
        if result is not None:
            print(f"\nFinal result for ln(1-{x:.6f}):")
            print(f"Approximation: {result:.8f}")
            print(f"Exact value: {math.log(1 - x):.8f}")
            print(f"Iterations used: {n}")
            print(f"Target precision: {eps:.2e}")