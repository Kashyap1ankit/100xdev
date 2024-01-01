const fs = require("fs");

const messageToAdd = "Hello ji";

fs.writeFile("writeFile.txt", messageToAdd, (err) => {
  if (err) console.log(err);
  console.log("done");
});
