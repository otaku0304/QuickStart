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
$backendPath = "{{BACKEND_PATH}}"
$backendPort = "{{BACKEND_PORT}}"
$javaPath = "{{JAVA_PATH}}"
$springProfile = "{{SPRING_PROFILE}}"
$gitBranch = "{{GIT_BRANCH}}"

# === SET JAVA ENVIRONMENT ===
$env:JAVA_HOME = $javaPath
$env:Path = "$javaPath\bin;$env:Path"

# === GIT BRANCH CHECKOUT AND PULL THE LATEST CHANGES ===
Write-Host "`nPreparing Backend..." -ForegroundColor DarkGreen
Set-Location $backendPath
Write-Host "Checking out '$gitBranch' branch..." -ForegroundColor DarkGreen
git checkout $gitBranch
Write-Host "Pulling latest changes from origin/$gitBranch..." -ForegroundColor DarkGreen
git pull origin $gitBranch

# === PREPARE MAVEN COMMAND ARGUMENTS ===
if ([string]::IsNullOrEmpty($springProfile)) {
    $mvnArgs = "spring-boot:run"
} else {
    $mvnArgs = "spring-boot:run --define spring-boot.run.arguments='--spring.profiles.active=$springProfile'"
}

# === START BACKEND IN NEW POWERSHELL 5 WINDOW ===
Write-Host "`Launching Backend in a new PowerShell 5 window..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; mvn spring-boot:run --define spring-boot.run.arguments='--spring.profiles.active=dev'"
