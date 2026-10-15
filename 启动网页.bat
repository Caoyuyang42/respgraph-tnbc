@echo off
chcp 65001 >nul
cd /d "%~dp0"
start "" "http://127.0.0.1:8788/"
echo 请保留此窗口，结束预览时关闭本窗口。
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 -m http.server 8788 --bind 127.0.0.1
) else (
  python -m http.server 8788 --bind 127.0.0.1
)
pause
