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
$backendPath = "C:\Path\To\Your\SpringBootProject" # change to your path "C:\Path\To\Your\SpringBootProject"
$backendPort = 8080 # change to your backend port
$javaPath = "C:\Path\To\Your\Java" # change to your Java path
$springProfile = "dev" # Example: "dev", "prod", or "" for none
$gitBranch = "development" # Branch to checkout

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

# === START BACKEND IN NEW POWERSHELL 7 WINDOW ===
Write-Host "`Launching Backend in a new PowerShell 7 window..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; mvn $mvnArgs"
