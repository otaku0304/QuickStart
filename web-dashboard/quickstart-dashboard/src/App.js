import { useState } from "react";
import axios from "axios";
import "./App.css";
import logo from "./assets/rocket.png";

function App() {
  const [form, setForm] = useState({
    applicationType: "frontend",
    projectType: "React",
    powershellVersion: "7",
    os: "windows",
    frontendPath: "",
    backendPath: "",
    javaPath: "",
    springProfile: "",
    port: "",
  });

  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const getProjectTypeOptions = (appType = form.applicationType) => {
    if (appType === "frontend") return ["React", "Angular"];
    if (appType === "backend") return ["Spring Boot", "Flask", "Node.js"];
    if (appType === "fullstack") return ["React or Angular + Spring Boot"];
    return [];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };
      if (name === "applicationType") {
        const options = getProjectTypeOptions(value);
        updatedForm.projectType = options[0] || "";
      }
      return updatedForm;
    });
  };

  const isFullstack = form.applicationType === "fullstack";
  const isFrontend = form.applicationType === "frontend" || isFullstack;
  const isBackend = form.applicationType === "backend" || isFullstack;
  const isSpringBoot = form.projectType.includes("Spring Boot");

  const getFrontendPathLabel = () => {
    if (form.applicationType === "frontend") {
      return form.projectType === "React"
        ? "React Project Path"
        : form.projectType === "Angular"
        ? "Angular Project Path"
        : "Frontend Project Path";
    } else if (isFullstack) {
      return "React/Angular JS Project Path";
    }
    return "Frontend Project Path";
  };

  const getBackendPathLabel = () => {
    if (form.applicationType === "backend") {
      if (form.projectType === "Spring Boot") return "Spring Boot Project Path";
      if (form.projectType === "Flask") return "Flask Project Path";
      if (form.projectType === "Node.js") return "Node.js Project Path";
      return "Backend Project Path";
    } else if (isFullstack) {
      return "Spring Boot Project Path";
    }
    return "Backend Project Path";
  };

  const handleSubmit = async () => {
    if (isFullstack) {
      if (!form.frontendPath || !form.backendPath) {
        alert(
          "Please provide both React/Angular and Spring Boot project paths."
        );
        return;
      }
    }

    if (form.applicationType === "frontend" && !form.frontendPath) {
      alert(
        `Please provide the ${form.projectType || "frontend"} project path.`
      );
      return;
    }

    if (form.applicationType === "backend" && !form.backendPath) {
      alert(
        `Please provide the ${form.projectType || "backend"} project path.`
      );
      return;
    }

    if (isSpringBoot && (!form.javaPath || !form.springProfile)) {
      alert("Please provide the Java path and Spring profile.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/generate", form, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "launch-folder.zip");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Something went wrong while generating the ZIP.");
      console.error(err);
    }
  };

  return (
    <div className={`min-vh-100 ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="container py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="fs-3 fw-bold">
            <img
              src={logo}
              alt="Logo"
              style={{ height: "32px", marginRight: "8px" }}
            />
            <span className="text-primary">
              QuickStart Launch Script Generator
            </span>
          </div>
          <button
            className={`btn btn-sm ${darkMode ? "btn-light" : "btn-dark"}`}
            onClick={toggleTheme}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="card shadow-lg p-4">
          <div className="mb-4">
            <label className="form-label fw-bold">Operating System</label>
            <div className="d-flex gap-4 flex-wrap">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="os"
                  id="windows"
                  value="windows"
                  checked={form.os === "windows"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="windows">
                  Windows
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="os"
                  id="linux"
                  value="linux"
                  disabled
                />
                <label className="form-check-label text-muted" htmlFor="linux">
                  Linux (coming soon)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="os"
                  id="mac"
                  value="mac"
                  disabled
                />
                <label className="form-check-label text-muted" htmlFor="mac">
                  Mac (coming soon)
                </label>
              </div>
            </div>
            <small className="text-muted">
              Currently, only Windows is supported.
            </small>
          </div>

          {/* Application Type + PowerShell */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label fw-bold">Application Type</label>
              <div className="d-flex gap-3 flex-wrap">
                {["frontend", "backend", "fullstack"].map((type) => (
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

            <div className="col-md-6">
              <label className="form-label fw-bold">PowerShell Version</label>
              <div className="d-flex gap-3">
                {["5", "7"].map((ver) => (
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
          </div>

          {/* Project Type + Port */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label fw-bold">Project Type</label>
              <div className="d-flex flex-wrap gap-3">
                {getProjectTypeOptions().map((type) => (
                  <div key={type} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="projectType"
                      id={type}
                      value={type}
                      checked={form.projectType === type}
                      onChange={handleChange}
                      disabled={isFullstack}
                    />
                    <label className="form-check-label" htmlFor={type}>
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <label className="fw-bold">Port (optional)</label>
              <input
                className="form-control"
                name="port"
                value={form.port}
                onChange={handleChange}
                placeholder="e.g., 8080 or 3000 (default will be used if empty)"
              />
            </div>
          </div>

          {/* Frontend + Backend Paths */}
          <div className="row mb-4">
            {isFrontend && (
              <div className="col-md-6 mb-3">
                <label className="fw-bold">{getFrontendPathLabel()}</label>
                <input
                  className="form-control"
                  name="frontendPath"
                  value={form.frontendPath}
                  onChange={handleChange}
                  placeholder="e.g., C:\\path\\to\\frontend"
                />
              </div>
            )}
            {isBackend && (
              <div className="col-md-6 mb-3">
                <label className="fw-bold">{getBackendPathLabel()}</label>
                <input
                  className="form-control"
                  name="backendPath"
                  value={form.backendPath}
                  onChange={handleChange}
                  placeholder="e.g., C:\\path\\to\\backend"
                />
              </div>
            )}
          </div>

          {/* Spring Boot Extras */}
          {isSpringBoot && (
            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <label className="fw-bold">Java Path (optional)</label>
                <input
                  className="form-control"
                  name="javaPath"
                  value={form.javaPath}
                  onChange={handleChange}
                  placeholder="Will use system default if not provided"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="fw-bold">Spring Profile (optional)</label>
                <input
                  className="form-control"
                  name="springProfile"
                  value={form.springProfile}
                  onChange={handleChange}
                  placeholder="e.g., local, dev, prod (default will be used if empty)"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button className="btn btn-primary px-5" onClick={handleSubmit}>
              Generate & Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
