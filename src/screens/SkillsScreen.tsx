import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const habilidades: string[] = ["TypeScript", "React Native", "Expo SDK 54", "JavaScript", "GitHub", "SQL "];

export default function SkillsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Habilidades</Text>
      <Text style={styles.subtitulo}>Estructura string[] mapeada con estilos visuales (Badges):</Text>
      
      <View style={styles.contenedorBadges}>
        {}
        {habilidades.map((skill, index) => (
          <View key={index} style={styles.badge}>
            <Text style={styles.textoBadge}> {skill}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 24, justifyContent: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8, textAlign: 'center' },
  subtitulo: { fontSize: 14, color: '#666', marginBottom: 25, textAlign: 'center' },
  contenedorBadges: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  badge: { backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2 },
  textoBadge: { color: '#ffffff', fontSize: 15, fontWeight: '600' }
});