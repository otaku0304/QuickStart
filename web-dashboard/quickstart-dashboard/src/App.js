import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({
    appType: 'fullstack',
    environment: 'dev',
    port: '',
    flag: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateBatch = async () => {
    try {
      const res = await axios.post('http://localhost:5000/generate', form, {
        responseType: 'blob',
      });

      const blob = new Blob([res.data], { type: 'application/bat' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'launch.bat');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert('Error generating batch file.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Launch Script Generator</h2>
      <div className="mb-3">
        <label>App Type</label>
        <select className="form-select" name="appType" value={form.appType} onChange={handleChange}>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Fullstack</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Environment</label>
        <select className="form-select" name="environment" value={form.environment} onChange={handleChange}>
          <option value="local">Local</option>
          <option value="dev">Dev</option>
          <option value="stage">Stage</option>
          <option value="prod">Production</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Port (optional)</label>
        <input className="form-control" name="port" value={form.port} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Flag (optional)</label>
        <input className="form-control" name="flag" value={form.flag} onChange={handleChange} />
      </div>
      <button className="btn btn-primary" onClick={generateBatch}>Generate & Download</button>
    </div>
  );
}

export default App;
