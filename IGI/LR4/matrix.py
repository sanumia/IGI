import numpy as np
from abc import ABC, abstractmethod

class ArrayMixin:
    """Mixin class for array operations"""
    def show_array_info(self):
        """Display basic array information"""
        print(f"Array shape: {self.array.shape}, dtype: {self.array.dtype}")

class ArrayOperations(ABC):
    """Abstract base class for array operations"""
    @abstractmethod
    def generate_array(self):
        """Generate the array (must be implemented by subclasses)"""
        pass
    
    @property
    @abstractmethod
    def array(self):
        """Array property (must be implemented by subclasses)"""
        pass

class RandomArrayGenerator(ArrayOperations, ArrayMixin):
    """Random array generator with configurable dimensions and value range"""
    _instance_count = 0  # Class-level instance counter
    
    def __init__(self, rows, cols, min_val=0, max_val=100):
        """
        Initialize the array generator
        
        Args:
            rows (int): Number of rows
            cols (int): Number of columns
            min_val (int): Minimum random value
            max_val (int): Maximum random value
        """
        self._rows = rows
        self._cols = cols
        self._min_val = min_val
        self._max_val = max_val
        self._array = None
        RandomArrayGenerator._instance_count += 1
        
    def __str__(self):
        """String representation of the generator"""
        return f"Array generator {self._rows}x{self._cols}"
    
    def __len__(self):
        """Total number of elements in the array"""
        return self._rows * self._cols
    
    @property
    def rows(self):
        """Get number of rows"""
        return self._rows
    
    @rows.setter
    def rows(self, value):
        """Set number of rows (must be positive)"""
        if value <= 0:
            raise ValueError("Number of rows must be positive")
        self._rows = value
    
    @property
    def cols(self):
        """Get number of columns"""
        return self._cols
    
    @cols.setter
    def cols(self, value):
        """Set number of columns (must be positive)"""
        if value <= 0:
            raise ValueError("Number of columns must be positive")
        self._cols = value
    
    @property
    def array(self):
        """Get the generated array (generates if not exists)"""
        if self._array is None:
            self.generate_array()
        return self._array
    
    def generate_array(self):
        """Generate a random integer array"""
        self._array = np.random.randint(
            self._min_val, self._max_val, 
            size=(self._rows, self._cols)
        )
    
    @classmethod
    def get_instance_count(cls):
        """Get total number of instances created"""
        return cls._instance_count

class ArrayAnalyzer(RandomArrayGenerator):
    """Array analyzer with mathematical operations and statistics"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._even_count = None
        self._odd_count = None
    
    def __add__(self, other):
        """
        Override + operator for array concatenation
        
        Args:
            other (ArrayAnalyzer): Another array to concatenate with
            
        Returns:
            numpy.ndarray: Concatenated array or None if incompatible
        """
        if not isinstance(other, ArrayAnalyzer):
            return NotImplemented
        
        try:
            if self.array.shape[1] == other.array.shape[1]:
                return np.vstack((self.array, other.array))
            elif self.array.shape[0] == other.array.shape[0]:
                return np.hstack((self.array, other.array))
            else:
                print("Error: Array dimensions incompatible for concatenation")
                return None
        except ValueError as e:
            print(f"Concatenation error: {e}")
            return None
    
    def analyze(self):
        """Analyze array for even/odd counts"""
        even_mask = self.array % 2 == 0
        self._even_count = np.sum(even_mask)
        self._odd_count = self.array.size - self._even_count
        
    @property
    def even_count(self):
        """Get count of even numbers (analyzes if needed)"""
        if self._even_count is None:
            self.analyze()
        return self._even_count
    
    @property
    def odd_count(self):
        """Get count of odd numbers (analyzes if needed)"""
        if self._odd_count is None:
            self.analyze()
        return self._odd_count
    
    def calculate_stats(self):
        """
        Calculate basic statistics for the array
        
        Returns:
            dict: Dictionary of statistical measures
        """
        return {
            'mean': np.mean(self.array),
            'median': np.median(self.array),
            'variance': np.var(self.array),
            'std': np.std(self.array),
        }
    
    def calculate_correlation(self):
        """
        Calculate correlation between even and odd elements
        
        Returns:
            float: Correlation coefficient or None if insufficient data
        """
        even_elements = self.array[self.array % 2 == 0]
        odd_elements = self.array[self.array % 2 != 0]
        
        min_len = min(len(even_elements), len(odd_elements))
        if min_len < 2:
            return None
        
        corr_matrix = np.corrcoef(
            even_elements[:min_len], 
            odd_elements[:min_len]
        )
        return corr_matrix[0, 1]

def demonstrate_numpy_features():
    """Demonstrate core NumPy features"""
    print("\n=== NumPy Features Demonstration ===")
    
    # 1. Array creation
    print("\n1. Array creation:")
    arr1 = np.array([1, 2, 3])
    print("np.array([1, 2, 3]):", arr1)
    
    # 2. Special arrays
    print("\n2. Special arrays:")
    print("Zeros array (2x3):\n", np.zeros((2, 3)))
    print("Ones array (2x2):\n", np.ones((2, 2)))
    print("Identity matrix (3x3):\n", np.eye(3))
    
    # 3. Indexing and slicing
    print("\n3. Indexing and slicing:")
    arr2 = np.arange(12).reshape(3, 4)
    print("Original array:\n", arr2)
    print("First element:", arr2[0, 0])
    print("Last row:", arr2[-1])
    print("Slice [1:3, 0:2]:\n", arr2[1:3, 0:2])
    
    # 4. Element-wise operations
    print("\n4. Element-wise operations:")
    a = np.array([1, 2, 3])
    b = np.array([4, 5, 6])
    print("a + b:", a + b)
    print("a * b:", a * b)
    print("a squared:", a ** 2)
