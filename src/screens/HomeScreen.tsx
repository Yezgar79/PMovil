import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useProductos } from '../hooks/useProductos';
import { Producto } from '../types/index';
import { HomeStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<HomeStackParamList, 'ListaProductos'>;

export default function HomeScreen({ navigation }: Props) {
  const { productos, cargando, getArtesano } = useProductos();

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  const renderProducto = ({ item }: { item: Producto }) => {
    const artesano = getArtesano(item.artesanoId);
    return (
      <TouchableOpacity
        style={styles.tarjeta}
        onPress={() => navigation.navigate('DetalleProducto', { productoId: item.id })}
      >
        <Image source={{ uri: item.imagen }} style={styles.imagen} />
        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
          {artesano && <Text style={styles.artesano}>Por {artesano.nombre}</Text>}
          <Text style={styles.precio}>Puja actual: ${item.precioActual}</Text>
          <Text style={styles.cierre}>Cierra: {item.fechaFin}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderProducto}
      contentContainerStyle={styles.lista}
      ListEmptyComponent={<Text style={styles.textoInfo}>No hay productos en subasta.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  lista: { padding: 12 },
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  imagen: { width: '100%', height: 160, borderRadius: 8, marginBottom: 10 },
  info: { gap: 2 },
  nombre: { fontSize: 17, fontWeight: 'bold', color: '#222' },
  descripcion: { fontSize: 14, color: '#444' },
  artesano: { fontSize: 13, color: '#666', marginTop: 2 },
  precio: { color: '#2e7d32', fontWeight: '600', marginTop: 4 },
  cierre: { color: '#888', fontSize: 12, marginTop: 2 },
  textoInfo: { textAlign: 'center', color: '#777', marginVertical: 10 },
});
