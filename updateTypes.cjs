const https = require("https"); // or 'http' if your dev server is not using HTTPS
const fs = require("fs");
const path = require("path");

const url = "https://hackathon-api-azure.vercel.app/api/api/types"; // Your Laravel endpoint
const outputPath = path.resolve(__dirname, "./src/types/formRequest.ts");

https
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
