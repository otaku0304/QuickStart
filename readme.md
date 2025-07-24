# StartMyDev

**StartMyDev** is a PowerShell-based automation setup to streamline running applications like frontend, backend, or full-stack across multiple environments — including local, dev, stage, and production.

## 🚀 Features

- Automates starting backend servers and frontend frameworks.
- Supports multiple terminal setups (VS Code, Windows Terminal).
- Simple `.ps1` scripts tailored for different Windows PowerShell environments.
- Lightweight, no external dependencies.
- Structured folder setup for PowerShell 7 (`windows-ps7`) and PowerShell 5 (`windows-ps5`).

## 📁 Project Structure Overview

The following are the supported folder structures for Windows-based development environments:

### 🪟 Windows – PowerShell 5 (`windows-ps5/`)
- [`BootStartMyDev`](./windows-ps5/BootStartMyDev/):  
  ✅ Stable and functional.  
  🧪 Tested with Spring Boot apps and working as expected.

- [`FlaskStartMyDev`](./windows-ps5/FlaskStartMyDev/):  
  ✅ Stable and functional.  
  🧪 Tested with Flask apps and working as expected.

- [`NgBootStartMyDev`](./windows-ps5/NgBootStartMyDev/):  
  ✅ Stable and functional.  
  🧪 Tested with  apps and working as expected.

- [`NgStartMyDev`](./windows-ps5/NgStartMyDev/):  
  ✅ Stable and functional.  
  🧪 Tested with Angular apps and working as expected.

- [`ReactBootStartMyDev`](./windows-ps5/ReactBootStartMyDev/):  
  ✅ Stable and functional.  
  🧪 Tested with Angular apps and working as expected.

- [`ReactStartMyDev`](./windows-ps5/ReactStartMyDev/):  
  ✅ Stable and functional.  
  🧪 Tested with Angular apps and working as expected.

### 🪟 Windows – PowerShell 7 (`windows-ps7/`)
- [`BootStartMyDev`](./windows-ps7/BootStartMyDev/):  
  ✅ Stable and functional.  
  🧪 Tested with Spring Boot apps and working as expected.

- [`FlaskStartMyDev`](./windows-ps7/FlaskStartMyDev/):  
  ✅ Stable and functional.  
  🧪 Tested with Flask apps and working as expected.

- [`NgBootStartMyDev`](./windows-ps7/NgBootStartMyDev/):  
  ✅ Stable and functional.  
  🧪 Tested with React and SpringBoot FullStack apps and working as expected.

- [`NgStartMyDev`](./windows-ps7/NgStartMyDev/):  
  ✅ Stable and functional.  
  🧪 Tested with Angular apps and working as expected.

- [`ReactBootStartMyDev`](./windows-ps7/ReactBootStartMyDev/):  
  ✅ Stable and functional.  
  🧪 Tested with React apps and working as expected.

- [`ReactStartMyDev`](./windows-ps7/ReactStartMyDev/):  
  ✅ Stable and functional.  
  🧪 Tested with React and SprinBoot FullStack apps and working as expected.

## ⚠️ Editor Launch Issues

Modern editors (like VS Code or Windows Terminal) sometimes:
- Fail to inherit shell environment variables correctly when launched via scripts.
- Open in incorrect directories unless paths are explicitly passed.
- Require administrator privileges for specific PowerShell commands.

These issues are actively being addressed and workarounds are being tested in the PowerShell 5 branch.

## 📌 Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/otaku0304/StartMyDev.git
2. Navigate to the appropriate folder (e.g., windows-ps7/NgBootStart).
3. Customize the setup by editing the Retailers.ps1 file according to your environment and project needs (e.g., choose whether to run frontend, backend, or full-stack; set environment type like local, dev, stage, or prod).

4. Run the launch.bat by double clicking 


## Note

This project is licensed under the Apache License 2.0.

"StartMyDev" is a trademark of Sai Annam (mr_ask_chay). Use of the name or logo without permission is not allowed.
