import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Separador visual
function Divider() {
  return <View style={styles.divisor} />;
}

//  Título de sección
function Seccion({ icono, titulo }) {
  return (
    <View style={styles.seccionHeader}>
      <Text style={styles.seccionIcono}>{icono}</Text>
      <Text style={styles.seccionTitulo}>{titulo}</Text>
    </View>
  );
}

// Badge / Chip
function Badge({ texto }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{texto}</Text>
    </View>
  );
}

// Botón reutilizable
function Boton({ texto, onPress }) {
  return (
    <Pressable style={styles.boton} onPress={onPress}>
      <Text style={styles.botonTexto}>{texto}</Text>
    </Pressable>
  );
}

// Campo de formulario
function Campo({ label, placeholder, teclado = "default" }) {
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

// Tarjeta informativa
function Tarjeta({ icono, titulo, descripcion }) {
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

// Mini tarjeta (solo UI)
function MiniCard({ icono, titulo, valor }) {
  return (
    <View style={styles.miniCard}>
      <Text style={styles.miniIcon}>{icono}</Text>
      <Text style={styles.miniTitle}>{titulo}</Text>
      <Text style={styles.miniValue}>{valor}</Text>
    </View>
  );
}

// Fila de resumen
function Estadistica({ label, value }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export default function App() {
  // ÚNICA funcionalidad permitida en este laboratorio
  const [estado, setEstado] = useState("Disponible");

  const cambiarEstado = () => {
    setEstado((prev) => (prev === "Disponible" ? "En clase 👩‍💻" : "Disponible"));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER PERFIL */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/perfil.jpg")}
          style={styles.foto}
        />

        <View style={styles.headerInfo}>
          <Text style={styles.nombre}>Encuesta MotoGP</Text>
          <Text style={styles.subtitulo}>Opiniones de fans</Text>

          <View style={styles.estadoRow}>
            <Text style={styles.estadoLabel}>Participación:</Text>
            <Text style={styles.estado}>{estado}</Text>
          </View>

          <Boton texto="Votar" onPress={cambiarEstado} />
        </View>
      </View>

      {/* BADGES */}
      <View style={styles.badgesContainer}>
        <Badge texto="Piloto" />
        <Badge texto="Equipo" />
        <Badge texto="Circuito" />
        <Badge texto="Temporada" />
        <Badge texto="Voto" />
        <Badge texto="Fan" />
      </View>

      <Divider />

      {/* FORMULARIO */}
      <Seccion icono="🏁" titulo="Encuesta de Carreras" />

      <Campo label="Piloto favorito" placeholder="Ej: Márquez" />
      <Campo label="Equipo" placeholder="Ej: Ducati" />
      <Campo label="Circuito preferido" placeholder="Ej: Mugello" />
      <Campo label="GP favorito" placeholder="Ej: España" />
      <Campo label="Temporada" placeholder="Ej: 2026" />
      <Campo label="Comentarios" placeholder="Tu opinión" />

      <Divider />

      {/* COMPONENTES EXTRA (UI) */}
      <Seccion icono="🧩" titulo="Resumen Visual" />

      <View style={styles.miniGrid}>
        <MiniCard icono="🏍️" titulo="GP" valor="España" />
        <MiniCard icono="📍" titulo="Pista" valor="Circuito" />
        <MiniCard icono="📅" titulo="Fecha" valor="Junio" />
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.statsTitle}>Resultados</Text>
        <Estadistica label="Votos totales" value="120" />
        <Estadistica label="Participantes" value="45" />
        <Estadistica label="Encuestas" value="3" />
      </View>

      <Divider />

      {/* TARJETAS */}
      <Seccion icono="📌" titulo="Tarjetas Informativas" />

      <Tarjeta
        icono="📊"
        titulo="Pregunta 1"
        descripcion="¿Quién ganará el próximo GP?"
      />
      <Tarjeta
        icono="📊"
        titulo="Pregunta 2"
        descripcion="¿Qué equipo te impresiona más?"
      />
      <Tarjeta
        icono="📊"
        titulo="Pregunta 3"
        descripcion="¿Cuál es tu circuito favorito?"
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🏁 Gracias por participar en la encuesta MotoGP.
        </Text>
        <Text style={styles.footerWarn}>
          📌 Comparte tus resultados con otros fans.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#000",
  },

  header: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    gap: 12,
    elevation: 3,
  },

  foto: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  headerInfo: {
    flex: 1,
    justifyContent: "center",
  },

  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  subtitulo: {
    color: "white",
    marginBottom: 6,
  },

  estadoRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginBottom: 10,
  },

  estadoLabel: {
    fontWeight: "bold",
    color: "white",
  },

  estado: {
    color: "white",
  },

  boton: {
    backgroundColor: "#c00",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  botonTexto: {
    color: "white",
    fontWeight: "bold",
  },

  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },

  badge: {
    backgroundColor: "#c00",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
    elevation: 2,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },

  divisor: {
    height: 1,
    backgroundColor: "#c00",
    marginVertical: 16,
  },

  seccionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  seccionIcono: {
    fontSize: 16,
    color: "white",
  },

  seccionTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  campo: {
    marginBottom: 12,
  },

  label: {
    marginBottom: 6,
    fontWeight: "600",
    color: "white",
  },

  input: {
    backgroundColor: "#222",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    elevation: 2,
    color: "white",
  },

  miniGrid: {
    flexDirection: "row",
    gap: 10,
  },

  miniCard: {
    flex: 1,
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 14,
    elevation: 2,
    alignItems: "center",
  },

  miniIcon: {
    fontSize: 18,
    marginBottom: 6,
  },

  miniTitle: {
    fontSize: 12,
    color: "gray",
  },

  miniValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },

  statsBox: {
    marginTop: 12,
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 12,
    elevation: 2,
  },

  statsTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },

  statLabel: {
    color: "white",
    fontWeight: "600",
  },

  statValue: {
    color: "white",
  },

  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    elevation: 3,
    alignItems: "center",
  },

  cardIcon: {
    fontSize: 22,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },

  cardText: {
    color: "white",
    marginTop: 2,
  },

  footer: {
    marginTop: 18,
    padding: 12,
    backgroundColor: "#111",
    borderRadius: 14,
    elevation: 2,
  },

  footerText: {
    color: "white",
    fontSize: 13,
  },

  footerWarn: {
    marginTop: 6,
    color: "white",
    fontSize: 12,
  },
});
