let count = 0;

const incCount = () => {
  count++;
  console.log(count);
  setTimeout(incCount, 1000);
};
incCount();
