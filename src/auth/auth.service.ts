import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interface/login-response.interface';
import { UsersService } from './../users/users.service';
import { User } from './../users/entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { refreshTokenConfig } from 'src/configs/jwt.config';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(RefreshTokenRepository)
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const access_token = await this.createAccessToken(user);
    const refresh_token = await this.createRefreshToken(user);
    return { access_token, refresh_token } as LoginResponse;
  }

  async refreshAccessToken(
    refreshTokenDto: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    const { refreshToken } = refreshTokenDto;
    const payload = await this.decodeToken(refreshToken);
    const refresh_token = await this.refreshTokenRepository.findOne(
      payload.jwtId,
      { relations: ['user'] },
    );

    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token is not found');
    }
    if (refresh_token.isRevoked) {
      throw new UnauthorizedException('Refresh token has been revoked');
    }

    const access_token = await this.createAccessToken(refresh_token.user);
    return { access_token };
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token is expired');
      } else {
        throw new InternalServerErrorException('Failed to decode token');
      }
    }
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
    };

    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }

  async createRefreshToken(user: User): Promise<string> {
    const refreshToken = await this.refreshTokenRepository.createRefreshToken(
      user,
      +refreshTokenConfig.expiresIn,
    );
    const payload = {
      jwtId: refreshToken.id,
    };
    const refresh_token = await this.jwtService.signAsync(
      payload,
      refreshTokenConfig,
    );
    return refresh_token;
  }

  async revokeRefreshToken(id: string): Promise<void> {
    const refreshToken = await this.refreshTokenRepository.findOne(id);
    if (!refreshToken) {
      throw new NotFoundException('Refresh token is not found');
    }
    refreshToken.isRevoked = true;
    await refreshToken.save();
  }
}
