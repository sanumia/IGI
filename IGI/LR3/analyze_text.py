
"""
LR 3 Standard data types, collections, functions, modules

Gorodetskaya Diana 25.03.2025

Task 4. a) determine the number of words whose length is less than 5;
        b) find the shortest word ending with the letter 'd';
        c) output all words in descending order of their lengths
"""
def count_str(text):
    words_5 = [word for word in text.split() if len(word) < 5]
    count_5 = len(words_5)
    words_d = [word for word in text.split() if word.lower().endswith('d')]
    shortest_word = min(words_d, key=len)
    words = text.split()
    text_to_min = sorted(words, key=lambda x: len(x), reverse=True)
    return count_5, shortest_word, text_to_min
