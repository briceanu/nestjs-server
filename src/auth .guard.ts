import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserRepository } from './auth/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const jwtOptions = {
      secret: this.configService.get<string>('JWT_SECRET'),
    };
    try {
      const payload = await this.jwtService.verifyAsync(token, jwtOptions);
      const { username } = payload;
      const user: User = await this.usersRepository.findOne({
        where: { username },
      });
      if (!user) {
        throw new ForbiddenException('User not found');
      }

      request.user = user;
      return true;
    } catch {
      throw new ForbiddenException('Please check your credentials');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
