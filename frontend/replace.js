const fs = require("fs");
const path = require("path");

// Define the directory to search for files
const directoryPath = ".";

// Define the search and replace strings
const searchString = "http://localhost:8000";
const replaceString = "https://backend-litlab.herokuapp.com/";

// Traverse the directory recursively and replace the strings in each file
function traverseDirectory(directoryPath) {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      console.log("Error reading directory:", err);
      return;
    }

    // Loop through all files in the directory
    files.forEach(function (file) {
      const filePath = path.join(directoryPath, file);

      // Check if the file is a directory
      fs.stat(filePath, function (err, stat) {
        if (err) {
          console.log("Error reading file:", err);
          return;
        }

        if (stat.isDirectory()) {
          // If the file is a directory, traverse it recursively
          traverseDirectory(filePath);
        } else {
          // If the file is a file, replace the strings in the file content
          fs.readFile(filePath, "utf8", function (err, data) {
            if (err) {
              console.log("Error reading file:", err);
              return;
            }

            // Replace all occurrences of the search string with the replace string
            const result = data.replace(
              new RegExp(searchString, "g"),
              replaceString
            );

            // Write the updated content back to the file
            fs.writeFile(filePath, result, "utf8", function (err) {
              if (err) {
                console.log("Error writing file:", err);
              }
            });
          });
        }
      });
    });
  });
}

// Call the traverseDirectory function with the specified directory path
traverseDirectory(directoryPath);
