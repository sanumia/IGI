import math
from statistics import median, mode, variance, stdev
from matplotlib import pyplot as plt
import numpy as np
from tabulate import tabulate

class SequenceAnalyzer:
    def __init__(self, sequence):
        self.sequence = sequence

    def calculate_mean(self):
        return sum(self.sequence) / len(self.sequence)

    def calculate_median(self):
        return median(self.sequence)

    def calculate_mode(self):
        return mode(self.sequence)

    def calculate_variance(self):
        return variance(self.sequence)

    def calculate_standard_deviation(self):
        return stdev(self.sequence)

def calculate_actual_value(x):
    return math.log(1 - x)

class SequenceCalculator(SequenceAnalyzer):
    def __init__(self, max_iterations, eps):
        super().__init__([])
        self.max_iterations = max_iterations
        self.eps = eps

    def calculate_sequence(self, x):
        result = 0
        n = 1
        term = -x
        while abs(term) > self.eps and n <= self.max_iterations:
            result += term
            term = - (x ** (n + 1)) / (n + 1)
            self.sequence.append(result)
            n += 1
        return result

    def generate_table(self, x, result, actual_value):
        table_data = [[x, len(self.sequence), result, actual_value, self.eps]]
        table_headers = ["x", "Iterations", "F(x)", "Mathematical F(x)", "Precision"]
        return tabulate(table_data, headers=table_headers, floatfmt=".8f")

def task3():
    max_iterations = 500
    
    while True:
        try:
            x = float(input("Enter x (from -1 to 1, excluding 1): "))
            if -1 <= x < 1:
                break
            print("Error: x must be in range [-1, 1). Please try again.")
        except ValueError:
            print("Error: Please enter a number.")
    
    while True:
        try:
            eps = float(input("Enter eps (positive number less than 1): "))
            if 0 < eps < 1:
                break
            print("Error: eps must be in range (0, 1). Please try again.")
        except ValueError:
            print("Error: Please enter a number.")

    calculator = SequenceCalculator(max_iterations, eps)
    result = calculator.calculate_sequence(x)
    actual_value = calculate_actual_value(x)
    
    print(calculator.generate_table(x, result, actual_value))
    print("Arithmetic mean:", calculator.calculate_mean())
    print("Median:", calculator.calculate_median())
    print("Mode:", calculator.calculate_mode())
    print("Variance:", calculator.calculate_variance())
    print("Standard deviation:", calculator.calculate_standard_deviation())

    x_values = np.linspace(0, 1, len(calculator.sequence))
    y_values = calculator.sequence

    plt.plot(x_values, y_values, color="blue", label="Series")
    plt.plot(x_values, [actual_value] * len(calculator.sequence), color="red",
             linestyle="--", label="Mathematical F(x)")
    plt.xlabel('n')
    plt.ylabel('F(x)')
    plt.legend()
    plt.grid(True)
    plt.title("Function series expansion graph")
    plt.savefig("Task3.png")
    plt.show()