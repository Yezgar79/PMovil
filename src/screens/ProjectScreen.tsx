import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

// OBJETO ACTUALIZADO CON LOS DATOS DE TU PROYECTO REAL
const proyecto = {
  nombre: "Sistema de Gestión de Activos Fijos y Auditorías con QR",
  version: "1.0.0",
  descripcion: "Plataforma móvil nativa diseñada para optimizar el control de inventarios y etiquetado de activos fijos mediante el escaneo automatizado de códigos QR, agilizando los tiempos de auditoría física.",
  repositorio: "https://github.com/123046505-code/ActiScan",
  activo: true,
};

export default function ProjectScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.tituloHeader}>Mi Proyecto Integrador</Text>
      
      {/* SECCIÓN 1: Mostrar el objeto completo con JSON.stringify() */}
      <Text style={styles.subtitulo}>Objeto Completo (JSON.stringify):</Text>
      <View style={styles.contenedorJson}>
        <Text style={styles.textoJson}>{JSON.stringify(proyecto, null, 2)}</Text>
      </View>

      {/* SECCIÓN 2: Mostrar campo por campo con <Text> */}
      <Text style={styles.subtitulo}>Desglose Campo por Campo:</Text>
      <View style={styles.tarjeta}>
        <Text style={styles.campo}><Text style={styles.etiqueta}>Proyecto:</Text> {proyecto.nombre}</Text>
        <Text style={styles.campo}><Text style={styles.etiqueta}>Versión:</Text> {proyecto.version}</Text>
        <Text style={styles.campo}><Text style={styles.etiqueta}>Descripción:</Text> {proyecto.descripcion}</Text>
        <Text style={styles.campo}><Text style={styles.etiqueta}>Repositorio:</Text> {proyecto.repositorio}</Text>
        <Text style={styles.campo}><Text style={styles.etiqueta}>Estado Activo:</Text> {proyecto.activo ? "Activo" : "Inactivo"}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f5f5f5', padding: 20 },
  tituloHeader: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  subtitulo: { fontSize: 15, fontWeight: '600', color: '#555', marginBottom: 10, marginTop: 10 },
  contenedorJson: { backgroundColor: '#282c34', padding: 15, borderRadius: 10, marginBottom: 25 },
  textoJson: { color: '#abb2bf', fontFamily: 'monospace', fontSize: 13 },
  tarjeta: { backgroundColor: '#fff', padding: 16, borderRadius: 12, borderLeftWidth: 5, borderLeftColor: '#0510a5', elevation: 2 },
  campo: { fontSize: 15, marginBottom: 10, color: '#333' },
  etiqueta: { fontWeight: 'bold', color: '#222' }
});