import os

# Define the folders to search for files
folders_to_search = ["src/components", "src/pages"]

# Define the search and replace strings
search_str = "http://localhost:3000"
replace_str = "http://localhost:8000"

# Loop through each folder and search for files
for folder in folders_to_search:
    for subdir, _, files in os.walk(folder):
        for file in files:
            # Only search through .js and .jsx files
            if file.endswith((".js", ".jsx")):
                file_path = os.path.join(subdir, file)
                # Use open() function to replace strings in files
                with open(file_path, "r", encoding="utf8") as f:
                    file_contents = f.read()
                with open(file_path, "w", encoding="utf8") as f:
                    f.write(file_contents.replace(search_str, replace_str))
