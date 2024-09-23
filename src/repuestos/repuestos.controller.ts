// src/repuestos/repuestos.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RepuestosService } from './repuestos.service';
import { CreateRepuestoDto } from './dto/create-repuesto.dto';
import { Repuesto } from './interfaces/repuesto.interface';
import { Roles } from 'src/decorator';
import { Role } from 'src/rol.enum';

@Controller('repuestos')
export class RepuestosController {
  constructor(private readonly repuestosService: RepuestosService) {}

  @Roles(Role.Admin)
  @Post('/create')
  async create(@Body() createRepuestoDto: CreateRepuestoDto): Promise<Repuesto> {
    return this.repuestosService.create(createRepuestoDto);
  }

  @Roles(Role.User, Role.Admin)
  @Get('/lista')
  async findAll(): Promise<Repuesto[]> {
    return this.repuestosService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Repuesto> {
    return this.repuestosService.findOne(id);
  }
  
  @Roles(Role.User, Role.Admin)
  @Put(':id')
  async update(@Param('id') id: string, @Body() createRepuestoDto: CreateRepuestoDto): Promise<Repuesto> {
    return this.repuestosService.update(id, createRepuestoDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.repuestosService.remove(id);
  }
}
