const cron = require('node-cron');

let tasks = [];
let isRunning = false;

exports.isRunning = () => {
  return isRunning;
}

exports.schedule = (times, task) => {
  tasks = times.map(time => (
    cron.schedule(time, task)
  ));
  isRunning = true;
}

exports.destoryAll = () => {
  tasks.map(task => task && task.destroy());
  tasks = [];
  isRunning = false;
}

exports.update = (times, task) => {
  this.destoryAll();
  this.schedule(times, task);
}