# PowerShell Script to Update .env File
# Run this script and paste your correct credentials when prompted

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Supabase .env Update Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Please visit: https://supabase.com/dashboard/project/stdqhbqpcrcccguaqxuq/settings/api" -ForegroundColor Yellow
Write-Host ""

# Backup existing .env
Copy-Item .env .env.backup-$(Get-Date -Format "yyyyMMdd-HHmmss") -ErrorAction SilentlyContinue
Write-Host "✓ Backed up existing .env file" -ForegroundColor Green

Write-Host ""
Write-Host "Enter your Supabase credentials:" -ForegroundColor Cyan
Write-Host ""

$dbPassword = Read-Host "Database Password"
$anonKey = Read-Host "ANON Public Key (the long JWT token)"
$serviceRoleKey = Read-Host "Service Role Key (optional, press Enter to skip)"

# Create new .env content
$envContent = @"
DATABASE_URL="postgresql://postgres:${dbPassword}@db.stdqhbqpcrcccguaqxuq.supabase.co:5432/postgres"

# Next.js
NEXTAUTH_URL="http://localhost:3000"

# Node Environment
NODE_ENV="development"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://stdqhbqpcrcccguaqxuq.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="${anonKey}"
"@

if ($serviceRoleKey) {
    $envContent += "`nSUPABASE_SERVICE_ROLE_KEY=`"${serviceRoleKey}`""
}

# Write to .env file
$envContent | Set-Content .env -Encoding UTF8

Write-Host ""
Write-Host "✓ .env file updated successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Restart your dev server (Ctrl+C, then 'npm run dev')" -ForegroundColor White
Write-Host "2. Go to http://localhost:3000" -ForegroundColor White
Write-Host "3. Login and test the connection" -ForegroundColor White
Write-Host ""

