import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";

const chartData = [
  { label: "Q1", amount: 68, color: "#e10600" },
  { label: "Q2", amount: 82, color: "#f97316" },
  { label: "Q3", amount: 74, color: "#facc15" },
  { label: "R1", amount: 91, color: "#a855f7" },
  { label: "R2", amount: 88, color: "#38bdf8" },
];

const pilots = [
  { name: "Marc Márquez", detail: "Ducati" },
  { name: "Fabio Quartararo", detail: "Yamaha" },
  { name: "Francesco Bagnaia", detail: "Ducati" },
];

const teams = [
  { name: "Ducati Lenovo", detail: "Máxima potencia" },
  { name: "Monster Energy", detail: "Estrategia agresiva" },
  { name: "Repsol Honda", detail: "Historial ganador" },
];

const insights = [
  {
    label: "Velocidad media",
    value: "312 km/h",
    badge: "Top",
    color: "#e10600",
  },
  {
    label: "Vueltas rápidas",
    value: "4",
    badge: "Élite",
    color: "#f97316",
  },
  {
    label: "Pit stops",
    value: "2",
    badge: "Estrategia",
    color: "#38bdf8",
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<"Pilotos" | "Equipos">("Pilotos");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [voteMessage, setVoteMessage] = useState<string>("");

  const options = tab === "Pilotos" ? pilots : teams;

  const handleTabSelect = (option: "Pilotos" | "Equipos") => {
    setTab(option);
    setSelectedItem(null);
    setVoteMessage("");
  };

  const handleVote = () => {
    if (!selectedItem) {
      setVoteMessage("Selecciona primero un elemento para votar.");
      return;
    }

    setVoteMessage(`¡Gracias por votar por ${selectedItem}!`);
    setSelectedItem(null);
    setTimeout(() => {
      setVoteMessage("");
    }, 3000);
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>MotoGP Stats</Text>
        <Text style={styles.heroSubtitle}>
          Entrena tu ojo de fan con datos de pilotos y equipos.
        </Text>
      </View>

      <View style={styles.tabRow}>
        {(["Pilotos", "Equipos"] as const).map((option) => (
          <Pressable
            key={option}
            onPress={() => handleTabSelect(option)}
            style={[
              styles.tabButton,
              tab === option && {
                backgroundColor: "#e10600",
                borderColor: "#e10600",
              },
            ]}
          >
            <Text
              style={[styles.tabText, tab === option && styles.tabTextActive]}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{tab}</Text>
        <Text style={styles.cardText}>
          Elige tu {tab === "Pilotos" ? "piloto" : "equipo"} favorito y vota.
        </Text>
        <View style={styles.optionGrid}>
          {options.map((item) => (
            <Pressable
              key={item.name}
              onPress={() => {
                setSelectedItem(item.name);
                setVoteMessage("");
              }}
              style={[
                styles.optionButton,
                selectedItem === item.name && styles.optionButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedItem === item.name && styles.optionTextActive,
                ]}
              >
                {item.name}
              </Text>
              <Text style={styles.optionLabel}>{item.detail}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          style={[styles.primaryButton, !selectedItem && styles.disabledButton]}
          onPress={handleVote}
          disabled={!selectedItem}
        >
          <Text style={styles.primaryButtonText}>
            {selectedItem ? `Votar por ${selectedItem}` : "Seleccionar antes"}
          </Text>
        </Pressable>
        {voteMessage ? (
          <Text style={styles.voteFeedback}>{voteMessage}</Text>
        ) : null}
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Rendimiento de carrera</Text>
          <IconSymbol name="chart.bar.fill" size={20} color="#e10600" />
        </View>
        <View style={styles.chart}>
          {chartData.map((item) => (
            <View key={item.label} style={styles.chartColumn}>
              <View
                style={[
                  styles.chartBar,
                  { height: `${item.amount}%`, backgroundColor: item.color },
                ]}
              />
              <Text style={styles.chartLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Insights rápidas</Text>
        {insights.map((item) => (
          <View key={item.label} style={styles.insightRow}>
            <View>
              <Text style={styles.insightLabel}>{item.label}</Text>
              <Text style={styles.insightValue}>{item.value}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: item.color }]}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Avance del circuito</Text>
        <Text style={styles.cardText}>
          Selecciona un equipo para ver su ritmo y consistencia en las últimas
          carreras.
        </Text>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/videos")}
        >
          <IconSymbol
            name="play.fill"
            size={18}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Text style={styles.primaryButtonText}>Ver videos</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#050505",
  },
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  hero: {
    backgroundColor: "#111",
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  heroSubtitle: {
    color: "#d1d5db",
    fontSize: 15,
    lineHeight: 22,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#333",
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
  },
  tabText: {
    color: "#d1d5db",
    fontWeight: "700",
  },
  tabTextActive: {
    color: "#fff",
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 200,
    paddingBottom: 10,
  },
  chartColumn: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 6,
  },
  chartBar: {
    width: 22,
    borderRadius: 999,
  },
  chartLabel: {
    marginTop: 10,
    color: "#9ca3af",
    fontSize: 13,
    fontWeight: "700",
  },
  insightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  insightLabel: {
    fontSize: 15,
    color: "#d1d5db",
  },
  insightValue: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
  badge: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  cardText: {
    fontSize: 15,
    color: "#d1d5db",
    lineHeight: 22,
    marginBottom: 18,
  },
  optionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  optionButton: {
    width: "48%",
    backgroundColor: "#1a1a1a",
    borderRadius: 999,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#222",
  },
  optionButtonActive: {
    backgroundColor: "#e10600",
    borderColor: "#e10600",
  },
  optionText: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 8,
  },
  optionTextActive: {
    color: "#050505",
  },
  optionLabel: {
    color: "#9ca3af",
    fontSize: 13,
    lineHeight: 18,
  },
  voteFeedback: {
    color: "#d1d5db",
    marginTop: 12,
    textAlign: "center",
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e10600",
    fontWeight: "700",
    fontSize: 15,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonIcon: {
    marginRight: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
