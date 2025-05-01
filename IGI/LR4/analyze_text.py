import re
import zipfile
from collections import Counter

class TextAnalyzer:
    """
    A class for comprehensive text analysis with various text processing capabilities.
    
    Attributes:
        filename (str): Path to the input text file
        text (str): Content of the text file
        results (dict): Dictionary to store analysis results
    """
    
    def __init__(self, filename):
        """
        Initialize the TextAnalyzer with a text file.
        
        Args:
            filename (str): Path to the text file to analyze
        """
        self.filename = filename
        with open(filename, 'r', encoding='utf-8') as file:
            self.text = file.read()
        self.results = {}
    
    def analyze_text(self):
        """
        Perform comprehensive text analysis including:
        - Sentence counting and classification
        - Word and sentence length analysis
        - Smiley detection
        - Space replacement
        - GUID validation
        - Letter case analysis
        - Word position finding
        - Word filtering
        """
        # 1. Count total sentences
        sentences = re.split(r'[.!?]+', self.text)
        sentences = [s.strip() for s in sentences if s.strip()]
        self.results['total_sentences'] = len(sentences)
        
        # 2. Classify sentence types
        declarative = len(re.findall(r'[^.!?]*[.]', self.text))
        interrogative = len(re.findall(r'[^.!?]*[?]', self.text))
        exclamatory = len(re.findall(r'[^.!?]*[!]', self.text))
        self.results['sentence_types'] = {
            'declarative': declarative,
            'interrogative': interrogative,
            'exclamatory': exclamatory
        }
        
        # 3. Calculate average sentence length (in words)
        words_in_sentences = [len(re.findall(r'\b\w+\b', s)) for s in sentences]
        self.results['avg_sentence_length'] = sum(words_in_sentences) / len(words_in_sentences) if words_in_sentences else 0
        
        # 4. Calculate average word length
        words = re.findall(r'\b\w+\b', self.text)
        self.results['avg_word_length'] = sum(len(word) for word in words) / len(words) if words else 0
        
        # 5. Count valid smileys
        smileys = re.findall(r'[:;]-*[([{\])}]+', self.text)
        valid_smileys = [s for s in smileys if re.fullmatch(r'[:;]-*([([{\])}])\1*', s)]
        self.results['smileys_count'] = len(valid_smileys)
        
        # 6. Replace spaces with user-specified character
        replace_char = input("Enter character to replace spaces with: ")
        self.results['replaced_spaces'] = self.text.replace(' ', replace_char)
        
        # 7. Check if text is a valid GUID/UUID
        guid_pattern = r'^(\{?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}?)$'
        self.results['is_guid'] = bool(re.fullmatch(guid_pattern, self.text.strip()))
        
        # 8. Count uppercase and lowercase letters
        letters = Counter(self.text)
        uppercase = sum(count for char, count in letters.items() if char.isupper())
        lowercase = sum(count for char, count in letters.items() if char.islower())
        self.results['letter_cases'] = {'uppercase': uppercase, 'lowercase': lowercase}
        
        # 9. Find first word containing 'z' and its position
        words = re.findall(r'\b\w+\b', self.text.lower())
        z_words = [i for i, word in enumerate(words, 1) if 'z' in word]
        if z_words:
            self.results['first_z_word'] = {'word': words[z_words[0]-1], 'position': z_words[0]}
        else:
            self.results['first_z_word'] = None
        
        # 10. Remove words starting with 'a' (case insensitive)
        filtered_text = re.sub(r'\b[aA]\w*\b', '', self.text)
        self.results['filtered_text'] = ' '.join(filtered_text.split())
    
    def save_results(self, output_filename):
        """
        Save analysis results to a text file and create a compressed archive.
        
        Args:
            output_filename (str): Name for the output file (without extension)
        """
        with open(output_filename, 'w', encoding='utf-8') as file:
            for key, value in self.results.items():
                if key in ['replaced_spaces', 'filtered_text']:
                    file.write(f"{key}:\n{value}\n\n")
                elif isinstance(value, dict):
                    file.write(f"{key}:\n")
                    for subkey, subvalue in value.items():
                        file.write(f"  {subkey}: {subvalue}\n")
                    file.write("\n")
                else:
                    file.write(f"{key}: {value}\n\n")
        
        # Create compressed archive
        with zipfile.ZipFile(f'{output_filename}.zip', 'w') as zipf:
            zipf.write(output_filename)
            
            # Display archive information
            info = zipf.getinfo(output_filename)
            print("\nArchive information:")
            print(f"Filename: {info.filename}")
            print(f"Original size: {info.file_size} bytes")
            print(f"Compressed size: {info.compress_size} bytes")
            print(f"Compression method: {info.compress_type}")
        print(f"\nResults saved to {output_filename} and compressed to {output_filename}.zip")
    
    def print_results(self):
        """Print the analysis results in a readable format."""
        print("\nText Analysis Results:")
        for key, value in self.results.items():
            if key in ['replaced_spaces', 'filtered_text']:
                print(f"\n{key}:\n{value}")
            elif isinstance(value, dict):
                print(f"\n{key}:")
                for subkey, subvalue in value.items():
                    print(f"  {subkey}: {subvalue}")
            else:
                print(f"\n{key}: {value}")
                
def run_text_analyzer():
    """Run the text analyzer"""
    filename = input("Enter filename with text to analyze: ")
    analyzer = TextAnalyzer(filename)
    analyzer.analyze_text()
    analyzer.print_results()
    
    save = input("Save analysis results? (y/n): ").lower()
    if save == 'y':
        output_filename = input("Enter filename to save results: ")
        analyzer.save_results(output_filename)
        print(f"Results saved to {output_filename}.zip")