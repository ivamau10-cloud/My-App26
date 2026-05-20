import { IconSymbol } from "@/components/ui/icon-symbol";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const resources = [
  {
    title: "MotoGP Highlights",
    description:
      "Revive las mejores acciones del último Gran Premio y analiza las vueltas clave.",
    url: "https://youtu.be/UOPOQW79xag?si=A6toDqU5NCZUMngv&t=142",
  },
  {
    title: "MotoGP Holeshot",
    description:
      "Siente la emoción desde la moto en el circuito con el arranque motogp Holeshot.",
    url: "https://youtu.be/k97bScoI5xw?si=96eERuWa56ZBUefM&t=229",
  },
  {
    title: "Estrategia de equipo",
    description:
      "Conoce cómo los equipos planifican las paradas y las configuraciones de carrera para ganar.",
    url: "https://youtu.be/rgyh4BzFxrk?si=iUmO7rkOmSUf5PGb&t=472",
  },
];

export default function VideosScreen() {
  const openVideo = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.warn("No se pudo abrir el video", error);
    }
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Videos MotoGP</Text>
        <Text style={styles.heroSubtitle}>
          Análisis, onboard y mejores momentos de la temporada.
        </Text>
      </View>

      {resources.map((item) => (
        <View key={item.title} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <IconSymbol name="play.fill" size={18} color="#e10600" />
          </View>
          <Text style={styles.cardText}>{item.description}</Text>
          <Pressable
            style={styles.openButton}
            onPress={() => openVideo(item.url)}
          >
            <Text style={styles.openButtonText}>Abrir video</Text>
          </Pressable>
        </View>
      ))}

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Consejo rápido</Text>
        <Text style={styles.summaryText}>
          Revisa los videos antes del Gran Premio para entender mejor la
          estrategia de los equipos y los cambios de carrera.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create<any>({
  page: {
    flex: 1,
    backgroundColor: "#050505",
  },
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  hero: {
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    backgroundColor: "#111",
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
  card: {
    backgroundColor: "#111",
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  cardText: {
    fontSize: 15,
    color: "#d1d5db",
    lineHeight: 22,
    marginBottom: 16,
  },
  openButton: {
    backgroundColor: "#e10600",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  openButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  summaryCard: {
    backgroundColor: "#111",
    borderRadius: 24,
    padding: 20,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  summaryText: {
    color: "#d1d5db",
    fontSize: 15,
  },
});
