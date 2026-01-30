const axios = require('axios');

exports.main = async (event) => {
  const { name, start, end } = JSON.parse(event.body);

  const owner = '你的GitHub用户名';
  const repo = 'exp-booking.github.io';
  const workflow_id = 'update-bookings.yml';
  const token = process.env.GITHUB_TOKEN; // 在云函数环境变量里设置

  try {
    await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`,
      {
        ref: 'main',
        inputs: { name, start, end }
      },
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github+json'
        }
      }
    );

    return { statusCode: 200, body: JSON.stringify({ message: '预约提交成功！刷新页面查看最新预约' }) };
  } catch(err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ message: '提交失败，请稍后重试' }) };
  }
};
