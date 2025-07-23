Clear-Host
$brandName = "StartMyDev"

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "         WELCOME TO $brandName         " -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Empowering your journey with speed and innovation!" -ForegroundColor Green
Write-Host ""
Write-Host "Visit us at: https://www.google.com/search?q=mr_ask_chay" -ForegroundColor Magenta
Write-Host ""
Write-Host "--------------------------------------" -ForegroundColor DarkCyan

# === CONFIG ===
$backendPath = "{{BACKEND_PATH}}"
$backendPort = {{BACKEND_PORT}}   # Keep as number
$pythonPath = "{{PYTHON_PATH}}"   # e.g., C:\Python39\python.exe

# === FUNCTION TO WAIT FOR PORT WITHOUT PROGRESS LOADER ===
function Wait-ForPort {
    param (
        [int]$Port,
        [int]$TimeoutSeconds = 60
    )

    $startTime = Get-Date
    $endTime = $startTime.AddSeconds($TimeoutSeconds)

    while ((Get-Date) -lt $endTime) {
        try {
            $tcpClient = New-Object Net.Sockets.TcpClient
            $tcpClient.Connect("localhost", $Port)
            $tcpClient.Close()
            return $true
        } catch {
            Start-Sleep -Milliseconds 500
        }
    }

    return $false
}

# === LAUNCH FLASK BACKEND ===
Write-Host "`nLaunching Flask Backend..." -ForegroundColor Cyan
Set-Location $backendPath

# Start Flask backend in a new PowerShell 5 window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; . .\.venv\Scripts\Activate.ps1; $env:FLASK_APP 'app.py'; flask run"

# Wait for Flask to start
Write-Host "`nWaiting for Flask backend to start on port $backendPort..."
if (Wait-ForPort -Port $backendPort -TimeoutSeconds 60) {
    Write-Host "`nFlask Backend is up and running!" -ForegroundColor Green
} else {
    Write-Host "`nFlask Backend did not start within 60 seconds." -ForegroundColor Red
    Read-Host "Press ENTER to close"
    exit 1
}
