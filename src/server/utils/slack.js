const axios = require('axios');

exports.sendMessage = ({ message }) => {
  const data = {
    text: message,
  };
  return axios.post(process.env.SLACK_HOOK_URL, data);
};

exports.sendErrorMessage = err => {
  const title = '에러가 발생했습니다!';
  const body = `${err.message}\n${JSON.stringify(err.stack)}`;
  const message = `${title}\n${body}`;
  return exports.sendMessage({ message });
};

exports.sendCompleteMessage = () => {
  const title = '정상적으로 포스팅되었습니다.';
  const body = `https://www.jnu.ac.kr/WebApp/web/HOM/COM/Board/board.aspx?boardID=10`;
  const message = `${title}\n${body}`;
  return exports.sendMessage({ message });
};
