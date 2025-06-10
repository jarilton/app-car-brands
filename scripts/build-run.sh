#!/bin/bash

# Executa o prebuild para garantir que a pasta ios seja criada
npx expo prebuild

# Verifica se o arquivo Podfile existe
PODFILE="./ios/Podfile"

if [ ! -f "$PODFILE" ]; then
  echo "Podfile not found in the ios directory."
  exit 1
fi

# Adiciona use_modular_headers! no início do Podfile se não estiver presente
if ! grep -q "use_modular_headers!" "$PODFILE"; then
  echo "Adding use_modular_headers! to Podfile."
  printf '%s\n%s\n' "use_modular_headers!" "$(cat "$PODFILE")" > "$PODFILE"
else
  echo "use_modular_headers! is already present in Podfile."
fi

# Executa pod install
echo "Running pod install..."
cd ./ios
pod install --repo-update --ansi

if [ $? -ne 0 ]; then
  echo "pod install failed."
  exit 1
fi

echo "pod install succeeded."
