import { ArtesanoRepositorio } from './ArtesanoRepositorio';
import { ArtesanoRepositorioAPI } from './ArtesanoRepositorioAPI';
import { IArtesanoRepository } from '../types/IArtesanoRepository';

const USE_API = true; // false → SQLite local

export const artesanoRepository: IArtesanoRepository = USE_API
  ? new ArtesanoRepositorioAPI()
  : new ArtesanoRepositorio();
