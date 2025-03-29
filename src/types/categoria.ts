export interface Producto {
    id?: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoriaId: number;
  }

  export interface Categoria {
    id?: number;
    nombre: string;
    descripcion?: string;
    productos?: Producto[];
  }