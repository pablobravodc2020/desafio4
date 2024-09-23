
// src/repuestos/repuestos.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRepuestoDto } from './dto/create-repuesto.dto';
import { Repuesto } from './interfaces/repuesto.interface';

@Injectable()
export class RepuestosService {
  constructor(@InjectModel('Repuesto') private readonly repuestoModel: Model<Repuesto>) {} // Modificado: Inyección del modelo

  async create(createRepuestoDto: CreateRepuestoDto): Promise<Repuesto> {
    const newRepuesto = new this.repuestoModel(createRepuestoDto);
    return newRepuesto.save();
  }

  async findAll(): Promise<Repuesto[]> {
    return this.repuestoModel.find().exec();
  }

  async findOne(id: string): Promise<Repuesto> {
    const repuesto = await this.repuestoModel.findById(id).exec();
    if (!repuesto) {
      throw new NotFoundException(`Repuesto con ID ${id} no encontrado`);
    }
    return repuesto;
  }

  async update(id: string, createRepuestoDto: CreateRepuestoDto): Promise<Repuesto> {
    const updatedRepuesto = await this.repuestoModel.findByIdAndUpdate(id, createRepuestoDto, { new: true }).exec();
    if (!updatedRepuesto) {
      throw new NotFoundException(`Repuesto con ID ${id} no encontrado`);
    }
    return updatedRepuesto;
  }

  async remove(id: string): Promise<void> {
    const result = await this.repuestoModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Repuesto con ID ${id} no encontrado`);
    }
  }
}
