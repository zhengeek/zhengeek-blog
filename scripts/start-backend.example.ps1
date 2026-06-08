$ErrorActionPreference = "Stop"

$port = 8080
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$backendDir = Join-Path $repoRoot "backend"

$connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue

if ($connections) {
  $pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique
  Write-Host "Port $port is already in use." -ForegroundColor Yellow

  foreach ($processId in $pids) {
    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
    $processName = if ($process) { $process.ProcessName } else { "unknown" }
    Write-Host "PID: $processId ($processName)"
  }

  $answer = Read-Host "Kill the process(es) using port $port? Type Y to kill, or press Enter to cancel"

  if ($answer -eq "Y" -or $answer -eq "y") {
    foreach ($processId in $pids) {
      Stop-Process -Id $processId -Force
      Write-Host "Stopped PID $processId"
    }
  } else {
    Write-Host "Backend not started. To stop the process manually, run:"
    foreach ($processId in $pids) {
      Write-Host "  Stop-Process -Id $processId -Force"
    }
    exit 1
  }
}

$env:DB_URL = "jdbc:mysql://localhost:3306/zhengeek_blog?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "your_mysql_password"
$env:CORS_ALLOWED_ORIGINS = "http://localhost:5173"

Write-Host "Starting ZhenGeek backend on port $port..."
Write-Host "You can also copy backend/.env.example to backend/.env and set DB_PASSWORD there."

Set-Location $backendDir
mvn spring-boot:run
