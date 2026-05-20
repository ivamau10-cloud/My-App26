import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { HomeStyles } from "@/styles/authStyles";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

// --- COMPONENTES AUXILIARES DEL PERFIL ---
const ItemMenu = ({ icono, titulo, descripcion, isDark }: any) => (
  <TouchableOpacity
    style={[
      styles.menuItem,
      {
        backgroundColor: isDark ? "#141414" : "#fff",
        borderColor: isDark ? "#222" : "#e5e7eb",
      },
    ]}
    activeOpacity={0.7}
  >
    <View style={styles.menuItemLeft}>
      <Text style={styles.menuItemIcon}>{icono}</Text>
      <View>
        <Text
          style={[styles.menuItemTitle, { color: isDark ? "#fff" : "#111827" }]}
        >
          {titulo}
        </Text>
        {descripcion && <Text style={styles.menuItemSub}>{descripcion}</Text>}
      </View>
    </View>
    <Text style={styles.menuItemFlecha}>›</Text>
  </TouchableOpacity>
);

const StatCard = ({ valor, etiqueta, isDark }: any) => (
  <View
    style={[
      styles.statCard,
      {
        backgroundColor: isDark ? "#141414" : "#fff",
        borderColor: isDark ? "#222" : "#e5e7eb",
      },
    ]}
  >
    <Text style={styles.statValue}>{valor}</Text>
    <Text style={styles.statLabel}>{etiqueta}</Text>
  </View>
);

// --- COMPONENTE PRINCIPAL ---
export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { user, signOut, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getUserName = () => {
    return (
      user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario"
    );
  };

  const getIniciales = () => {
    return getUserName().substring(0, 2).toUpperCase();
  };

  return (
    <ScrollView
      style={[
        HomeStyles.container,
        {
          backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
        },
      ]}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER DE PERFIL / SECCIÓN DE BIENVENIDA */}
      <View style={styles.profileHeaderSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{getIniciales()}</Text>
          <View style={styles.onlineBadge} />
        </View>
        <Text style={[styles.mainName, { color: isDark ? "#fff" : "#111827" }]}>
          {getUserName()}
        </Text>
        <Text style={styles.userRole}>FANS OFICIAL / VIP</Text>
      </View>

      {/* DASHBOARD DE ESTADÍSTICAS RÁPIDAS */}
      <View style={styles.statsRow}>
        <StatCard valor="🏁 Premium" etiqueta="Membresía" isDark={isDark} />
        <StatCard valor="12" etiqueta="Votos Realizados" isDark={isDark} />
      </View>

      {/* BLOQUE DE INFORMACIÓN COMPLETA DE CUENTA */}
      <View style={styles.sectionWrapper}>
        <Text
          style={[styles.sectionTitle, { color: isDark ? "#aaa" : "#4b5563" }]}
        >
          Credenciales de Cuenta
        </Text>
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: isDark ? "#141414" : "#fff",
              borderColor: isDark ? "#222" : "#e5e7eb",
            },
          ]}
        >
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre Completo</Text>
            <Text
              style={[styles.infoValue, { color: isDark ? "#fff" : "#111827" }]}
            >
              {getUserName()}
            </Text>
          </View>
          <View style={[styles.infoRow, styles.borderTop]}>
            <Text style={styles.infoLabel}>Identificador Email</Text>
            <Text
              style={[styles.infoValue, { color: isDark ? "#fff" : "#111827" }]}
            >
              {user?.email}
            </Text>
          </View>
          <View style={[styles.infoRow, styles.borderTop]}>
            <Text style={styles.infoLabel}>Sincronización</Text>
            <Text
              style={[
                styles.infoValue,
                { color: "#e10600", fontWeight: "bold" },
              ]}
            >
              Supabase Conectado
            </Text>
          </View>
        </View>
      </View>

      {/* OPCIONES / AJUSTES ADICIONALES */}
      <View style={styles.sectionWrapper}>
        <Text
          style={[styles.sectionTitle, { color: isDark ? "#aaa" : "#4b5563" }]}
        >
          Preferencias del Paddock
        </Text>
        <ItemMenu
          icono="🔔"
          titulo="Notificaciones Push"
          descripcion="Alertas de carreras y directos"
          isDark={isDark}
        />
        <ItemMenu
          icono="🛡️"
          titulo="Seguridad y Privacidad"
          descripcion="Cambiar contraseña y accesos"
          isDark={isDark}
        />
        <ItemMenu icono="📄" titulo="Términos y Condiciones" isDark={isDark} />
      </View>

      {/* BOTÓN DE CIERRE DE SESIÓN MEJORADO */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.logoutButtonText}>
            🚪 Cerrar Sesión del Sistema
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

// --- ESTILOS INTERNOS DE ALTO RENDIMIENTO ---
const styles = StyleSheet.create<any>({
  scrollContainer: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 60,
  },
  profileHeaderSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    width: 85,
    height: 85,
    borderRadius: 45,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#e10600", // Borde distintivo de la app
    marginBottom: 12,
    position: "relative",
  },
  avatarText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  onlineBadge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#22c55e",
    position: "absolute",
    bottom: 2,
    right: 2,
    borderWidth: 2,
    borderColor: "#0a0a0a",
  },
  mainName: {
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },
  userRole: {
    fontSize: 11,
    color: "#e10600",
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  sectionWrapper: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
  },
  infoCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
  },
  infoRow: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: "#1f1f1f",
    marginTop: 4,
  },
  infoLabel: {
    color: "#666",
    fontSize: 13,
    fontWeight: "650",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemIcon: {
    fontSize: 18,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  menuItemSub: {
    color: "#555",
    fontSize: 12,
    marginTop: 1,
  },
  menuItemFlecha: {
    color: "#555",
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#b91c1c", // Color rojo oscuro mate para salida destructiva
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
