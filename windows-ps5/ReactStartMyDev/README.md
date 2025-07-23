# ReactStartMyDev (Windows Edition)

ReactStartMyDev is a lightweight, script-driven solution to instantly launch your full-stack Spring Boot and Angular (or React) projects **without opening an IDE or editor** like IntelliJ or VS Code.

This Windows edition provides a simple PowerShell-based startup experience optimized for **Java**, **Maven**, **Angular**, and **React** environments.

---

> Note: The backend and frontend projects are **not stored** inside this repository. You configure their **local paths** in the NgBootStart.ps1

---

## 🚀 Features

- Launches backend (Spring Boot + Maven) in a new PowerShell window
- Launches frontend (Angular or React) in a new Windows Terminal tab
- No need to open code editors or terminals manually
- Waits for backend readiness before launching frontend
- Supports both Angular (`npm start`) and React frontend projects

---

## ⚙️ Requirements

- **Java** (set your `JAVA_HOME` path inside the script)
- **Maven**
- **Node.js** and **npm**
- **Angular CLI** or React setup
- **Windows PowerShell 7+**
- **Windows Terminal (`wt`)**

---

## 🛠️ Configuration

Before running, open `NgBootStart.ps1` and set the following variables:

```powershell
$javaPath      = "C:\Path\To\Your\Java" 
$backendPath   = "C:\Path\To\Your\SpringBootProject"
$frontendPath  = "C:\Path\To\Your\AngularOrReactProject"
$backendPort   = 8080  # Change if your backend runs on a different port
