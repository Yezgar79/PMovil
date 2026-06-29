import { useCallback, useEffect, useState } from 'react';
import {
  obtenerProductoPorId,
  obtenerArtesanoPorId,
  obtenerOfertasPorProducto,
  crearOferta,
  eliminarOferta,
} from '../services/artesaniaService';
import { Producto, Artesano, Oferta } from '../types/index';

const USUARIO_DEMO = 1;

export function useProductoDetalle(productoId: number) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [artesano, setArtesano] = useState<Artesano | null>(null);
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  const cargar = useCallback(async () => {
    const p = await obtenerProductoPorId(productoId);
    const o = await obtenerOfertasPorProducto(productoId);
    const a = p ? await obtenerArtesanoPorId(p.artesanoId) : null;
    setProducto(p);
    setArtesano(a);
    setOfertas(o);
    setCargando(false);
  }, [productoId]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const pujar = useCallback(async (monto: number) => {
    await crearOferta(productoId, USUARIO_DEMO, monto);
    await cargar();
  }, [productoId, cargar]);

  const cancelarOferta = useCallback(async (ofertaId: number) => {
    if (!producto) return;
    await eliminarOferta(ofertaId, productoId, producto.precioInicial);
    await cargar();
  }, [producto, productoId, cargar]);

  return { producto, artesano, ofertas, cargando, pujar, cancelarOferta };
}
