// Create the functions which can replace the javascript inbuild setTimeout and setInterval functions.
// This approach can be very CPU-intensive and is generally not recommended for real-world applications due to its inefficiency

let time = new Date();

const timeInterval = (theFunction, timePeriod) => {
  let hrs = false;
  let min = false;
  let sec = false;
  let milSec = 0;
  let currentHrs = false;
  let currentMin = false;
  let currentSec = false;
  let currentMilSec = false;
  let attainHrs = false;
  let attainMin = false;
  let attainSec = false;
  let attainMilSec = false;

  if (timePeriod > 999) {
    milSec = Math.trunc(
      (timePeriod / 1000 - Math.trunc(timePeriod / 1000)) * 1000
    );
    currentMilSec = time.getMilliseconds();
    attainMilSec = currentMilSec + milSec;
    if (timePeriod > 59940) {
      sec = Math.trunc(timePeriod / 1000);
      currentSec = time.getSeconds();
      attainSec = currentSec + sec;
      if (timePeriod > 3596400) {
        min = Math.trunc(timePeriod / 1000 / 60);
        currentMin = time.getMinutes;
        attainMin = currentMin + min;
        if (timePeriod > 86313600) {
          hrs = Math.trunc(timePeriod / 1000 / 60 / 60);
          currentHrs = time.getHours;
          attainHrs = currentHrs + hrs;
          while (true) {
            if (
              attainMilSec == time.getMilliseconds() &&
              attainSec == time.getSeconds() &&
              attainMin == time.getMinutes() &&
              attainHrs == time.getHours()
            ) {
              theFunction();
              timeInterval(theFunction, timePeriod);
            }
          }
        }
      } else {
        min = Math.trunc(timePeriod / 1000 / 60);
        attainSec = currentSec + sec;
        attainMin = currentMin + min;
        while (true) {
          if (
            attainMilSec == time.getMilliseconds() &&
            attainSec == time.getSeconds() &&
            attainMin == time.getMinutes()
          ) {
            theFunction();
            timeInterval(theFunction, timePeriod);
          }
        }
      }
    } else {
      sec = Math.trunc(timePeriod / 1000);
      currentSec = time.getSeconds();
      attainSec = currentSec + sec;
      while (true) {
        if (
          attainMilSec == time.getMilliseconds() &&
          attainSec == time.getSeconds()
        ) {
          theFunction();
          timeInterval(theFunction, timePeriod);
        }
      }
    }
  } else {
    milSec = Math.trunc(
      (timePeriod / 1000 - Math.trunc(timePeriod / 1000)) * 1000
    );
    currentMilSec = time.getMilliseconds();
    attainMilSec = currentMilSec + milSec;
    while (true) {
      if (attainMilSec == time.getMilliseconds()) {
        theFunction();
        timeInterval(theFunction, timePeriod);
      }
    }
  }
};

timeInterval(() => {
  console.log('See it worked!');
}, 0); // I have set timer to deal with CPU inefficiency

// Replace timeInterval(theFunction, timePeriod) ===>>>> break; for setTimeout function
