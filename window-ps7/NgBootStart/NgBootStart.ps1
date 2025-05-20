# === CONFIG ===
$backendPath = "D:\repositories\work\retailers\retailers-service" 
$frontendPath = "D:\repositories\work\retailers\retailers-dashboard"
$backendPort = 8080
$javaPath = "D:\installationPath\java_21"
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
Write-Host "`Preparing Backend"
Set-Location $backendPath
git checkout development
git pull origin development

# === PREPARE MAVEN COMMAND ARGUMENTS ===
if ([string]::IsNullOrEmpty($springProfile)) {
    $mvnArgs = "spring-boot:run"
} else {
    $mvnArgs = "spring-boot:run --define spring-boot.run.arguments='--spring.profiles.active=$springProfile'"
}

# === START BACKEND IN NEW POWERSHELL 7 WINDOW ===
Write-Host "`Launching Backend in a new PowerShell 7 window..."
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; mvn $mvnArgs"

# === WAIT FOR BACKEND TO BE READY ===
Write-Host "`Waiting for Backend to start on port $backendPort..."
if (Wait-ForPort -Port $backendPort -TimeoutSeconds 60) {
    Write-Host "`Backend is up and running!"
    Write-Host "`Preparing Frontend"
    Set-Location $frontendPath
    git checkout development
    git pull origin development
    Write-Host "`Launching Frontend in a new tab..."
    wt -w 0 nt -d "$frontendPath" pwsh -NoExit -Command "npm install && npm start"
} else {
    Write-Host "`Backend did not start on port $backendPort within 60 seconds."
    Read-Host "Press ENTER to close"
    exit 1
}
