import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// --- COMPONENTES AUXILIARES ---
const Seccion = ({ icono, titulo }: { icono: string; titulo: string }) => (
  <View style={styles.seccionHeader}>
    <Text style={styles.seccionIcono}>{icono}</Text>
    <Text style={styles.seccionTitulo}>{titulo}</Text>
  </View>
);

const Campo = ({ label, valor }: { label: string; valor: any }) => (
  <View style={styles.campo}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.valor}>{valor}</Text>
  </View>
);

// --- COMPONENTE PRINCIPAL ---
export default function UsuarioDetalle() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.botonVolver} onPress={() => router.back()}>
        <Text style={styles.botonVolverTexto}>← Volver</Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.titulo}>{params.nombre}</Text>
      </View>

      <View style={styles.card}>
        <Seccion icono="👤" titulo="Información Personal" />
        <Campo label="Usuario:" valor={params.usuario} />
        <Campo label="Correo:" valor={params.correo} />
        <Campo label="Teléfono:" valor={params.telefono} />
        <Campo label="Sitio web:" valor={params.sitio} />
      </View>

      <View style={styles.card}>
        <Seccion icono="🏢" titulo="Empresa" />
        <Campo label="Nombre:" valor={params.empresa} />
      </View>

      <View style={styles.card}>
        <Seccion icono="📍" titulo="Ubicación" />
        <Campo label="Ciudad:" valor={params.ciudad} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#f3f4f6",
  },

  botonVolver: {
    marginBottom: 16,
  },

  botonVolverTexto: {
    color: "#111827",
    fontWeight: "bold",
    fontSize: 16,
  },

  header: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
  },

  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },

  seccionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  seccionIcono: {
    fontSize: 24,
    marginRight: 8,
  },

  seccionTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  campo: {
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
    marginBottom: 4,
  },

  valor: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
});
