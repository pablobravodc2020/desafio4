
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepuestosService } from './repuestos.service';
import { RepuestosController } from './repuestos.controller';
import { RepuestoSchema } from './schemas/repuesto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Repuesto', schema: RepuestoSchema }]), // Modificado: Registro del schema
  ],
  controllers: [RepuestosController],
  providers: [RepuestosService],
})
export class RepuestosModule {}

