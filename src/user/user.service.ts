import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      //logica de crear el nuevo usuario
      //obtencion y encriptacion de la contrasena
      const encriptedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = new this.userModel({
        ...createUserDto,
        password: encriptedPassword,
      });
      return await newUser.save();
    } catch (error) {
      //logica de captura del error en caso de que la informacion no se ajusta al dto.
      throw new HttpException('Datos incorrecto', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      //buscar que el correo existe en la base de datos
      const user = await this.userModel.findOne({ email });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new HttpException(
          'Contrasena incorrecta',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      if (user && isPasswordValid) {
        //si tengo el usuario y la contrasena valida entonces creo la informacion que enviare a traves de jwt
        // const { email, name } = user;
        // return { email, name };

        const payload = {
          sub: user._id,
          email: user.email,
          name: user.name,
          roles: user.roles,
        };
        return { access_token: await this.jwtService.signAsync(payload) };
      }
    } catch (error) {
      throw new HttpException(
        'Datos no encontrados o incorrectos',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll() : Promise<User[]> { 
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const repuesto = await this.userModel.findById(id).exec();
    if (!repuesto) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return repuesto;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
