const fs = require("fs");

//Making this operation expensive to make thread busy
let a = 0;
for (let i = 0; i < 100000000000; i++) {
  a++;
}

console.log(a);

fs.readFile("readFile.txt", "utf8", (err, result) => {
  if (err) console.log(err);
  console.log(result);
});
