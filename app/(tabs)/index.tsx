import { useAuth } from "@/context/AuthContext"; // Importamos tu contexto de autenticación
import { supabase } from "@/lib/supabase";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageStyle,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

// --- COMPONENTES AUXILIARES REESTILIZADOS ---
const Divider = () => <View style={styles.divisor} />;

const Seccion = ({ icono, titulo }: { icono: string; titulo: string }) => (
  <View style={styles.seccionHeader}>
    <Text style={styles.seccionIcono}>{icono}</Text>
    <Text style={styles.seccionTitulo}>{titulo}</Text>
  </View>
);

const Badge = ({ texto, selected, onPress }: any) => (
  <Pressable
    style={({ pressed }) => [
      styles.badge,
      selected && styles.badgeSelected,
      pressed && { opacity: 0.8 },
    ]}
    onPress={onPress}
  >
    <Text style={[styles.badgeText, selected && styles.badgeTextSelected]}>
      {texto}
    </Text>
  </Pressable>
);

const Boton = ({
  texto,
  onPress,
  disabled = false,
  secundario = false,
}: any) => (
  <Pressable
    style={({ pressed }) => [
      styles.boton,
      secundario && styles.botonSecundario,
      disabled && styles.botonDisabled,
      pressed && !disabled && { opacity: 0.8 },
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.botonTexto}>{texto}</Text>
  </Pressable>
);

const Campo = ({ label, placeholder, value, onChangeText }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.campo}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#666"
        style={[styles.input, isFocused && styles.inputFocused]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const MiniCard = ({ icono, titulo, valor }: any) => (
  <View style={styles.miniCard}>
    <Text style={styles.miniIcon}>{icono}</Text>
    <View>
      <Text style={styles.miniTitle}>{titulo}</Text>
      <Text style={styles.miniValue}>{valor}</Text>
    </View>
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
          resizeMode={ResizeMode.COVER}
          shouldPlay={isPlaying}
          isLooping
        />
        <View style={styles.commentSection}>
          <TextInput
            placeholder="Añadir comentario..."
            placeholderTextColor="#aaa"
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
  const { user } = useAuth(); // Extraemos el usuario para el id_usuario
  const [estado, setEstado] = useState("Disponible");
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(
    null,
  );

  // Formulario de votación
  const [piloto, setPiloto] = useState("");
  const [equipo, setEquipo] = useState("");
  const [circuito, setCircuito] = useState("");
  const [cargando, setCargando] = useState(false);

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 }).current;

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentPlayingIndex(viewableItems[0].index);
    } else {
      setCurrentPlayingIndex(null);
    }
  }, []);

  const videoData = useRef([
    { source: require("../../assets/videos/video0.mp4") },
    { source: require("../../assets/videos/video1.mp4") },
    { source: require("../../assets/videos/video2.mp4") },
    { source: require("../../assets/videos/video3.mp4") },
    { source: require("../../assets/videos/video4.mp4") },
  ]).current;

  // Método corregido para apuntar a la tabla e inputs de tu base de datos
  const enviarEncuesta = async () => {
    if (!piloto.trim() || !equipo.trim() || !circuito.trim()) {
      Alert.alert("❌ Error", "Por favor completa todos los campos.");
      return;
    }
    setCargando(true);
    try {
      const { error } = await supabase
        .from("encuestas_votacion") // Tabla corregida
        .insert([
          {
            id_usuario: user?.id, // Vincula la votación al usuario logueado
            piloto_favorito: piloto.trim(),
            escuderia_equipo: equipo.trim(),
            circuito_favorito: circuito.trim(),
          },
        ]);
      if (error) throw error;

      setPiloto("");
      setEquipo("");
      setCircuito("");
      Alert.alert("🏁 Éxito", "¡Tu votación oficial ha sido registrada!");
    } catch (err: any) {
      Alert.alert(
        "❌ Error",
        err.message || "No se pudo conectar con Supabase.",
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <ScrollView
      style={styles.mainWrapper}
      contentContainerStyle={styles.container}
    >
      {/* Header Premium */}
      <View style={styles.header}>
        <View style={styles.fotoPlaceholder}>
          <Image
            source={require("../../assets/images/perfil.jpg")}
            style={styles.fotoIcon}
          />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.welcomeText}>Bienvenido de vuelta</Text>
          <Text style={styles.nombre}>MotoGP App</Text>
          <Text style={styles.statusText}>Estado: {estado}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.menuBotonSalir,
            pressed && { opacity: 0.8 },
          ]}
          onPress={() => supabase.auth.signOut()}
        >
          <Text style={styles.menuTexto}>🚪</Text>
        </Pressable>
      </View>

      {/* Tarjetas de Información Rápida (Uso de MiniCard) */}
      <View style={styles.rowCards}>
        <MiniCard icono="🏆" titulo="Próxima Carrera" valor="Mugello" />
        <MiniCard icono="⏱️" titulo="Estado" valor={estado} />
      </View>

      <Divider />

      {/* Sección del Formulario */}
      <Seccion icono="🏁" titulo="Encuesta Oficial de Votación" />
      <View style={styles.formContainer}>
        <Campo
          label="Tu Piloto Favorito"
          value={piloto}
          onChangeText={setPiloto}
          placeholder="Ej. Marc Márquez"
        />
        <Campo
          label="Escudería / Equipo"
          value={equipo}
          onChangeText={setEquipo}
          placeholder="Ej. Ducati Lenovo Team"
        />
        <Campo
          label="Circuito Favorito"
          value={circuito}
          onChangeText={setCircuito}
          placeholder="Ej. Mugello"
        />

        <View style={{ marginTop: 10 }}>
          <Boton
            texto={
              cargando ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                "Enviar Votación"
              )
            }
            onPress={enviarEncuesta}
            disabled={cargando}
          />
        </View>
      </View>

      <Divider />

      {/* Sección de Contenido Multimedia */}
      <Seccion icono="🎬" titulo="Transmisiones y Clips en Vivo" />
      <Text style={styles.subtituloSeccion}>
        Desliza horizontalmente para ver los mejores momentos
      </Text>

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
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </ScrollView>
  );
}

// --- ESTILOS MEJORADOS ---
type Styles = {
  mainWrapper: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  fotoPlaceholder: ViewStyle;
  fotoIcon: ImageStyle;
  headerInfo: ViewStyle;
  welcomeText: TextStyle;
  nombre: TextStyle;
  statusText: TextStyle;
  menuBotonSalir: ViewStyle;
  menuTexto: TextStyle;
  rowCards: ViewStyle;
  miniCard: ViewStyle;
  miniIcon: TextStyle;
  miniTitle: TextStyle;
  miniValue: TextStyle;
  divisor: ViewStyle;
  seccionHeader: ViewStyle;
  seccionIcono: TextStyle;
  seccionTitulo: TextStyle;
  subtituloSeccion: TextStyle;
  formContainer: ViewStyle;
  campo: ViewStyle;
  label: TextStyle;
  input: TextStyle;
  inputFocused: TextStyle;
  boton: ViewStyle;
  botonSecundario: ViewStyle;
  botonDisabled: ViewStyle;
  botonTexto: TextStyle;
  badge: ViewStyle;
  badgeSelected: ViewStyle;
  badgeText: TextStyle;
  badgeTextSelected: TextStyle;
  videoCard: ViewStyle;
  video: ViewStyle;
  commentSection: ViewStyle;
  commentInput: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  mainWrapper: {
    backgroundColor: "#0a0a0a",
  },
  container: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    backgroundColor: "#141414",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#222",
  },
  fotoPlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#e10600",
  },
  fotoIcon: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  headerInfo: {
    flex: 1,
  },
  welcomeText: {
    color: "#666",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "900",
    color: "#fff",
  },
  statusText: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 2,
  },
  menuBotonSalir: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#333",
  },
  menuTexto: {
    fontSize: 16,
  },
  rowCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },
  miniCard: {
    flex: 1,
    backgroundColor: "#141414",
    padding: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#222",
  },
  miniIcon: { fontSize: 22 },
  miniTitle: {
    color: "#666",
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  miniValue: { color: "#fff", fontSize: 14, fontWeight: "bold", marginTop: 1 },
  divisor: {
    height: 1,
    backgroundColor: "#222",
    marginVertical: 24,
  },
  seccionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  seccionIcono: {
    fontSize: 20,
    marginRight: 8,
  },
  seccionTitulo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
  subtituloSeccion: {
    color: "#555",
    fontSize: 13,
    marginBottom: 16,
  },
  formContainer: {
    backgroundColor: "#141414",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#222",
    marginTop: 10,
  },
  campo: { marginBottom: 16 },
  label: {
    color: "#aaa",
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#0d0d0d",
    padding: 14,
    borderRadius: 12,
    color: "#fff",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#222",
  },
  inputFocused: {
    borderColor: "#e10600",
  },
  boton: {
    backgroundColor: "#e10600",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#e10600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  botonSecundario: {
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#333",
  },
  botonDisabled: {
    backgroundColor: "#444",
    shadowOpacity: 0,
    elevation: 0,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#222",
  },
  badgeSelected: {
    backgroundColor: "#e10600",
  },
  badgeText: { color: "#aaa", fontSize: 12 },
  badgeTextSelected: { color: "#fff", fontWeight: "bold" },
  videoCard: {
    width: 200,
    height: 320,
    marginRight: 16,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#222",
  },
  video: { width: "100%", height: "100%" },
  commentSection: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  commentInput: {
    color: "#fff",
    fontSize: 13,
  },
});
