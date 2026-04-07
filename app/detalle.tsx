import { IconSymbol } from "@/components/ui/icon-symbol";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

function DetalleCard({
  piloto,
  equipo,
  circuito,
  estado,
}: {
  piloto: string;
  equipo: string;
  circuito: string;
  estado: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>🏍️ {piloto}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Equipo</Text>
        <Text style={styles.valor}>{equipo}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Circuito</Text>
        <Text style={styles.valor}>{circuito}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Estado</Text>
        <Text
          style={[
            styles.valor,
            estado === "Disponible" ? styles.disponible : styles.noDisponible,
          ]}
        >
          {estado}
        </Text>
      </View>
    </View>
  );
}

export default function DetalleScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const piloto = (params.piloto as string) ?? "Marc Márquez";
  const equipo = (params.equipo as string) ?? "Ducati";
  const circuito = (params.circuito as string) ?? "Mugello";
  const estado = (params.estado as string) ?? "Disponible";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.titulo}>Detalle del Voto</Text>
        <View style={styles.placeholder} />
      </View>

      <DetalleCard
        piloto={piloto}
        equipo={equipo}
        circuito={circuito}
        estado={estado}
      />

      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Información adicional</Text>
        <View style={styles.statRow}>
          <Text style={styles.statIcon}>⚡</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.statLabel}>Participación activa</Text>
            <Text style={styles.statValue}>Tu voto ha sido registrado</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statIcon}>🏁</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.statLabel}>Próxima carrera</Text>
            <Text style={styles.statValue}>Sábado 15 de junio</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statIcon}>👥</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.statLabel}>Total de votos</Text>
            <Text style={styles.statValue}>+12,450 fans votaron</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.botonRegresar} onPress={() => router.back()}>
        <Text style={styles.textoBoton}>Regresar al Inicio</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  nombre: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f1f",
  },
  label: {
    fontSize: 15,
    color: "#9ca3af",
  },
  valor: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  disponible: {
    color: "#22c55e",
  },
  noDisponible: {
    color: "#f87171",
  },
  statsCard: {
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 22,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  statLabel: {
    fontSize: 14,
    color: "#9ca3af",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginTop: 4,
  },
  botonRegresar: {
    backgroundColor: "#e10600",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#e10600",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
