const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/generate', (req, res) => {
  const { appType, environment, port, flag } = req.body;

  const script = `
@echo off
set APP_TYPE=${appType}
set ENV=${environment}
${port ? `set PORT=${port}` : ''}
${flag ? `set FLAG=${flag}` : ''}
powershell -ExecutionPolicy Bypass -File Retailers.ps1
`;

  res.setHeader('Content-Disposition', 'attachment; filename=launch.bat');
  res.setHeader('Content-Type', 'application/bat');
  res.send(script);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
