@echo off
npx tsc -p tsconfig.app.json --noEmit > full_errors.txt 2>&1
