import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // For optional theme styles

function App() {
  const [form, setForm] = useState({
    applicationType: 'frontend',
    projectType: '',
    powershellVersion: '7',
    frontendPath: '',
    backendPath: '',
    javaPath: '',
    springProfile: '',
    port: ''
  });

  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFullstack = form.applicationType === 'fullstack';
  const isFrontend = form.applicationType === 'frontend' || isFullstack;
  const isBackend = form.applicationType === 'backend' || isFullstack;
  const isSpringBoot =
    form.projectType.includes('Spring Boot');

  const handleSubmit = async () => {
    if (isFullstack && (!form.projectType || !form.frontendPath || !form.backendPath)) {
      alert('Fullstack setup requires project type and both paths.');
      return;
    }
    if (form.applicationType === 'frontend' && !form.frontendPath) {
      alert('Frontend path is required.');
      return;
    }
    if (form.applicationType === 'backend' && !form.backendPath) {
      alert('Backend path is required.');
      return;
    }
    if (isSpringBoot && (!form.javaPath || !form.springProfile)) {
      alert('Java path and Spring profile are required.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/generate-launch-zip', form, {
        responseType: 'blob'
      });

      const blob = new Blob([res.data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'launch-folder.zip');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Error generating file');
      console.error(err);
    }
  };

  return (
    <div className={darkMode ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100'}>
      <div className="container py-4">
        {/* Header with logo and toggle */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="fs-3 fw-bold">
            {/* Logo image can go here */}
            🚀 <span className="text-primary">QuickStart Launch Script Generator</span>
          </div>
          <div>
            <button
              className={`btn btn-sm ${darkMode ? 'btn-light' : 'btn-dark'}`}
              onClick={toggleTheme}
            >
              {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>

        <div className="card shadow-lg p-4">

          {/* Application Type */}
          <div className="mb-3">
            <label className="form-label">Application Type</label>
            <div className="d-flex gap-3 flex-wrap">
              {['frontend', 'backend', 'fullstack'].map(type => (
                <div key={type} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="applicationType"
                    id={type}
                    value={type}
                    checked={form.applicationType === type}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Project Type */}
          <div className="mb-3">
            <label className="form-label">Project Type</label>
            <div className="d-flex flex-wrap gap-3">
              {(isFullstack
                ? ['React + Spring Boot', 'Angular + Spring Boot']
                : ['React', 'Angular', 'Node.js', 'Spring Boot']
              ).map(type => (
                <div key={type} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="projectType"
                    id={type}
                    value={type}
                    checked={form.projectType === type}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={type}>
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* PowerShell Version */}
          <div className="mb-3">
            <label className="form-label">PowerShell Version</label>
            <div className="d-flex gap-3">
              {['5', '7'].map(ver => (
                <div key={ver} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="powershellVersion"
                    id={`ps${ver}`}
                    value={ver}
                    checked={form.powershellVersion === ver}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={`ps${ver}`}>
                    PowerShell {ver}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Paths */}
          {isFrontend && (
            <div className="mb-3">
              <label>Frontend Path</label>
              <input className="form-control" name="frontendPath" value={form.frontendPath} onChange={handleChange} />
            </div>
          )}
          {isBackend && (
            <div className="mb-3">
              <label>Backend Path</label>
              <input className="form-control" name="backendPath" value={form.backendPath} onChange={handleChange} />
            </div>
          )}
          {isSpringBoot && (
            <>
              <div className="mb-3">
                <label>Java Path</label>
                <input className="form-control" name="javaPath" value={form.javaPath} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label>Spring Profile</label>
                <input className="form-control" name="springProfile" value={form.springProfile} onChange={handleChange} />
              </div>
            </>
          )}

          {/* Port */}
          <div className="mb-3">
            <label>Port (optional)</label>
            <input
              className="form-control"
              name="port"
              value={form.port}
              onChange={handleChange}
              placeholder="e.g., 8080 or 3000"
            />
          </div>

          {/* Submit */}
          <div className="text-center mt-4">
            <button className="btn btn-primary px-5" onClick={handleSubmit}>
              Generate & Download ZIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
