# QuickStart

**QuickStart** is a PowerShell-based automation setup to streamline running applications like frontend, backend, or full-stack across multiple environments — including local, dev, stage, and production.

## 🚀 Features

- Automates starting backend servers and frontend frameworks.
- Supports multiple terminal setups (VS Code, Windows Terminal).
- Simple `.ps1` scripts tailored for different Windows PowerShell environments.
- Lightweight, no external dependencies.
- Structured folder setup for PowerShell 7 (`windows-ps7`) and PowerShell 5 (`windows-ps5`).

## 📁 Current Structure

- `windows-ps7/NgBootStart`: Stable and functional. Tested with Angular apps and working as expected.
- `windows-ps5/NgBootStart`: Stable and functional. Tested with Angular apps and working as expected.
- `windows-ps5/FlaskQuickStart`: Stable and functional. Tested with Flask app and working as expected.

## ⚠️ Editor Launch Issues

Modern editors (like VS Code or Windows Terminal) sometimes:
- Fail to inherit shell environment variables correctly when launched via scripts.
- Open in incorrect directories unless paths are explicitly passed.
- Require administrator privileges for specific PowerShell commands.

These issues are actively being addressed and workarounds are being tested in the PowerShell 5 branch.

## 📌 Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/otaku0304/QuickStart.git
2. Navigate to the appropriate folder (e.g., windows-ps7/NgBootStart).

3. Run the launch.bat by double clicking 
