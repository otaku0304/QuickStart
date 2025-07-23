# NgStartMyDev (Windows Edition)

NgStartMyDev is a lightweight, script-driven solution to instantly launch your Angular projects **without opening an IDE or editor** like IntelliJ or VS Code.

This Windows edition provides a simple PowerShell-based startup experience optimized **Angular**.

---

## 🚀 Features

- Launches frontend (Angular) in a new Windows Terminal tab
- No need to open code editors or terminals manually

---

## ⚙️ Requirements
- **Node.js** and **npm**
- **Angular CLI**
- **Windows PowerShell 7+**
- **Windows Terminal (`wt`)**

---

## 🛠️ Configuration

Before running, open `NgStartMyDev.ps1` and set the following variables:

```powershell
$frontendPath  = "C:\Path\To\Your\AngularOrReactProject"
$frontPort   = 8080  # Change if your backend runs on a different port
$gitBranch = "dev" or "prod" # Change the branch as needed
