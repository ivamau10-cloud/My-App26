import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router"; // Importación de navegación integrada
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function LoginScreen() {
  const { signIn, loading } = useAuth();
  const router = useRouter(); // Instancia de router para movernos a la pista de registro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // --- CONFIGURACIÓN DE ANIMACIONES ---
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacidad inicial
  const slideAnim = useRef(new Animated.Value(30)).current; // Desplazamiento inicial (30px abajo)

  useEffect(() => {
    // Ejecuta la animación al montar la pantalla
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        "❌ Acceso Denegado",
        "Por favor ingresa tu correo y contraseña.",
      );
      return;
    }

    try {
      await signIn(email.trim(), password);
    } catch (error: any) {
      Alert.alert(
        "❌ Error de Autenticación",
        error.message || "Credenciales incorrectas.",
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainWrapper}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Contenedor Animado */}
        <Animated.View
          style={[
            styles.animatedContent,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Encabezado Estilo Paddock */}
          <View style={styles.logoSection}>
            <View style={styles.badgeLive}>
              <Text style={styles.badgeLiveText}>LIVE SESSION</Text>
            </View>
            <Text style={styles.brandTitle}>
              MOTOGP <Text style={styles.redText}>PADDOCK</Text>
            </Text>
            <Text style={styles.brandSub}>CONTROL DE ACCESO OFICIAL</Text>
          </View>

          {/* Formulario Elegante */}
          <View style={styles.formContainer}>
            {/* Campo de Email */}
            <View style={styles.campo}>
              <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
              <TextInput
                placeholder="piloto@motogp.com"
                placeholderTextColor="#444"
                autoCapitalize="none"
                keyboardType="email-address"
                style={[styles.input, isEmailFocused && styles.inputFocused]}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
            </View>

            {/* Campo de Contraseña */}
            <View style={styles.campo}>
              <Text style={styles.label}>CONTRASEÑA DE SEGURIDAD</Text>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#444"
                secureTextEntry
                autoCapitalize="none"
                style={[styles.input, isPasswordFocused && styles.inputFocused]}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
            </View>

            {/* Botón de Ingreso de Alta Competencia */}
            <Pressable
              style={({ pressed }) => [
                styles.botonIngresar,
                loading && styles.botonDisabled,
                pressed &&
                  !loading && { opacity: 0.85, transform: [{ scale: 0.98 }] },
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.botonTexto}>INICIAR SESIÓN ⚡</Text>
              )}
            </Pressable>
          </View>

          {/* Enlace de navegación hacia el Registro */}
          <Pressable
            onPress={() => router.push("/register")}
            style={styles.linkContainer}
          >
            <Text style={styles.linkText}>
              ¿No tienes cuenta de piloto?{" "}
              <Text style={styles.linkTextBold}>Regístrate aquí</Text>
            </Text>
          </Pressable>

          {/* Sello de seguridad en el pie */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              🔒 Encrypted connection via Supabase Auth
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --- ESTILOS VISUALES PREMIUM ---
const styles = StyleSheet.create<any>({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#0a0a0a", // Negro profundo de carreras
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  animatedContent: {
    width: "100%",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  badgeLive: {
    backgroundColor: "rgba(225, 6, 0, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(225, 6, 0, 0.3)",
    marginBottom: 14,
  },
  badgeLiveText: {
    color: "#e10600",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },
  brandTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 0.5,
  },
  redText: {
    color: "#e10600",
  },
  brandSub: {
    fontSize: 11,
    color: "#555",
    fontWeight: "700",
    letterSpacing: 1.5,
    marginTop: 6,
  },
  formContainer: {
    backgroundColor: "#141414", // Gris oscuro mate para el contenedor
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#222",
  },
  campo: {
    marginBottom: 22,
  },
  label: {
    color: "#666",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#0d0d0d", // Fondo interno ultra oscuro
    padding: 16,
    borderRadius: 16,
    color: "#fff",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#222",
  },
  inputFocused: {
    borderColor: "#e10600", // El borde brilla en rojo MotoGP al escribir
  },
  botonIngresar: {
    backgroundColor: "#e10600",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#e10600",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  botonDisabled: {
    backgroundColor: "#333",
    shadowOpacity: 0,
    elevation: 0,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 15,
    letterSpacing: 1,
  },
  linkContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  linkText: {
    color: "#666",
    fontSize: 14,
  },
  linkTextBold: {
    color: "#e10600",
    fontWeight: "700",
  },
  footerContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  footerText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "600",
  },
});
