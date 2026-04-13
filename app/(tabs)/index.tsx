import { ResizeMode, Video } from "expo-av";
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

function Badge({
  texto,
  selected,
  onPress,
}: {
  texto: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.badge, selected && styles.badgeSelected]}
      onPress={onPress}
    >
      <Text style={styles.badgeText}>{texto}</Text>
    </Pressable>
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
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  teclado?: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View style={styles.campo}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        keyboardType={teclado}
        placeholderTextColor="#8a8a8a"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
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

//COMPONENTE VIDEO
function VideoCard({ source, isPlaying }: { source: any; isPlaying: boolean }) {
  const [comment, setComment] = useState("");

  return (
    <View style={styles.videoCard}>
      <Video
        source={source}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        shouldPlay={isPlaying}
        isMuted={false}
      />
      <View style={styles.commentSection}>
        <TextInput
          placeholder="Comenta este video..."
          placeholderTextColor="#8a8a8a"
          style={styles.commentInput}
          value={comment}
          onChangeText={setComment}
        />
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [estado, setEstado] = useState("Disponible");
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(
    null,
  );
  const [piloto, setPiloto] = useState("");
  const [equipo, setEquipo] = useState("");
  const [circuito, setCircuito] = useState("");
  const [encuestaEnviada, setEncuestaEnviada] = useState(false);
  const [badgeSeleccionado, setBadgeSeleccionado] = useState<string | null>(
    null,
  );

  const badgeDetails: Record<string, string[]> = {
    Piloto: [
      "Top ranking pilotos: Marc Márquez, Fabio Quartararo, Francesco Bagnaia",
      "Piloto más votado: Marc Márquez",
      "Último podio: 1er lugar en Mugello",
    ],
    Equipo: [
      "Equipo líder: Ducati Lenovo",
      "Estrategia actual: ataque en boxes",
      "Puntuación de equipo: 248 pts",
    ],
    Circuito: [
      "Circuito favorito: Mugello",
      "Mejor sector: Último tramo",
      "Record de vuelta: 1:46.219",
    ],
    Temporada: [
      "Carreras completas: 18",
      "Ganadores múltiples: 4 pilotos",
      "Predicción: Ducati favorito",
    ],
  };

  const limpiarFormulario = () => {
    setPiloto("");
    setEquipo("");
    setCircuito("");
    setEstado("Disponible");
    setEncuestaEnviada(false);
    setBadgeSeleccionado(null);
  };

  const cambiarEstado = () => {
    setEstado((prev) => (prev === "Disponible" ? "Votando 🏁" : "Disponible"));
    setEncuestaEnviada(false);
  };

  const enviarEncuesta = () => {
    setEncuestaEnviada(true);
    setBadgeSeleccionado(null);
    setTimeout(() => {
      limpiarFormulario();
    }, 3000);
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
        {(["Piloto", "Equipo", "Circuito", "Temporada"] as const).map(
          (texto) => (
            <Badge
              key={texto}
              texto={texto}
              selected={badgeSeleccionado === texto}
              onPress={() =>
                setBadgeSeleccionado(badgeSeleccionado === texto ? null : texto)
              }
            />
          ),
        )}
      </View>

      {badgeSeleccionado ? (
        <View style={styles.badgeInfoBox}>
          <Text style={styles.badgeInfoTitle}>{badgeSeleccionado}</Text>
          {badgeDetails[badgeSeleccionado].map((item) => (
            <Text key={item} style={styles.badgeInfoText}>
              • {item}
            </Text>
          ))}
        </View>
      ) : null}

      <Divider />

      <Seccion icono="🏁" titulo="Encuesta de Carreras" />

      <Campo
        label="Piloto favorito"
        placeholder="Ej: Márquez"
        value={piloto}
        onChangeText={setPiloto}
      />
      <Campo
        label="Equipo"
        placeholder="Ej: Ducati"
        value={equipo}
        onChangeText={setEquipo}
      />
      <Campo
        label="Circuito preferido"
        placeholder="Ej: Mugello"
        value={circuito}
        onChangeText={setCircuito}
      />

      {encuestaEnviada ? (
        <View style={styles.messageSuccess}>
          <Text style={styles.messageText}>✓ Encuesta enviada a detalles</Text>
        </View>
      ) : (
        <Boton texto="Enviar Encuesta" onPress={enviarEncuesta} />
      )}

      <Divider />

      <Seccion icono="🧩" titulo="Resumen Visual" />

      <View style={styles.miniGrid}>
        <MiniCard icono="🏍️" titulo="GP" valor="España" />
        <MiniCard icono="📍" titulo="Pista" valor="Mugello" />
        <MiniCard icono="📅" titulo="Fecha" valor="Junio" />
      </View>

      <View style={styles.miniGrid}>
        <MiniCard icono="🎯" titulo="Votos" valor="1,250" />
        <MiniCard icono="⭐" titulo="Rating" valor="4.8" />
        <MiniCard icono="🔥" titulo="Tendencia" valor="↑ 45%" />
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
  },

  fotoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 22,
    backgroundColor: "#1f1f1f",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    marginTop: 20,
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
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  miniCard: {
    width: "32%",
    minWidth: 100,
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
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

  badgeSelected: {
    backgroundColor: "#e10600",
  },

  badgeInfoBox: {
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },

  badgeInfoTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  badgeInfoText: {
    color: "#d1d5db",
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
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

  commentSection: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
    padding: 8,
  },

  commentInput: {
    color: "#fff",
    fontSize: 14,
  },

  messageSuccess: {
    backgroundColor: "#22c55e",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 12,
  },

  messageText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
