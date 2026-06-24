import { useState, useEffect } from 'react';
import { productos as productosMock, artesanos } from '../services/artesaniaService';
import { Producto, Artesano } from '../types/index';

export function useProductos() {
  // Guarda la lista de productos que se mostrará en pantalla.
  const [productos, setProductos] = useState<Producto[]>([]);
  // Indica si los datos todavía se están cargando (true al inicio).
  const [cargando, setCargando] = useState<boolean>(true);

  // Se ejecuta una sola vez al montar el hook: simula la carga de datos
  // desde el servicio y luego marca que la carga terminó.
  useEffect(() => {
    setProductos(productosMock);
    setCargando(false);
  }, []);

  // Función auxiliar que busca y devuelve el artesano asociado a un producto.
  const getArtesano = (artesanoId: number): Artesano | undefined => {
    return artesanos.find(a => a.id === artesanoId);
  };

  // El hook devuelve los productos, el estado de carga y la función getArtesano
  // para que los componentes puedan consumirlos sin conocer la lógica interna.
  return { productos, cargando, getArtesano };
}