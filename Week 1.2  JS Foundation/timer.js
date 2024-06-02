// Create an interactive study timer application that allows users to manage their study sessions by adding tasks, starting/stopping timers for each task, and tracking the time spent on each task. This project will deepen your understanding of interpreted vs. compiled languages, strict vs. dynamic typing, single-threaded nature of JavaScript, loops, variables, arrays, objects, functions, break statements, and callback functions.

let input_name = document.querySelector('#input_txt_name');
let display_output_name = document.querySelector('.output_name');
let display_output = document.querySelector('.output');
let input_hr = document.querySelector('#input_txt_hr');
let input_min = document.querySelector('#input_txt_min');
let input_sec = document.querySelector('#input_txt_sec');
let submit = document.querySelector('.submit');
let start_btn = document.querySelector('.start_btn');
let pause_btn = document.querySelector('.pause_btn');
let end_btn = document.querySelector('.end_btn');

let dataList = [];

submit.addEventListener('click', () => {
  id_value = dataList.length + 1;
  firstName_Value = input_name.value;
  timer_Value = `${input_hr.value.toString().padStart(2, 0)}:${input_min.value
    .toString()
    .padStart(2, 0)}:${input_sec.value.toString().padStart(2, 0)}`;
  isActive_Value = true;
  let dataValue = {
    id: id_value,
    firstName: firstName_Value,
    timer: timer_Value,
    isActive: isActive_Value,
    toEnd: false
  };
  dataList.push(dataValue);
  display_output_name.innerHTML = `Hello! ${input_name.value}`;
  input_name.value = '';
  input_hr.value = '';
  input_min.value = '';
  input_sec.value = '';
});

start_btn.addEventListener('click', () => {
  dataList.length > 0 ? (dataList[dataList.length - 1].isActive = true) : '';
  !dataList[dataList.length - 1].toEnd ? runningTimer() : '';
});

pause_btn.addEventListener('click', () => {
  dataList.length > 0 ? (dataList[dataList.length - 1].isActive = false) : '';
});

end_btn.addEventListener('click', () => {
  dataList.length > 0 ? (dataList[dataList.length - 1].toEnd = true) : '';
  display_output.innerHTML = '00:00:00';
});

function runningTimer() {
  let intervalId = setInterval(() => {
    if (
      !dataList[dataList.length - 1].isActive ||
      dataList[dataList.length - 1].toEnd
    ) {
      clearInterval(intervalId);
    }
    let hrs_time = parseInt(dataList[dataList.length - 1].timer.slice(0, 2));
    let min_time = parseInt(dataList[dataList.length - 1].timer.slice(3, 5));
    let sec_time = parseInt(dataList[dataList.length - 1].timer.slice(-2));
    display_output.innerHTML = dataList[dataList.length - 1].timer;
    sec_time--;
    sec_time < 0
      ? (hrs_time == 0 && min_time == 0 ? (sec_time = 0) : (sec_time = 59),
        min_time--,
        min_time < 0
          ? (hrs_time == 0 ? (min_time = 0) : (min_time = 59),
            hrs_time--,
            hrs_time < 0
              ? ((hrs_time = 0), (dataList[dataList.length - 1].toEnd = true))
              : null)
          : null)
      : null;
    dataList[dataList.length - 1].timer = `${hrs_time
      .toString()
      .padStart(2, 0)}:${min_time.toString().padStart(2, 0)}:${sec_time
      .toString()
      .padStart(2, 0)}`;
  }, 1000);
}
