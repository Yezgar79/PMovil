import { getDatabase } from '../database/db';
import { Artesano, Producto } from '../types/index';
import { IArtesanoRepository } from '../types/IArtesanoRepository';

export class ArtesanoRepositorio implements IArtesanoRepository {
  async obtenerArtesanos(): Promise<Artesano[]> {
    const db = await getDatabase();
    return db.getAllAsync<Artesano>('SELECT * FROM artesanos ORDER BY nombre');
  }

  async obtenerArtesanoPorId(id: number): Promise<Artesano | null> {
    const db = await getDatabase();
    return db.getFirstAsync<Artesano>('SELECT * FROM artesanos WHERE id = ?', id);
  }

  async obtenerProductosPorArtesano(artesanoId: number): Promise<Producto[]> {
    const db = await getDatabase();
    return db.getAllAsync<Producto>(
      'SELECT * FROM productos WHERE artesanoId = ?',
      artesanoId
    );
  }
}
