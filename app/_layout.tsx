import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {session ? (
          // Si hay sesión, entra al grupo de pestañas
          <Stack.Screen name="(tabs)" />
        ) : (
          // Si no hay sesión, va al grupo de autenticación
          <Stack.Screen name="auth" />
        )}
        {/* Pantallas globales fuera de tabs */}
        <Stack.Screen
          name="profile"
          options={{ headerShown: true, title: "Mi Perfil" }}
        />
        <Stack.Screen
          name="usuarioDetalle"
          options={{ headerShown: true, title: "Detalle del Usuario" }}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
