import { getDatabase } from '../database/db';
import { Artesano, Producto, Oferta } from '../types/index';

export async function obtenerArtesanos(): Promise<Artesano[]> {
  const db = await getDatabase();
  return db.getAllAsync<Artesano>('SELECT * FROM artesanos ORDER BY nombre');
}

export async function obtenerArtesanoPorId(id: number): Promise<Artesano | null> {
  const db = await getDatabase();
  return db.getFirstAsync<Artesano>('SELECT * FROM artesanos WHERE id = ?', id);
}

export async function obtenerProductos(): Promise<Producto[]> {
  const db = await getDatabase();
  return db.getAllAsync<Producto>('SELECT * FROM productos');
}

export async function obtenerProductosPorArtesano(artesanoId: number): Promise<Producto[]> {
  const db = await getDatabase();
  return db.getAllAsync<Producto>(
    'SELECT * FROM productos WHERE artesanoId = ?',
    artesanoId
  );
}

export async function obtenerProductoPorId(id: number): Promise<Producto | null> {
  const db = await getDatabase();
  return db.getFirstAsync<Producto>('SELECT * FROM productos WHERE id = ?', id);
}

// ── Ofertas (pujas) ──────────────────────────────────────────────────────
export async function obtenerOfertasPorProducto(productoId: number): Promise<Oferta[]> {
  const db = await getDatabase();
  return db.getAllAsync<Oferta>(
    'SELECT * FROM ofertas WHERE productoId = ? ORDER BY id DESC',
    productoId
  );
}

// Inserta una puja y actualiza el precio actual del producto
export async function crearOferta(productoId: number, usuarioId: number, monto: number): Promise<void> {
  const db = await getDatabase();
  const fecha = new Date().toISOString();
  await db.runAsync(
    'INSERT INTO ofertas (productoId, usuarioId, monto, fecha) VALUES (?, ?, ?, ?)',
    productoId, usuarioId, monto, fecha
  );
  await db.runAsync('UPDATE productos SET precioActual = ? WHERE id = ?', monto, productoId);
}

// Elimina una puja y recalcula el precio actual del producto
export async function eliminarOferta(ofertaId: number, productoId: number, precioInicial: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM ofertas WHERE id = ?', ofertaId);
  const restante = await db.getFirstAsync<{ monto: number | null }>(
    'SELECT MAX(monto) AS monto FROM ofertas WHERE productoId = ?',
    productoId
  );
  const nuevoPrecio = restante?.monto ?? precioInicial;
  await db.runAsync('UPDATE productos SET precioActual = ? WHERE id = ?', nuevoPrecio, productoId);
}
