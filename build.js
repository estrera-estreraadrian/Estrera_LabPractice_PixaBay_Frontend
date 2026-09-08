const fs = require("fs");

const apiKey = process.env.PIXABAY_API_KEY;

if (!apiKey) {
  throw new Error("PIXABAY_API_KEY environment variable is missing.");
}

fs.writeFileSync(
  "config.js",
  `const API_KEY = "${apiKey}";\n`
);

console.log("config.js created successfully.");
