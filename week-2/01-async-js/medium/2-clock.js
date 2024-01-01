setInterval(() => {
  const date = new Date();
  let hour = String(date.getHours()).padStart(2, 0);
  let minute = String(date.getMinutes()).padStart(2, 0);
  let second = String(date.getSeconds()).padStart(2, 0);

  let meridian = "AM";
  if (hour >= 0 && hour < 12) {
    meridian = "AM";
  } else {
    meridian = "PM";
  }
  let currTime = `${hour}:${minute}:${second} ${meridian}`;
  console.log(currTime);
}, 1000);
