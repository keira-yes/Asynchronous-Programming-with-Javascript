const counter = document.getElementById('counter'),
  startBtn = document.getElementById('startBtn'),
  resetBtn = document.getElementById('resetBtn'),
  recordBtn = document.getElementById('recordBtn'),
  timesList = document.getElementById('timesList');

let start = false,
  timeInterval,
  time = 0,
  timeValue;

// Start to increase counter
const startCounter = () => {
  timeInterval = setInterval(() => {
    time += 0.01;
    counter.innerText = time.toFixed(2);
  }, 10);
  start = true;
  startBtn.style.background = '#FF0000';
  startBtn.innerText = 'Stop';
};

// Stop to increase counter
const stopCounter = () => {
  clearInterval(timeInterval);
  start = false;
  startBtn.style.background = '#007C21';
  startBtn.innerText = 'Start';
};

// Record time
const recordTime = () => {
  timeValue = time;
  timesList.innerHTML += `<li>${timeValue.toFixed(2)}</li>`;
};

// Reset time
const resetTime = () => {
  stopCounter();
  time = 0;
  counter.innerText = time;
  timesList.innerHTML = '';
};

// Buttons events handlers

startBtn.addEventListener('click', () => {
  start ?  stopCounter() : startCounter();
});

recordBtn.addEventListener('click', recordTime);

resetBtn.addEventListener('click', resetTime);

// Keypress event handler
document.addEventListener('keydown', (e) => {
  switch(e.code) {
    case 'KeyS':
      start ?  stopCounter() : startCounter();
      break;
    case 'KeyT':
      recordTime();
      break;
    case 'KeyR':
      resetTime();
      break;
  }
});