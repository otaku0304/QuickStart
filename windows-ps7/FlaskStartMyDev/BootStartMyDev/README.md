# BootStartMyDev (Windows Edition)

BootStartMyDev is a lightweight, script-driven solution to instantly launch your Spring Boot projects **without opening an IDE or editor** like IntelliJ or VS Code.

This Windows edition provides a simple PowerShell-based startup experience optimized for **Java**, **Maven** environments.

---

## 🚀 Features

- Launches backend (Spring Boot + Maven) in a new PowerShell window
- No need to open code editors or terminals manually

---

## ⚙️ Requirements

- **Java** (set your `JAVA_HOME` path inside the script)
- **Maven**
- **Git**
- **Windows PowerShell 7+**
- **Windows Terminal (`wt`)**

---

## 🛠️ Configuration

Before running, open `ngBootNgBootQuickStart.ps1` and set the following variables:

```powershell
$javaPath      = "C:\Path\To\Your\Java" 
$backendPath   = "C:\Path\To\Your\SpringBootProject"
$backendPort   = 8080  # Change if your backend runs on a different port
$gitBranch     = "dev" or "prod" # change if your branches run on different branch
