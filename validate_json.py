import json
import sys

file_path = r'c:\website\website\eco-tech\server\data\members.json'


try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
        # Check for smart quotes
        smart_quotes = ['\u201c', '\u201d', '\u2018', '\u2019']
        found_smart = False
        for i, char in enumerate(content):
            if char in smart_quotes:
                lines = content[:i].splitlines()
                line_no = len(lines)
                print(f"Found smart quote at line {line_no}: {char!r}")
                found_smart = True
                
        if not found_smart:
             try:
                json.loads(content)
                print("JSON is valid (no smart quotes found)")
             except json.JSONDecodeError as e:
                print(f"JSON error: {e}")

except Exception as e:
    print(f"File validation error: {e}")
