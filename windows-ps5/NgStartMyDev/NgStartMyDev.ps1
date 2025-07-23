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
$frontendPath = "{{FRONTEND_PATH}}"
$frontendPort = "{{FRONTEND_PORT}}"
$gitBranch = "{{GIT_BRANCH}}"

# === GIT BRANCH CHECKOUT AND PULL THE LATEST CHANGES ===
Write-Host "Checking out '$gitBranch' branch..." -ForegroundColor DarkGreen
Set-Location $frontendPath
git checkout $gitBranch
Write-Host "Pulling latest changes from origin/$gitBranch..." -ForegroundColor DarkGreen
git pull origin $gitBranch

# === LAUNCH FRONTEND IN NEW TABS (PowerShell 5 Compatible) ===
Write-Host "`nLaunching Frontend npm install in a new tab..." -ForegroundColor Cyan
Start-Process wt.exe -ArgumentList @(
  '-w', '0', 'nt', '-d', "`"$frontendPath`"",
  'powershell', '-NoExit', '-Command', 'npm install'
)

Write-Host "`nLaunching Frontend npm start in a new tab..." -ForegroundColor Cyan
Start-Process wt.exe -ArgumentList @(
  '-w', '0', 'nt', '-d', "`"$frontendPath`"",
  'powershell', '-NoExit', '-Command', 'npm start'
)
