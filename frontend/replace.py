import os

def replace_in_file(file_path, search_str, replace_str):
    with open(file_path, 'r') as file:
        file_contents = file.read()
        file_contents = file_contents.replace(search_str, replace_str)
    with open(file_path, 'w') as file:
        file.write(file_contents)

def replace_in_directory(directory_path, search_str, replace_str):
    for dirpath, dirnames, filenames in os.walk(directory_path):
        for filename in filenames:
            if filename.endswith('.js') or filename.endswith('.jsx'):
                file_path = os.path.join(dirpath, filename)
                replace_in_file(file_path, search_str, replace_str)

directory_path = 'src'
search_str = 'http://localhost:8000'
replace_str = 'https://backend-litlab.herokuapp.com'

for subdirectory in ['components', 'pages']:
    replace_in_directory(os.path.join(directory_path, subdirectory), search_str, replace_str)
