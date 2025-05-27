from abc import ABC, abstractmethod
import math
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon
import numpy as np

class ColorMixin:
    """Mixin for adding color to a figure"""
    def __init__(self):
        self._color = None
    
    @property
    def color(self):
        """Color getter"""
        return self._color
    
    @color.setter
    def color(self, value):
        """Color setter"""
        if not isinstance(value, str):
            raise ValueError("Color must be a string")
        self._color = value

class GeometricFigure(ABC):
    """Abstract base class for geometric figures"""
    FIGURE_NAME = "Geometric figure"
    
    @abstractmethod
    def area(self):
        """Abstract method for calculating area"""
        pass
    
    def get_info(self):
        """Returns information about the figure"""
        return f"{self.FIGURE_NAME} of {self.color} color. Area: {self.area():.2f}"

class Triangle(GeometricFigure, ColorMixin):
    """Triangle class with two sides and the included angle"""
    FIGURE_NAME = "Triangle"
    
    def __init__(self, side_a, side_b, angle_c, color="black"):
        super().__init__()
        self.side_a = side_a
        self.side_b = side_b
        self.angle_c = angle_c
        self.color = color

    @property
    def side_a(self):
        return self._side_a
    
    @side_a.setter
    def side_a(self, value):
        if value <= 0:
            raise ValueError("Side length must be positive")
        self._side_a = value
    
    @property
    def side_b(self):
        return self._side_b
    
    @side_b.setter
    def side_b(self, value):
        if value <= 0:
            raise ValueError("Side length must be positive")
        self._side_b = value
    
    @property
    def angle_c(self):
        return self._angle_c
    
    @angle_c.setter
    def angle_c(self, value):
        if not (0 < value < 180):
            raise ValueError("Angle must be between 0 and 180 degrees")
        self._angle_c = value
    
    def area(self):
        """Calculate area using two sides and the included angle"""
        return 0.5 * self.side_a * self.side_b * math.sin(math.radians(self.angle_c))
    
    def get_third_side(self):
        """Calculate the third side using the law of cosines"""
        return math.sqrt(
            self.side_a**2 + self.side_b**2 - 
            2*self.side_a*self.side_b*math.cos(math.radians(self.angle_c))
        )
    
    def get_info(self):
        """Override method with additional information"""
        info = super().get_info()
        return (f"{info}\nSides: a={self.side_a}, b={self.side_b}, c={self.get_third_side():.2f}\n"
                f"Angle C: {self.angle_c}°")
    
    def draw(self, title=""):
        """Plot and display the triangle"""
        # Calculate vertex coordinates
        angle_rad = math.radians(self.angle_c)
        x = [0, self.side_a, self.side_b * math.cos(angle_rad)]
        y = [0, 0, self.side_b * math.sin(angle_rad)]
        
        fig, ax = plt.subplots()
        triangle = Polygon(list(zip(x, y)), closed=True, 
                          fill=True, color=self.color, alpha=0.5)
        ax.add_patch(triangle)
        
        # Figure caption
        ax.text(0.5, -0.1, title, ha='center', va='center')
        
        # Display settings
        ax.set_xlim(min(x)-1, max(x)+1)
        ax.set_ylim(min(y)-1, max(y)+1)
        ax.set_aspect('equal')
        ax.grid(True)
        ax.set_title(f"Triangle of {self.color} color")
        
        plt.show()
        fig.savefig("triangle.png")
        return fig

def input_float(prompt, min_val=None, max_val=None):
    """Input number with validation"""
    while True:
        try:
            value = float(input(prompt))
            if (min_val is not None and value < min_val) or (max_val is not None and value > max_val):
                print(f"Error: value must be between {min_val} and {max_val}")
                continue
            return value
        except ValueError:
            print("Error: please enter a number")

def task4():
    """Main function for task 4"""
    print("\nCreating a triangle")
    side_a = input_float("Enter length of side a (greater than 0): ", 0)
    side_b = input_float("Enter length of side b (greater than 0): ", 0)
    angle_c = input_float("Enter angle between sides a and b in degrees (0-180): ", 0, 180)
    color = input("Enter triangle color: ")
    title = input("Enter caption for the triangle: ")
    
    try:
        triangle = Triangle(side_a, side_b, angle_c, color)
        print("\n" + triangle.get_info())
        triangle.draw(title)
        print("Triangle saved to triangle.png file")
    except ValueError as e:
        print(f"Error: {e}")