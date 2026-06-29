export interface Artesano {
  id: number;
  nombre: string;
  especialidad: string;
  imagen: string;
  ubicacion: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precioInicial: number;
  precioActual: number;
  artesanoId: number;
  fechaFin: string;
}

export interface Oferta {
  id: number;
  productoId: number;
  usuarioId: number;
  monto: number;
  fecha: string;
}
