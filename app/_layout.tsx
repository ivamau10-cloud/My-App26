import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Ocultar la Splash Screen cuando Supabase termine de verificar la sesión
  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  // --- CONTROL DE FLUJO Y REDIRECCIÓN NATIVA ---
  useEffect(() => {
    if (loading) return;

    const authRoutes = ["login", "register"];
    const inAuthRoute = segments.some((segment) =>
      authRoutes.includes(segment),
    );

    if (!session && !inAuthRoute) {
      // Si no hay sesión iniciada y no está en el login, lo mandamos para allá
      router.replace("/login");
    } else if (session && inAuthRoute) {
      // Si el usuario inició sesión con éxito y seguía en el login, lo metemos a la app
      router.replace("/");
    }
  }, [session, loading, segments]);

  if (loading) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Definimos los grupos principales */}
        <Stack.Screen name="(tabs)" />

        {/* Pantallas globales fuera de las pestañas */}
        <Stack.Screen
          name="usuarioDetalle"
          options={{
            headerShown: false, // Oculto porque le fabricamos su propio botón premium de volver
            title: "Detalle del Usuario",
          }}
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
