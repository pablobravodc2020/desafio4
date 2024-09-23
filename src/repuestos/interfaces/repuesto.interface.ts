import { Document } from 'mongoose';

export interface Repuesto extends Document {
  id?: string;
  nombre: string;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  foto: string;
}