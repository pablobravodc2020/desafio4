import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorator';
import { Role } from 'src/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
 constructor(private reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass,
    ]);
    if(!requiredRoles){
      return true;
    }
 
    const {user} = context.switchToHttp().getRequest();
    let rolUsuario = requiredRoles.some((role) => user.roles?.includes(role));
    if(!rolUsuario){
      throw new HttpException('Rol del usuario no permitido', HttpStatus.NOT_ACCEPTABLE,)
    }
    return rolUsuario;
  }
}
