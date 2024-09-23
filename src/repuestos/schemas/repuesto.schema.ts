import { Schema } from 'mongoose';

export const RepuestoSchema = new Schema({
  nombre: { type: String, required: true },
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  anio: { type: Number, required: false },
  precio: { type: Number, required: true },
  foto: { type: String, required: false },
});
