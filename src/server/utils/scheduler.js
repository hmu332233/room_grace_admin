const cron = require('node-cron');

let tasks = [];

exports.schedule = (times, task) => {
  tasks = times.map(time => (
    cron.schedule(time, task)
  ));
}

exports.destoryAll = () => {
  tasks.map(task => task && task.destroy());
  tasks = [];
}

exports.update = (times, task) => {
  this.destoryAll();
  this.schedule(times, task);
}