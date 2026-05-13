import { supabase } from "@/lib/supabase";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

// --- COMPONENTES AUXILIARES ---
const Divider = () => <View style={styles.divisor} />;
const Seccion = ({ icono, titulo }: { icono: string; titulo: string }) => (
  <View style={styles.seccionHeader}>
    <Text style={styles.seccionIcono}>{icono}</Text>
    <Text style={styles.seccionTitulo}>{titulo}</Text>
  </View>
);
const Badge = ({ texto, selected, onPress }: any) => (
  <Pressable
    style={[styles.badge, selected && styles.badgeSelected]}
    onPress={onPress}
  >
    <Text style={styles.badgeText}>{texto}</Text>
  </Pressable>
);
const Boton = ({ texto, onPress, disabled = false }: any) => (
  <Pressable
    style={[styles.boton, disabled && styles.botonDisabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.botonTexto}>{texto}</Text>
  </Pressable>
);
const Campo = ({
  label,
  placeholder,
  teclado = "default",
  value,
  onChangeText,
}: any) => (
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
const MiniCard = ({ icono, titulo, valor }: any) => (
  <View style={styles.miniCard}>
    <Text style={styles.miniIcon}>{icono}</Text>
    <Text style={styles.miniTitle}>{titulo}</Text>
    <Text style={styles.miniValue}>{valor}</Text>
  </View>
);

const VideoCard = React.memo(
  ({ source, isPlaying }: { source: any; isPlaying: boolean }) => {
    const [comment, setComment] = useState("");
    return (
      <View style={styles.videoCard}>
        <Video
          source={source}
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={isPlaying}
        />
        <View style={styles.commentSection}>
          <TextInput
            placeholder="Comenta..."
            placeholderTextColor="#8a8a8a"
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
          />
        </View>
      </View>
    );
  },
);

// --- COMPONENTE PRINCIPAL ---
export default function HomeScreen() {
  const router = useRouter();
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
  const [cargando, setCargando] = useState(false);

  // SOLUCIÓN FLATLIST: Referencias persistentes
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentPlayingIndex(viewableItems[0].index);
    } else {
      setCurrentPlayingIndex(null);
    }
  }, []);

  const videoData = useRef([
    { source: require("../../assets/videos/video1.mp4") },
    { source: require("../../assets/videos/video2.mp4") },
    { source: require("../../assets/videos/video3.mp4") },
    { source: require("../../assets/videos/video4.mp4") },
  ]).current;

  const enviarEncuesta = async () => {
    if (!piloto.trim() || !equipo.trim() || !circuito.trim()) {
      Alert.alert("❌ Error", "Completa todos los campos");
      return;
    }
    setCargando(true);
    try {
      const { error } = await supabase
        .from("encuestas_suscriptor")
        .insert([
          { piloto, equipo, circuito, created_at: new Date().toISOString() },
        ]);
      if (error) throw error;
      setEncuestaEnviada(true);
      Alert.alert("✅ Éxito", "Encuesta guardada");
    } catch (err: any) {
      Alert.alert("❌ Error", err.message);
    } finally {
      setCargando(false);
    }
  };

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
          <Text style={styles.nombre}>MotoGP App</Text>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
            <Boton texto="Votar" onPress={() => setEstado("Votando 🏁")} />
            <Pressable
              style={styles.menuBotonSalir}
              onPress={() => supabase.auth.signOut()}
            >
              <Text style={styles.menuTexto}>🚪 Salir</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Seccion icono="🏁" titulo="Encuesta" />
      <Campo
        label="Piloto"
        value={piloto}
        onChangeText={setPiloto}
        placeholder="Márquez"
      />
      <Campo
        label="Equipo"
        value={equipo}
        onChangeText={setEquipo}
        placeholder="Ducati"
      />
      <Campo
        label="Circuito"
        value={circuito}
        onChangeText={setCircuito}
        placeholder="Mugello"
      />

      <Boton
        texto={cargando ? "Enviando..." : "Enviar"}
        onPress={enviarEncuesta}
        disabled={cargando}
      />

      <Divider />
      <Seccion icono="🎬" titulo="Videos en Vivo" />

      <FlatList
        data={videoData}
        renderItem={({ item, index }) => (
          <VideoCard
            source={item.source}
            isPlaying={currentPlayingIndex === index}
          />
        )}
        horizontal
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(_, index) => index.toString()}
      />
    </ScrollView>
  );
}

// (Manten tus estilos de StyleSheet abajo...)
const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: "#050505" },
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
  },
  fotoIcon: { width: 80, height: 80, borderRadius: 20 },
  headerInfo: { flex: 1 },
  nombre: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  boton: {
    backgroundColor: "#e10600",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  botonDisabled: { opacity: 0.5 },
  botonTexto: { color: "#fff", fontWeight: "bold" },
  menuBotonSalir: { backgroundColor: "#b91c1c", padding: 10, borderRadius: 12 },
  menuTexto: { color: "#fff", fontWeight: "bold" },
  divisor: { height: 1, backgroundColor: "#e10600", marginVertical: 18 },
  seccionHeader: { flexDirection: "row", marginBottom: 12 },
  seccionIcono: { fontSize: 18, marginRight: 8 },
  seccionTitulo: { color: "#fff", fontWeight: "bold" },
  campo: { marginBottom: 12 },
  label: { color: "#fff", marginBottom: 4 },
  input: {
    backgroundColor: "#121212",
    padding: 12,
    borderRadius: 14,
    color: "#fff",
  },
  videoCard: {
    width: 160,
    height: 260,
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#111",
  },
  video: { width: "100%", height: "100%" },
  commentSection: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 8,
    padding: 5,
  },
  commentInput: { color: "#fff", fontSize: 12 },
});
