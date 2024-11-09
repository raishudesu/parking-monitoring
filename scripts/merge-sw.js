const chokidar = require("chokidar");
const fs = require("fs");
const path = require("path");

// File paths
const swFilePath = path.join(__dirname, "public", "sw.js");
const workerFilePath = path.join(__dirname, "src", "worker", "index.js");

// Function to merge the files
const mergeFiles = () => {
  fs.readFile(workerFilePath, "utf8", (err, workerContent) => {
    if (err) {
      console.error("Error reading worker file:", err);
      return;
    }

    fs.readFile(swFilePath, "utf8", (err, swContent) => {
      if (err) {
        console.error("Error reading sw.js file:", err);
        return;
      }

      // Merge the content of worker into sw.js (you can adjust how it's merged)
      const mergedContent = `${swContent}\n${workerContent}`;

      fs.writeFile(swFilePath, mergedContent, "utf8", (err) => {
        if (err) {
          console.error("Error writing merged sw.js:", err);
          return;
        }
        console.log("Successfully merged worker logic into sw.js");
      });
    });
  });
};

// Function to watch the sw.js file and merge after it's regenerated
const watchSwFile = () => {
  const watcher = chokidar.watch(swFilePath, {
    persistent: true,
    ignoreInitial: true, // Ignore the first event when the file is initially present
  });

  watcher.on("change", (path) => {
    console.log(`File ${path} has been changed. Waiting to merge...`);

    // Wait a small time to ensure sw.js has been fully regenerated
    setTimeout(() => {
      console.log("Merging worker logic into sw.js...");
      mergeFiles();
    }, 1000); // Adjust this delay if necessary
  });

  console.log("Watching sw.js for changes...");
};

// Start watching the file
watchSwFile();
