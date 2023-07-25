const replace = require("replace-in-file");
const fs = require("fs");

// Read the environment variables from Netlify
const NODE_ENV = process.env.NODE_ENV; // Replace with your own variable names
const production = true;

// Path to the template file
const filePath = "./src/environments/environment.prod.template.ts";

// Path to the output file
const outputFile = "./src/environments/environment.prod.ts";

// Define the replacement options
const options = {
  files: filePath,
  from: [
    /REPLACE_WITH_ENVIRONMENT_PRODUCTION/,
    /REPLACE_WITH_ENVIRONMENT_NODE_ENV/,
  ],
  to: [production, NODE_ENV],
};

// Perform the replacement
replace.sync(options);

// Copy the modified file to the output location
fs.copyFileSync(filePath, outputFile);
