import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignUpCredendtialsDto } from './dto/signUp-credentials.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
  @Post('/signin')
  async signIn(
    @Body() signUpCredendtialsDto: SignUpCredendtialsDto,
  ): Promise<string> {
    const accessTokenObject = await this.authService.signIn(
      signUpCredendtialsDto,
    );
    return accessTokenObject.accessToken;
  }
}
