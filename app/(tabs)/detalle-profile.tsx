import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { HomeStyles } from "@/styles/authStyles";
import React from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

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
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Section */}
      <View style={HomeStyles.headerSection}>
        <Text style={[HomeStyles.greeting, isDark && HomeStyles.darkGreeting]}>
          Mi Perfil
        </Text>
        <Text style={[HomeStyles.email, isDark && HomeStyles.darkEmail]}>
          Bienvenido {getUserName()}
        </Text>
      </View>

      {/* Profile Card */}
      <View style={HomeStyles.profileCard}>
        <Text style={HomeStyles.profileCardText}>👤 {getUserName()}</Text>
        <Text style={HomeStyles.profileCardText}>📧 {user?.email}</Text>

        {/* Logout Button */}
        <TouchableOpacity
          style={HomeStyles.logoutButton}
          onPress={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={HomeStyles.logoutButtonText}>Cerrar Sesión</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={{ marginTop: 30, marginBottom: 50 }}>
        <Text
          style={[
            HomeStyles.greeting,
            { fontSize: 20 },
            isDark && HomeStyles.darkGreeting,
          ]}
        >
          Información de tu Cuenta
        </Text>

        <View
          style={{
            backgroundColor: isDark ? "#222" : "#f5f5f5",
            borderRadius: 12,
            padding: 16,
            marginTop: 16,
          }}
        >
          <Text
            style={[
              HomeStyles.email,
              isDark && HomeStyles.darkEmail,
              { marginBottom: 8 },
            ]}
          >
            📧 Correo:
          </Text>
          <Text
            style={[
              HomeStyles.email,
              isDark && HomeStyles.darkEmail,
              { fontSize: 16, fontWeight: "600", marginBottom: 16 },
            ]}
          >
            {user?.email}
          </Text>

          <Text
            style={[
              HomeStyles.email,
              isDark && HomeStyles.darkEmail,
              { marginBottom: 8 },
            ]}
          >
            👤 Nombre:
          </Text>
          <Text
            style={[
              HomeStyles.email,
              isDark && HomeStyles.darkEmail,
              { fontSize: 16, fontWeight: "600" },
            ]}
          >
            {getUserName()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
