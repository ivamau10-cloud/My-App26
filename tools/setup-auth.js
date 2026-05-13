#!/usr/bin/env node

/**
 * Script de verificación e instalación de dependencias para autenticación
 * Ejecutar con: npm run setup-auth
 */

const fs = require("fs");
const path = require("path");

console.log("🔐 Iniciando verificación del sistema de autenticación...\n");

// Verificar archivos necesarios
const requiredFiles = [
  "context/AuthContext.tsx",
  "app/auth/login.tsx",
  "app/auth/signup.tsx",
  "app/auth/forgot-password.tsx",
  "app/profile.tsx",
  "app/home.tsx",
  "styles/authStyles.ts",
  "lib/supabase.js",
];

console.log("📁 Verificando archivos de autenticación:\n");

const baseDir = path.dirname(__filename);
const projectDir = path.join(baseDir, "..");

let allFilesExist = true;
requiredFiles.forEach((file) => {
  const filePath = path.join(projectDir, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? "✅" : "❌";
  console.log(`${status} ${file}`);
  if (!exists) allFilesExist = false;
});

console.log("\n");

if (allFilesExist) {
  console.log("✅ Todos los archivos de autenticación están presentes.\n");
} else {
  console.log(
    "❌ Algunos archivos faltan. Por favor, verifica la instalación.\n",
  );
  process.exit(1);
}

// Verificar dependencias en package.json
console.log("📦 Verificando dependencias requeridas:\n");

const packageJsonPath = path.join(projectDir, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const dependencies = packageJson.dependencies || {};

const requiredDeps = [
  "@supabase/supabase-js",
  "@react-native-async-storage/async-storage",
  "expo-router",
  "react-native",
];

let allDepsInstalled = true;
requiredDeps.forEach((dep) => {
  const exists = dep in dependencies;
  const status = exists ? "✅" : "❌";
  const version = dependencies[dep] || "no instalada";
  console.log(`${status} ${dep}@${version}`);
  if (!exists) allDepsInstalled = false;
});

console.log("\n");

if (allDepsInstalled) {
  console.log("✅ Todas las dependencias están instaladas.\n");
} else {
  console.log("❌ Algunas dependencias faltan. Ejecuta: npm install\n");
}

// Verificar configuración de Supabase
console.log("🔑 Verificando configuración de Supabase:\n");

const supabaseFile = path.join(projectDir, "lib/supabase.js");
const supabaseContent = fs.readFileSync(supabaseFile, "utf-8");

const hasUrl = supabaseContent.includes("supabaseUrl");
const hasKey = supabaseContent.includes("supabaseAnonKey");
const hasClient = supabaseContent.includes("createClient");

console.log(`${hasUrl ? "✅" : "❌"} Supabase URL configurada`);
console.log(`${hasKey ? "✅" : "❌"} Supabase Anon Key configurada`);
console.log(`${hasClient ? "✅" : "❌"} Cliente Supabase creado`);

console.log("\n");

// Resumen final
if (allFilesExist && allDepsInstalled && hasUrl && hasKey) {
  console.log("✅ ¡El sistema de autenticación está listo!\n");
  console.log("📝 Próximos pasos:");
  console.log("1. Verifica la configuración en SETUP_AUTH.md");
  console.log("2. Ejecuta: npm start (o npm run ios/android/web)");
  console.log("3. Prueba el registro y login\n");
} else {
  console.log("❌ El sistema no está completamente configurado.\n");
  console.log(
    "⚠️  Por favor, verifica los archivos y dependencias anteriores.\n",
  );
}
