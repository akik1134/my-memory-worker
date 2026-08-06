Write-Host "================================"
Write-Host "D1OS Verification Core v0.1"
Write-Host "================================"
Write-Host ""

# Current Path
Write-Host "[Environment]"
Write-Host "Current Path:"
Get-Location
Write-Host ""

# worker.js check
Write-Host "[Project Structure]"

if (Test-Path ".\worker.js") {
    Write-Host "worker.js : OK"
}
else {
    Write-Host "worker.js : NG"
}


# wrangler config check
if (Test-Path ".\wrangler.jsonc") {
    Write-Host "wrangler.jsonc : OK"
}
else {
    Write-Host "wrangler.jsonc : NG"
}


# src check
if (Test-Path ".\src") {
    Write-Host "src : OK"
}
else {
    Write-Host "src : NG"
}


# D1OS Layer check
if (Test-Path ".\src\D1OS") {
    Write-Host "D1OS Layer : OK"
}
else {
    Write-Host "D1OS Layer : NG"
}


Write-Host ""
Write-Host "================================"
Write-Host "Verification Complete"
Write-Host "================================"