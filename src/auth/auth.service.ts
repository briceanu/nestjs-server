import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpCredendtialsDto } from './dto/signUp-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    //this InjectRepository is from typeORM
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.signUp(authCredentialsDto);
  }

  async signIn(
    signUpCredendtialsDto: SignUpCredendtialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = signUpCredendtialsDto;
    const user = await this.usersRepository.findOne({ where: { username } });

    const jwtOptions = {
      secret: this.configService.get<string>('JWT_SECRET'),
    };

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload, jwtOptions);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
