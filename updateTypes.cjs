const http = require("http"); // or 'http' if your dev server is not using HTTPS
const fs = require("fs");
const path = require("path");

const url = "http://192.168.0.2/api/types"; // Your Laravel endpoint
const outputPath = path.resolve(__dirname, "./src/types/formRequest.ts");

http
  .get(url, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Failed to fetch file. Status code: ${res.statusCode}`);
      return;
    }

    const fileStream = fs.createWriteStream(outputPath);
    res.pipe(fileStream);

    fileStream.on("finish", () => {
      fileStream.close();
      console.log("✅ Type definitions updated successfully!");
    });
  })
  .on("error", (err) => {
    console.error(`Error fetching types: ${err.message}`);
  });
