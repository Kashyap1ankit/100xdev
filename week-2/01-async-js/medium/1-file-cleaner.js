const fs = require("fs");

fs.readFile("fileCleaner.txt", "utf8", (err, data) => {
  if (err) console.log(err);
  if (data) {
    const newData = data.replace(/\s+/g, " ");
    fs.writeFile("fileCleaner.txt", newData, (err) => {
      if (err) console.log(err);
      console.log("updated");
    });
  }
});
