import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useProductoDetalle } from '../hooks/useProductoDetalle';
import { Oferta } from '../types/index';
import { HomeStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<HomeStackParamList, 'DetalleProducto'>;

// react-navigation v7: el título del header se actualiza en runtime con
// navigation.setOptions una vez que llegan los datos, ya que al navegar
// solo se pasa el id (route.params), no el nombre de la pieza.

// Alert.alert no muestra diálogo en web (react-native-web lo deja vacío),
// así que ahí usamos window.confirm para poder confirmar la eliminación.
function confirmar(titulo: string, mensaje: string): Promise<boolean> {
  if (Platform.OS === 'web') {
    return Promise.resolve(window.confirm(`${titulo}\n\n${mensaje}`));
  }
  return new Promise((resolve) => {
    Alert.alert(titulo, mensaje, [
      { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
      { text: 'Eliminar', style: 'destructive', onPress: () => resolve(true) },
    ]);
  });
}

function avisar(titulo: string, mensaje: string): void {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensaje}`);
  } else {
    Alert.alert(titulo, mensaje);
  }
}

export default function ProductoDetalleScreen({ route, navigation }: Props) {
  const { productoId } = route.params;
  const { producto, artesano, ofertas, cargando, pujar, cancelarOferta } =
    useProductoDetalle(productoId);
  const [monto, setMonto] = useState('');

  useEffect(() => {
    if (producto) {
      navigation.setOptions({ title: producto.nombre });
    }
  }, [navigation, producto]);

  if (cargando) {
    return <View style={styles.centrado}><ActivityIndicator size="large" /></View>;
  }
  if (!producto) {
    return <View style={styles.centrado}><Text>Producto no encontrado.</Text></View>;
  }

  const handlePujar = async () => {
    const valor = parseFloat(monto);
    if (Number.isNaN(valor)) {
      avisar('Monto inválido', 'Ingresa un número válido.');
      return;
    }
    if (valor <= producto.precioActual) {
      avisar('Puja muy baja', `Debe ser mayor a $${producto.precioActual}.`);
      return;
    }
    await pujar(valor);
    setMonto('');
  };

  const handleEliminar = async (oferta: Oferta) => {
    const confirmado = await confirmar('Eliminar puja', `¿Eliminar la puja de $${oferta.monto}?`);
    if (confirmado) {
      await cancelarOferta(oferta.id);
    }
  };

  const renderOferta = ({ item }: { item: Oferta }) => (
    <View style={styles.oferta}>
      <View>
        <Text style={styles.ofertaMonto}>${item.monto}</Text>
        <Text style={styles.ofertaFecha}>{new Date(item.fecha).toLocaleString()}</Text>
      </View>
      <TouchableOpacity style={styles.botonEliminar} onPress={() => handleEliminar(item)}>
        <Text style={styles.textoBoton}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={ofertas}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderOferta}
      contentContainerStyle={styles.lista}
      ListHeaderComponent={
        <View>
          <Image source={{ uri: producto.imagen }} style={styles.imagen} />
          <Text style={styles.nombre}>{producto.nombre}</Text>
          <Text style={styles.descripcion}>{producto.descripcion}</Text>
          {artesano && <Text style={styles.artesano}>Por {artesano.nombre}</Text>}
          <Text style={styles.precio}>Puja actual: ${producto.precioActual}</Text>
          <Text style={styles.cierre}>Cierra: {producto.fechaFin}</Text>

          <View style={styles.formulario}>
            <TextInput
              style={styles.input}
              placeholder={`Mayor a $${producto.precioActual}`}
              keyboardType="numeric"
              value={monto}
              onChangeText={setMonto}
            />
            <TouchableOpacity style={styles.botonPujar} onPress={handlePujar}>
              <Text style={styles.textoBoton}>Pujar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitulo}>Historial de pujas ({ofertas.length})</Text>
        </View>
      }
      ListEmptyComponent={<Text style={styles.vacio}>Aún no hay pujas para este producto.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  lista: { padding: 16 },
  imagen: { width: '100%', height: 180, borderRadius: 8, marginBottom: 12 },
  nombre: { fontSize: 20, fontWeight: 'bold' },
  descripcion: { color: '#444', marginTop: 4 },
  artesano: { color: '#666', marginTop: 4 },
  precio: { color: '#2e7d32', fontWeight: '600', marginTop: 8 },
  cierre: { color: '#888', fontSize: 12, marginTop: 2 },
  formulario: { flexDirection: 'row', gap: 10, marginTop: 14 },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, fontSize: 14,
  },
  botonPujar: { backgroundColor: '#007AFF', borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center' },
  subtitulo: { fontSize: 16, fontWeight: 'bold', marginTop: 18, marginBottom: 6 },
  oferta: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 8, elevation: 2,
  },
  ofertaMonto: { fontSize: 16, fontWeight: 'bold' },
  ofertaFecha: { fontSize: 12, color: '#888', marginTop: 2 },
  botonEliminar: { backgroundColor: '#EA4335', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  textoBoton: { color: '#fff', fontWeight: '600' },
  vacio: { textAlign: 'center', color: '#888', marginTop: 12 },
});
