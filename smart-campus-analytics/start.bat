@echo off
title Smart Campus Analytics
echo ========================================================
echo   Smart Campus Analytics: AI-Powered Student Success Platform
echo ========================================================
if not exist node_modules (
  echo Dependencies not found. Installing now...
  call npm.cmd install
)
echo Starting development server on http://localhost:3000 ...
echo.
call npm.cmd run dev
pause
