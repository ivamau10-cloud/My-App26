import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// --- COMPONENTES AUXILIARES ESTILIZADOS A LA APP ---
const Seccion = ({ icono, titulo }: { icono: string; titulo: string }) => (
  <View style={styles.seccionHeader}>
    <Text style={styles.seccionIcono}>{icono}</Text>
    <Text style={styles.seccionTitulo}>{titulo}</Text>
  </View>
);

const Campo = ({ label, valor }: { label: string; valor: any }) => (
  <View style={styles.campo}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.valor}>{valor || "No especificado"}</Text>
  </View>
);

// --- COMPONENTE PRINCIPAL ---
export default function UsuarioDetalle() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <ScrollView
      style={styles.mainWrapper}
      contentContainerStyle={styles.container}
    >
      {/* Botón Volver Estilo Premium */}
      <Pressable
        style={({ pressed }) => [
          styles.botonVolver,
          pressed && { opacity: 0.7 },
        ]}
        onPress={() => router.back()}
      >
        <Text style={styles.botonVolverTexto}>← Volver</Text>
      </Pressable>

      {/* Header con el Nombre del Usuario */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Detalle del Perfil</Text>
        <Text style={styles.titulo}>{params.nombre}</Text>
      </View>

      {/* Bloque: Información Personal */}
      <View style={styles.card}>
        <Seccion icono="👤" titulo="Información Personal" />
        <View style={styles.gridCampos}>
          <Campo label="Nombre de Usuario" valor={params.usuario} />
          <Campo label="Correo Electrónico" valor={params.correo} />
          <Campo label="Teléfono de Contacto" valor={params.telefono} />
          <Campo label="Sitio Web" valor={params.sitio} />
        </View>
      </View>

      {/* Bloque: Empresa */}
      <View style={styles.card}>
        <Seccion icono="🏢" titulo="Escudería / Empresa" />
        <View style={styles.gridCampos}>
          <Campo label="Nombre Corporativo" valor={params.empresa} />
        </View>
      </View>

      {/* Bloque: Ubicación */}
      <View style={styles.card}>
        <Seccion icono="📍" titulo="Ubicación Base" />
        <View style={styles.gridCampos}>
          <Campo label="Ciudad / Sede" valor={params.ciudad} />
        </View>
      </View>
    </ScrollView>
  );
}

// --- ESTILOS ADAPTADOS A MOTOGP APP ---
const styles = StyleSheet.create<any>({
  mainWrapper: {
    backgroundColor: "#0a0a0a", // Mismo fondo ultra negro del index
    flex: 1,
  },
  container: {
    padding: 20,
    paddingTop: 40,
  },
  botonVolver: {
    alignSelf: "flex-start",
    backgroundColor: "#141414",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#222",
  },
  botonVolverTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  header: {
    backgroundColor: "#141414",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#222",
    borderLeftWidth: 4,
    borderLeftColor: "#e10600", // Detalle en rojo de carreras
  },
  welcomeText: {
    color: "#666",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "900", // Estilo de tipografía pesada
    color: "#fff",
  },
  card: {
    backgroundColor: "#141414",
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#222",
  },
  seccionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  seccionIcono: {
    fontSize: 20,
    marginRight: 10,
  },
  seccionTitulo: {
    fontSize: 16,
    fontWeight: "900",
    color: "#fff",
  },
  gridCampos: {
    gap: 12,
  },
  campo: {
    backgroundColor: "#0d0d0d", // Contenedor interno oscuro para los datos
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1a1a1a",
  },
  label: {
    fontSize: 11,
    color: "#666",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  valor: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
  },
});
