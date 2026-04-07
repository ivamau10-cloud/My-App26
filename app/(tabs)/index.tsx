import { Video } from "expo-av";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardTypeOptions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function Divider() {
  return <View style={styles.divisor} />;
}

function Seccion({ icono, titulo }: { icono: string; titulo: string }) {
  return (
    <View style={styles.seccionHeader}>
      <Text style={styles.seccionIcono}>{icono}</Text>
      <Text style={styles.seccionTitulo}>{titulo}</Text>
    </View>
  );
}

function Badge({ texto }: { texto: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{texto}</Text>
    </View>
  );
}

function Boton({ texto, onPress }: { texto: string; onPress: () => void }) {
  return (
    <Pressable style={styles.boton} onPress={onPress}>
      <Text style={styles.botonTexto}>{texto}</Text>
    </Pressable>
  );
}

function Campo({
  label,
  placeholder,
  teclado = "default",
}: {
  label: string;
  placeholder: string;
  teclado?: KeyboardTypeOptions;
}) {
  return (
    <View style={styles.campo}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        keyboardType={teclado}
        placeholderTextColor="#8a8a8a"
        style={styles.input}
      />
    </View>
  );
}

function Tarjeta({
  icono,
  titulo,
  descripcion,
}: {
  icono: string;
  titulo: string;
  descripcion: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardIcon}>{icono}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{titulo}</Text>
        <Text style={styles.cardText}>{descripcion}</Text>
      </View>
    </View>
  );
}

function MiniCard({
  icono,
  titulo,
  valor,
}: {
  icono: string;
  titulo: string;
  valor: string;
}) {
  return (
    <View style={styles.miniCard}>
      <Text style={styles.miniIcon}>{icono}</Text>
      <Text style={styles.miniTitle}>{titulo}</Text>
      <Text style={styles.miniValue}>{valor}</Text>
    </View>
  );
}

function Estadistica({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

//COMPONENTE VIDEO
function VideoCard({ source, isPlaying }: { source: any; isPlaying: boolean }) {
  return (
    <View style={styles.videoCard}>
      <Video
        source={source}
        style={styles.video}
        useNativeControls
        resizeMode="cover"
        isLooping={false}
        shouldPlay={isPlaying}
        isMuted={false}
      />
    </View>
  );
}

export default function HomeScreen() {
  const [estado, setEstado] = useState("Disponible");
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(
    null,
  );
  const router = useRouter();

  const cambiarEstado = () => {
    setEstado((prev) => (prev === "Disponible" ? "Votando 🏁" : "Disponible"));
  };

  const verDetalle = () => {
    router.push(
      `/detalle?piloto=${encodeURIComponent("Marc Márquez")}&equipo=${encodeURIComponent(
        "Ducati",
      )}&circuito=${encodeURIComponent("Mugello")}&estado=${encodeURIComponent(
        estado,
      )}`,
    );
  };

  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentPlayingIndex(viewableItems[0].index);
    } else {
      setCurrentPlayingIndex(null);
    }
  };

  const videoData = [
    { source: require("../../assets/videos/video1.mp4") },
    { source: require("../../assets/videos/video2.mp4") },
    { source: require("../../assets/videos/video3.mp4") },
    { source: require("../../assets/videos/video4.mp4") },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Video
          source={require("../../assets/videos/video1.mp4")}
          style={styles.backgroundVideo}
          resizeMode="cover"
          isLooping
          isMuted
          shouldPlay
        />
        <View style={styles.fotoPlaceholder}>
          <Image
            source={require("../../assets/images/perfil.jpg")}
            style={styles.fotoIcon}
          />
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.nombre}>Encuesta MotoGP</Text>
          <Text style={styles.subtitulo}>
            Opiniones de fans y datos de carrera.
          </Text>

          <View style={styles.estadoRow}>
            <Text style={styles.estadoLabel}>Participación:</Text>
            <Text style={styles.estado}>{estado}</Text>
          </View>

          <Boton texto="Votar" onPress={cambiarEstado} />
        </View>
      </View>

      <View style={styles.badgesContainer}>
        <Badge texto="Piloto" />
        <Badge texto="Equipo" />
        <Badge texto="Circuito" />
        <Badge texto="Temporada" />
      </View>

      <Divider />

      <Seccion icono="🏁" titulo="Encuesta de Carreras" />

      <Campo label="Piloto favorito" placeholder="Ej: Márquez" />
      <Campo label="Equipo" placeholder="Ej: Ducati" />
      <Campo label="Circuito preferido" placeholder="Ej: Mugello" />

      <Divider />

      <Seccion icono="🧩" titulo="Resumen Visual" />

      <View style={styles.miniGrid}>
        <MiniCard icono="🏍️" titulo="GP" valor="España" />
        <MiniCard icono="📍" titulo="Pista" valor="Mugello" />
        <MiniCard icono="📅" titulo="Fecha" valor="Junio" />
      </View>

      {/* 🎬 SECCIÓN DE VIDEOS */}
      <Divider />
      <Seccion icono="🎬" titulo="Videos MotoGP" />

      <FlatList
        data={videoData}
        renderItem={({ item, index }) => (
          <VideoCard
            source={item.source}
            isPlaying={currentPlayingIndex === index}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🏁 Gracias por participar en la encuesta MotoGP.
        </Text>
      </View>

      <View style={styles.footerActions}>
        <Boton texto="Ver ranking" onPress={() => router.push("/explore")} />
        <Boton texto="Ver detalle" onPress={verDetalle} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#050505",
  },

  header: {
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
  },

  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },

  fotoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 22,
    backgroundColor: "#1f1f1f",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  fotoIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },

  headerInfo: {
    flex: 1,
  },

  nombre: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  subtitulo: {
    color: "#d1d5db",
    marginBottom: 12,
  },

  estadoRow: {
    flexDirection: "row",
    marginBottom: 12,
  },

  estadoLabel: {
    color: "#fff",
    marginRight: 8,
  },

  estado: {
    color: "#fff",
  },

  boton: {
    backgroundColor: "#e10600",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
  },

  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },

  badge: {
    backgroundColor: "#e10600",
    padding: 8,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
  },

  divisor: {
    height: 1,
    backgroundColor: "#e10600",
    marginVertical: 18,
  },

  seccionHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },

  seccionIcono: {
    fontSize: 18,
    color: "#fff",
    marginRight: 8,
  },

  seccionTitulo: {
    color: "#fff",
    fontWeight: "bold",
  },

  campo: {
    marginBottom: 12,
  },

  label: {
    color: "#fff",
  },

  input: {
    backgroundColor: "#121212",
    padding: 12,
    borderRadius: 14,
    color: "#fff",
  },

  miniGrid: {
    flexDirection: "row",
  },

  miniCard: {
    flex: 1,
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 18,
    marginRight: 10,
    alignItems: "center",
  },

  miniIcon: {
    fontSize: 20,
  },

  miniTitle: {
    color: "#9ca3af",
  },

  miniValue: {
    color: "#fff",
    fontWeight: "bold",
  },

  footer: {
    marginTop: 20,
  },

  footerText: {
    color: "#fff",
  },

  footerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  videoCard: {
    width: 160,
    height: 260,
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#111",
  },

  video: {
    width: "100%",
    height: "100%",
  },
});
