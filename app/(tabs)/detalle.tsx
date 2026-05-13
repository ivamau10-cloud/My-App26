import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";

type DetalleProps = {
  piloto?: string;
  equipo?: string;
  circuito?: string;
  estado?: string;
};

function DetalleCard({ piloto, equipo, circuito, estado }: DetalleProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{piloto || "Sin piloto"}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Equipo</Text>
        <Text style={styles.valor}>{equipo || "—"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Circuito</Text>
        <Text style={styles.valor}>{circuito || "—"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Estado</Text>
        <Text
          style={[
            styles.valor,
            estado === "activo" ? styles.disponible : styles.noDisponible,
          ]}
        >
          {estado || "—"}
        </Text>
      </View>
    </View>
  );
}

export default function DetalleScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  // Mock / local state (can be replaced with real data)
  const [votoPiloto, setVotoPiloto] = useState<string | null>(null);
  const [votoMoto, setVotoMoto] = useState<string | null>(null);

  const pilotos = ["Valentino", "Marc", "Jorge"];
  const motos = ["Yamaha", "Ducati", "Honda"];

  const piloto = "Valentino";
  const equipo = "VR46";
  const circuito = "Circuito de ejemplo";
  const estado = "activo";

  const votarPiloto = (p: string) => setVotoPiloto(p);
  const votarMoto = (m: string) => setVotoMoto(m);
  const limpiarVotos = () => {
    setVotoPiloto(null);
    setVotoMoto(null);
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
        },
      ]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => router.replace("/")}
          style={styles.backButton}
        >
          <IconSymbol name="house.fill" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.titulo}>Detalle de Encuesta</Text>
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

      <View style={styles.votingSection}>
        <Text style={styles.votingTitle}>Vota por tu Piloto Favorito</Text>
        {pilotos.map((p) => (
          <Pressable
            key={p}
            style={[styles.voteButton, votoPiloto === p && styles.selectedVote]}
            onPress={() => votarPiloto(p)}
          >
            <Text style={styles.voteText}>{p}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.votingSection}>
        <Text style={styles.votingTitle}>Vota por tu Moto Favorita</Text>
        {motos.map((m) => (
          <Pressable
            key={m}
            style={[styles.voteButton, votoMoto === m && styles.selectedVote]}
            onPress={() => votarMoto(m)}
          >
            <Text style={styles.voteText}>{m}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.performanceCard}>
        <Text style={styles.performanceTitle}>Rendimiento de Carreras</Text>
        <View style={styles.performanceRow}>
          <Text style={styles.performanceLabel}>Velocidad máxima:</Text>
          <Text style={styles.performanceValue}>328 km/h</Text>
        </View>
        <View style={styles.performanceRow}>
          <Text style={styles.performanceLabel}>Tiempo de vuelta:</Text>
          <Text style={styles.performanceValue}>1:32.847</Text>
        </View>
        <View style={styles.performanceRow}>
          <Text style={styles.performanceLabel}>Posición actual:</Text>
          <Text style={styles.performanceValue}>1er lugar</Text>
        </View>
      </View>

      <View style={styles.performanceCard}>
        <Text style={styles.performanceTitle}>Resumen del Piloto Votado</Text>
        {votoPiloto ? (
          <>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>Piloto:</Text>
              <Text style={styles.performanceValue}>{votoPiloto}</Text>
            </View>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>Equipo:</Text>
              <Text style={styles.performanceValue}>
                {votoMoto || "No seleccionado"}
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.noDataText}>
            Selecciona un piloto para ver más detalles
          </Text>
        )}
      </View>

      <View style={styles.voteStats}>
        <View style={styles.voteStat}>
          <Text style={styles.voteStatValue}>{votoPiloto ? "✓" : "○"}</Text>
          <Text style={styles.voteStatLabel}>Piloto</Text>
        </View>
        <View style={styles.voteStat}>
          <Text style={styles.voteStatValue}>{votoMoto ? "✓" : "○"}</Text>
          <Text style={styles.voteStatLabel}>Moto</Text>
        </View>
      </View>

      <Pressable style={styles.botonLimpiar} onPress={limpiarVotos}>
        <Text style={styles.textoBoton}>Enviar Votos</Text>
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
    flexWrap: "wrap",
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
    flexWrap: "wrap",
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
  votingSection: {
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
  },
  votingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  voteButton: {
    backgroundColor: "#1f1f1f",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  selectedVote: {
    backgroundColor: "#e10600",
  },
  voteText: {
    color: "#fff",
    fontSize: 16,
  },
  performanceCard: {
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  performanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f1f",
  },
  performanceLabel: {
    fontSize: 14,
    color: "#9ca3af",
  },
  performanceValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e10600",
  },
  noDataText: {
    color: "#9ca3af",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 12,
  },
  voteStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
  },
  voteStat: {
    alignItems: "center",
  },
  voteStatValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e10600",
    marginBottom: 8,
  },
  voteStatLabel: {
    fontSize: 14,
    color: "#9ca3af",
  },
  botonLimpiar: {
    backgroundColor: "#666",
    padding: 16,
    borderRadius: 999,
    alignItems: "center",
    marginBottom: 20,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
