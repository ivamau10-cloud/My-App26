import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Usuario {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
}

export default function ApiTab() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const datos = await respuesta.json();
      setUsuarios(datos);
      setError("");
    } catch (e) {
      console.log(e);
      setError("No se pudieron cargar los usuarios del sistema");
    } finally {
      setCargando(false);
    }
  };

  // --- ESTADO DE CARGA PREMIUM ---
  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e10600" />
        <Text style={styles.loadingText}>Sincronizando pilotos...</Text>
      </View>
    );
  }

  // --- ESTADO DE ERROR REESTILIZADO ---
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.error}>{error}</Text>
        <Pressable
          style={({ pressed }) => [styles.boton, pressed && { opacity: 0.8 }]}
          onPress={cargarUsuarios}
        >
          <Text style={styles.botonTexto}>Reintentar Conexión</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Encabezado Principal */}
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>Panel Global</Text>
        <Text style={styles.titulo}>Directorio Oficial</Text>
        <Text style={styles.subtitulo}>
          Datos en tiempo real mediante API REST
        </Text>
      </View>

      {/* Listado Optimizado */}
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={() =>
              router.push({
                pathname: "/usuarioDetalle",
                params: {
                  id: item.id,
                  nombre: item.name,
                  usuario: item.username,
                  correo: item.email,
                  telefono: item.phone,
                  sitio: item.website,
                  empresa: item.company.name,
                  ciudad: item.address.city,
                },
              })
            }
          >
            <View style={styles.cardHeader}>
              <Text style={styles.nombre}>{item.name}</Text>
              <Text style={styles.usernameBadge}>@{item.username}</Text>
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.info}>
                <Text style={styles.infoLabel}>Mails: </Text>
                {item.email}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.infoLabel}>Sede: </Text>
                {item.address.city}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.infoLabel}>Team: </Text>
                {item.company.name}
              </Text>
            </View>

            <View style={styles.verMasContainer}>
              <Text style={styles.verMas}>Ver ficha de piloto</Text>
              <Text style={styles.verMasFlecha}>→</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

// --- CONFIGURACIÓN DE ESTILOS UNIFICADOS ---
const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#0a0a0a", // Negro profundo idéntico al index
  },
  titleContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  welcomeText: {
    color: "#666",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 2,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "900", // Tipografía robusta de marca
    color: "#fff",
    textAlign: "center",
  },
  subtitulo: {
    textAlign: "center",
    color: "#555",
    fontSize: 13,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#141414", // Gris oscuro para las tarjetas
    padding: 16,
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#222",
  },
  cardPressed: {
    borderColor: "#e10600", // Al presionar se ilumina con el rojo de carreras
    backgroundColor: "#181818",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  nombre: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
    flex: 1,
    marginRight: 8,
  },
  usernameBadge: {
    color: "#e10600",
    fontSize: 12,
    fontWeight: "600",
    backgroundColor: "rgba(225, 6, 0, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  infoGroup: {
    backgroundColor: "#0d0d0d", // Contenedor interno para organizar los datos limpios
    padding: 12,
    borderRadius: 12,
    gap: 4,
  },
  info: {
    color: "#ccc",
    fontSize: 14,
  },
  infoLabel: {
    color: "#555",
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: 11,
  },
  verMasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#1f1f1f",
  },
  verMas: {
    color: "#aaa",
    fontSize: 13,
    fontWeight: "600",
  },
  verMasFlecha: {
    color: "#e10600",
    fontSize: 16,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0a0a0a",
  },
  loadingText: {
    marginTop: 14,
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  errorIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  error: {
    color: "#e10600",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 15,
  },
  boton: {
    backgroundColor: "#e10600",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    shadowColor: "#e10600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
