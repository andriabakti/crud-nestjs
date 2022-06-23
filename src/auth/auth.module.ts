import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../configs/jwt.config';
import { AuthService } from './auth.service';
import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './repository/refresh-token.repository';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([RefreshTokenRepository]),
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
