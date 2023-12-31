/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  let vowels = 0;
  const arr = str.split("");
  arr.forEach((e) => {
    if (
      e === "a" ||
      e === "A" ||
      e === "e" ||
      e === "E" ||
      e === "i" ||
      e === "I" ||
      e === "o" ||
      e === "O" ||
      e === "u" ||
      e === "U"
    ) {
      vowels++;
    }
  });

  return vowels;
}

module.exports = countVowels;
