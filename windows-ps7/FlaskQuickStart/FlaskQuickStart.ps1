# QuickStart Brand Display

Clear-Host
$brandName = "QuickStart"

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "         WELCOME TO $brandName         " -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Empowering your journey with speed and innovation!" -ForegroundColor Green
Write-Host ""
Write-Host "Visit us at: https://github.com/otaku0304/QuickStart" -ForegroundColor Magenta
Write-Host ""
Write-Host "--------------------------------------" -ForegroundColor DarkCyan

# === CONFIG ===
$flaskPath = "E:\Flask-Projects\Defect_Audict"
$backendPort = 5000
$pythonPath = "D:\installationPath\python3.11"

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
Set-Location $flaskPath

# Start Flask backend in a new PowerShell 7 window
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$flaskPath'; . .\.venv\Scripts\Activate.ps1; $env:FLASK_APP 'app.py'; flask run"

# Wait for Flask to start
Write-Host "`Waiting for Flask backend to start on port $backendPort..."
if (Wait-ForPort -Port $backendPort -TimeoutSeconds 60) {
    Write-Host "`Flask Backend is up and running!" -ForegroundColor Green
} else {
    Write-Host "`Flask Backend did not start within 60 seconds." -ForegroundColor Red
    Read-Host "Press ENTER to close"
    exit 1
}