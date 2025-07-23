# FlaskStartMyDev (Windows Edition)

**FlaskStartMyDev** is a lightweight, script-driven solution to instantly launch your **Flask flask projects without opening an IDE or editor** like PyCharm or VS Code.

This Windows edition provides a simple PowerShell-based startup experience optimized for **Python**, **Flask**.

---

> **Note**: The flask projects is **not stored** inside this repository. You configure their **local paths** in the `FlaskStartMyDev.ps1`.

---

## 🚀 Features

- Launches Flask flask in a new PowerShell window 
- No need to open code editors or terminals manually  
- Clean, IDE-free development experience
- Simple to modify and extend for your custom dev | prod stack
- Clean, IDE-free development experience
---

## ⚙️ Requirements

- **Python** (set your `PYTHON_PATH` inside the script)  
- **pip**
- **Windows PowerShell 7+**  
- **Windows Terminal (`wt`)**

---

## 🛠️ Configuration

Before running, open `flaskStartMyDev.ps1` and set the following variables:

```powershell
$pythonPath  = "C:\Path\To\Your\Python"
$backendPath   = "C:\Path\To\Your\FlaskProject"
$backendPort   = 5000  # Change if your Flask app runs on a different port
