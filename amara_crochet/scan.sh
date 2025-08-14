#!/bin/bash

echo "🔍 Escaneando puertos locales para verificar servicios..."

# Define los puertos que quieres verificar
PORTS="3000,5432,6379"

# Ejecuta Nmap en localhost
nmap -p $PORTS localhost

echo ""
echo "✅ Escaneo completado. Si ves puertos como 'open', tus servicios están activos."
echo "❌ Si algún puerto aparece como 'closed', revisa tu configuración de Docker o Dev Container."
