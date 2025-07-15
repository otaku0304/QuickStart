# StartMyDev Brand Display

Clear-Host
$brandName = "StartMyDev"

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "         WELCOME TO $brandName         " -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Empowering your journey with speed and innovation!" -ForegroundColor Green
Write-Host ""
Write-Host "Visit us at: https://github.com/otaku0304/StartMyDev" -ForegroundColor Magenta
Write-Host ""
Write-Host "--------------------------------------" -ForegroundColor DarkCyan

# === CONFIG ===
$backendPath = "C:\Path\To\Your\SpringBootProject" Add commentMore actions
$frontendPath = "C:\Path\To\Your\AngularOrReactProject"
$backendPort = 8080
$javaPath = "C:\Path\To\Your\Java"
$springProfile = "dev" # Example: "dev", "prod", or "" for none

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

# === SET JAVA ENVIRONMENT ===
$env:JAVA_HOME = $javaPath
$env:Path = "$javaPath\bin;$env:Path"

# === CHECKOUT BACKEND CODE ===
Write-Host "`nPreparing Backend..." -ForegroundColor DarkGreen
Set-Location $backendPath
Write-Host "Checking out 'development' branch..." -ForegroundColor DarkGreen
git checkout development
Write-Host "Pulling latest changes from origin/development..." -ForegroundColor DarkGreen
git pull origin development

# === PREPARE MAVEN COMMAND ARGUMENTS ===
if ([string]::IsNullOrEmpty($springProfile)) {
    $mvnArgs = "spring-boot:run"
} else {
    $mvnArgs = "spring-boot:run --define spring-boot.run.arguments='--spring.profiles.active=$springProfile'"
}

# === START BACKEND IN NEW POWERSHELL 5 WINDOW ===
Write-Host "`Launching Backend in a new PowerShell 5 window..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; mvn spring-boot:run --define spring-boot.run.arguments='--spring.profiles.active=dev'"

# === WAIT FOR BACKEND TO BE READY ====
if (Wait-ForPort -Port $backendPort -TimeoutSeconds 60) {
    Write-Host "`nBackend is up and running!" -ForegroundColor Cyan
    Write-Host "Preparing Frontend..." -ForegroundColor Cyan

    Set-Location $frontendPath
    git checkout development
    git pull origin development

    Write-Host "`nLaunching Frontend npm install in a new tab..." -ForegroundColor Cyan
    Start-Process wt -ArgumentList @(
     '-w', '0', 'nt', '-d', $frontendPath,
     'powershell', '-NoExit', '-Command', 'npm install'
    )

    Write-Host "`nLaunching Frontend npm start in a new tab..." -ForegroundColor Cyan
    Start-Process wt -ArgumentList @(
     '-w', '0', 'nt', '-d', $frontendPath,
     'powershell', '-NoExit', '-Command', 'npm start'
    )

} else {
    Write-Host "`nBackend did not start on port $backendPort within 60 seconds." -ForegroundColor Red
    Read-Host "Press ENTER to close"
    exit 1
}