import axios from 'axios';
import { Artesano, Producto } from '../types/index';
import { IArtesanoRepository } from '../types/IArtesanoRepository';

const URL_BASE = 'http://10.16.72.149:3000/artesanos';

export class ArtesanoRepositorioAPI implements IArtesanoRepository {
  async obtenerArtesanos(): Promise<Artesano[]> {
    const { data } = await axios.get<Artesano[]>(URL_BASE);
    return data;
  }

  async obtenerArtesanoPorId(id: number): Promise<Artesano | null> {
    try {
      const { data } = await axios.get<Artesano>(`${URL_BASE}/${id}`);
      return data;
    } catch {
      return null;
    }
  }

  async obtenerProductosPorArtesano(artesanoId: number): Promise<Producto[]> {
    const { data } = await axios.get<Producto[]>(`${URL_BASE}/${artesanoId}/productos`);
    return data;
  }
}
