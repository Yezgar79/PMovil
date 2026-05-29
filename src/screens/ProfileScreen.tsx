import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

// DATOS PERSONALES ESTRICTOS CON SUS TIPOS
const nombre = "Jesús González García";
const carrera = "Ing. en Sistemas Computacionales";
const cuatrimestre = 9;
const promedio = 9.2;
const titulado = false;
const datoPendiente = null; // Tipo null requerido por la rúbrica

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.seccionTitulo}>Imágenes Requeridas</Text>
      
      <View style={styles.rowImagenes}>
        {/* IMAGEN 1: Desde Internet (Aquí va el link de internet que pediste) */}
        <View style={styles.boxImagen}>
          <Image 
            source={{ uri: 'https://tse1.mm.bing.net/th/id/OIP.62zDKqIrLfk8v-zDge9xuwHaE0?cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3' }} 
            style={styles.avatar} 
          />
          <Text style={styles.subImagen}>Desde Internet</Text>
        </View>

        {/* IMAGEN 2: Desde Carpeta Local Assets */}
        <View style={styles.boxImagen}>
          <Image 
            source={require('../../assets/avatar.jpg')} 
            style={styles.avatar} 
          />
          <Text style={styles.subImagen}>Local</Text>
        </View>
      </View>

      <Text style={styles.seccionTitulo}>Datos Personales</Text>
      
      <View style={styles.tarjeta}>
        <Text style={styles.dato}><Text style={styles.negrita}>Nombre:</Text> {nombre}</Text>
        <Text style={styles.dato}><Text style={styles.negrita}>Carrera:</Text> {carrera}</Text>
        <Text style={styles.dato}><Text style={styles.negrita}>Cuatrimestre:</Text> {cuatrimestre}</Text>
        <Text style={styles.dato}><Text style={styles.negrita}>Promedio:</Text> {promedio}</Text>
        <Text style={styles.dato}><Text style={styles.negrita}>Titulado:</Text> {titulado ? "Sí" : "No"}</Text>
        <Text style={styles.dato}><Text style={styles.negrita}>Pendiente:</Text> {String(datoPendiente)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f5f5f5', alignItems: 'center', padding: 20 },
  seccionTitulo: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 15, marginBottom: 15, alignSelf: 'flex-start' },
  rowImagenes: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 10 },
  boxImagen: { alignItems: 'center' },
  avatar: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#ddd' },
  subImagen: { fontSize: 12, color: '#666', marginTop: 5, fontWeight: '500' },
  tarjeta: { width: '100%', backgroundColor: '#fff', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  dato: { fontSize: 15, marginBottom: 12, color: '#444', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 6 },
  negrita: { fontWeight: 'bold', color: '#007AFF' }
});