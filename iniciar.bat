@echo off
echo =========================================
echo        Iniciando o BipEscola...
echo =========================================

echo.
echo [1/2] Iniciando o servidor Backend...
start "BipEscola - Backend" cmd /k "cd backend && npm start"

echo [2/2] Iniciando o Expo (Frontend Mobile)...
start "BipEscola - Mobile (Expo)" cmd /k "cd mobile && set NODE_OPTIONS=--max-old-space-size=4096 && npm start -- -c"

echo.
echo =========================================
echo  Servicos iniciados em novas janelas!
echo  Voce ja pode fechar esta janela.
echo =========================================
pause
