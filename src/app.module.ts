import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepuestosModule } from './repuestos/repuestos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserGuard } from './user/user.guard';
import { RolesGuard } from './user/roles/roles.guard';
import { ConfigModule } from '@nestjs/config'


@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongodb://localhost:27017/repuesto', { 
      MongooseModule.forRoot('mongodb://mongo:abmyVYcQtJTtpfJreXFOaVFlZNtXrQdO@junction.proxy.rlwy.net:10962', {
    }),
    RepuestosModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: UserGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

