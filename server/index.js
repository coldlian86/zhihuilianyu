const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/analyze', (req, res) => {
  const { content } = req.body;
  // TODO: 调用OpenAI API进行分析
  res.json({ analysis: `分析结果: ${content}` });
});

app.post('/suggest', (req, res) => {
  const { content } = req.body;
  // TODO: 调用OpenAI API生成建议回复
  res.json({ suggestion: `建议回复: 基于"${content}"的回复建议` });
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});