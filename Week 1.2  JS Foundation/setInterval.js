// Create the functions which can replace the javascript inbuild setTimeout and setInterval functions.
// This approach can be very CPU-intensive and is generally not recommended for real-world applications due to its inefficiency

const timeInterval = (theFunction, timePeriod) => {
  let attainTime_milSec = new Date().getMilliseconds() + (timePeriod % 1000);
  let attainTime_sec =
    new Date().getSeconds() + (timePeriod - (timePeriod % 1000)) / 1000;

  for (let i = 0; i > -1; i++) {
    let currentTime_milSec = new Date().getMilliseconds();
    let currentTime_sec = new Date().getSeconds();
    currentTime_milSec == attainTime_milSec && currentTime_sec == attainTime_sec
      ? (i = -3)
      : null;
  }
  theFunction();
};

timeInterval(() => {
  console.log('See it worked!');
}, 5660);
