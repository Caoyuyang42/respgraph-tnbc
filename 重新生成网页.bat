@echo off
chcp 65001 >nul
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 build_frontend.py
) else (
  python build_frontend.py
)
echo.
echo 生成成功后，刷新浏览器即可查看修改。
pause
