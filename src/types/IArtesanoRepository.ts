import { Artesano, Producto } from './index';

export interface IArtesanoRepository {
  obtenerArtesanos(): Promise<Artesano[]>;
  obtenerArtesanoPorId(id: number): Promise<Artesano | null>;
  obtenerProductosPorArtesano(artesanoId: number): Promise<Producto[]>;
}
