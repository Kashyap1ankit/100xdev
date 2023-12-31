/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/
function isPalindrome(str) {
  const arr3 = str
    .toLowerCase()
    .split("")
    .join("")
    .replace(/[^a-z0-9]/g, "");
  const arr2 = str
    .toLowerCase()
    .split("")
    .reverse()
    .join("")
    .replace(/[^a-z0-9]/g, "");

  if (arr3 === arr2) {
    return true;
  }
  if (arr3 !== arr2) {
    return false;
  }
}
module.exports = isPalindrome;
