import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
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

export default function RegisterScreen() {
  const { signUp, loading } = useAuth();
  const router = useRouter();

  // Estados para el formulario de Supabase
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");

  // Estados de foco para el diseño de los inputs
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Animaciones de entrada (Fade-in + Slide)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
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

  const handleRegister = async () => {
    if (
      !email.trim() ||
      !password.trim() ||
      !fullName.trim() ||
      !nombreUsuario.trim()
    ) {
      Alert.alert(
        "❌ Registro Incompleto",
        "Por favor llena todos los campos del formulario.",
      );
      return;
    }

    try {
      await signUp(
        email.trim(),
        password,
        fullName.trim(),
        nombreUsuario.trim(),
      );
      Alert.alert(
        "🏁 ¡Piloto Registrado!",
        "Tu cuenta ha sido creada con éxito.",
      );
      // El AuthContext o el layout te meterán a la app de inmediato si inicia sesión automáticamente
    } catch (error: any) {
      Alert.alert(
        "❌ Error en Registro",
        error.message || "No se pudo crear la cuenta.",
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
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          {/* Encabezado */}
          <View style={styles.logoSection}>
            <View style={styles.badgeLive}>
              <Text style={styles.badgeLiveText}>NUEVO PILOTO</Text>
            </View>
            <Text style={styles.brandTitle}>
              CREAR <Text style={styles.redText}>CUENTA</Text>
            </Text>
            <Text style={styles.brandSub}>ÚNETE AL EQUIPO OFICIAL</Text>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            {/* Nombre Completo */}
            <View style={styles.campo}>
              <Text style={styles.label}>NOMBRE COMPLETO</Text>
              <TextInput
                placeholder="Ej: Valentino Rossi"
                placeholderTextColor="#444"
                style={[
                  styles.input,
                  focusedField === "fullName" && styles.inputFocused,
                ]}
                value={fullName}
                onChangeText={setFullName}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Nombre de Usuario */}
            <View style={styles.campo}>
              <Text style={styles.label}>NOMBRE DE USUARIO (@)</Text>
              <TextInput
                placeholder="Ej: vr46_doctor"
                placeholderTextColor="#444"
                autoCapitalize="none"
                style={[
                  styles.input,
                  focusedField === "username" && styles.inputFocused,
                ]}
                value={nombreUsuario}
                onChangeText={setNombreUsuario}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Correo Electrónico */}
            <View style={styles.campo}>
              <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
              <TextInput
                placeholder="tu@correo.com"
                placeholderTextColor="#444"
                autoCapitalize="none"
                keyboardType="email-address"
                style={[
                  styles.input,
                  focusedField === "email" && styles.inputFocused,
                ]}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Contraseña */}
            <View style={styles.campo}>
              <Text style={styles.label}>CONTRASEÑA DE SEGURIDAD</Text>
              <TextInput
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#444"
                secureTextEntry
                autoCapitalize="none"
                style={[
                  styles.input,
                  focusedField === "password" && styles.inputFocused,
                ]}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Botón de Registro */}
            <Pressable
              style={({ pressed }) => [
                styles.botonIngresar,
                loading && styles.botonDisabled,
                pressed &&
                  !loading && { opacity: 0.85, transform: [{ scale: 0.98 }] },
              ]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.botonTexto}>DARSE DE ALTA ⚡</Text>
              )}
            </Pressable>
          </View>

          {/* Enlace para volver al Login si ya tiene cuenta */}
          <Pressable onPress={() => router.push("/login")} style={styles.linkContainer}>
            <Text style={styles.linkText}>
              ¿Ya eres miembro?{" "}
              <Text style={styles.linkTextBold}>Inicia Sesión aquí</Text>
            </Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --- ESTILOS COMPARTIDOS MOTO GP ---
const styles = StyleSheet.create<any>({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  badgeLive: {
    backgroundColor: "rgba(225, 6, 0, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(225, 6, 0, 0.3)",
    marginBottom: 12,
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
    backgroundColor: "#141414",
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#222",
  },
  campo: {
    marginBottom: 18,
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
    backgroundColor: "#0d0d0d",
    padding: 14,
    borderRadius: 16,
    color: "#fff",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#222",
  },
  inputFocused: {
    borderColor: "#e10600",
  },
  botonIngresar: {
    backgroundColor: "#e10600",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
    marginBottom: 20,
  },
  linkText: {
    color: "#666",
    fontSize: 14,
  },
  linkTextBold: {
    color: "#e10600",
    fontWeight: "700",
  },
});
