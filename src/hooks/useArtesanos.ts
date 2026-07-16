import { useState, useEffect } from 'react';
import { Artesano, Producto } from '../types/index';
import { artesanoRepository } from '../services/RepositoryFactory';

export function useArtesanos() {
  const [artesanos, setArtesanos] = useState<Artesano[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await artesanoRepository.obtenerArtesanos();
      setArtesanos(datos);
    } catch {
      setError('No se pudo conectar con el servicio. Intenta más tarde.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return { artesanos, cargando, error, recargar: cargar };
}

export function useArtesano(id: number) {
  const [artesano, setArtesano] = useState<Artesano | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;
    (async () => {
      setCargando(true);
      setError(null);
      try {
        const [a, p] = await Promise.all([
          artesanoRepository.obtenerArtesanoPorId(id),
          artesanoRepository.obtenerProductosPorArtesano(id),
        ]);
        if (activo) { setArtesano(a); setProductos(p); }
      } catch {
        if (activo) setError('Error al cargar artesano');
      } finally {
        if (activo) setCargando(false);
      }
    })();
    return () => { activo = false; };
  }, [id]);

  return { artesano, productos, cargando, error };
}
