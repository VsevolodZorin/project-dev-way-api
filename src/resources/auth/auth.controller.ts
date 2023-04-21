import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/common/decorators/user.decorator';
import { AuthService } from 'src/resources/auth/auth.service';
import { LoginUserDto } from 'src/resources/auth/dto/loginUser.dto';
import { CreateUserDto } from 'src/resources/user/dto/createUser.dto';
import { UserService } from 'src/resources/user/user.service';
import { JwtService } from 'src/services/jwt/jwt.service';
import { TelegramService } from 'src/services/telegram/telegram.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly telegramService: TelegramService,
  ) {}

  // @Post('loginWithFirebase')
  // async loginWithFirebase(
  //   @User('email') email: string,
  // ): Promise<IUserResponse> {
  //   const user = await this.authService.loginWithFirebase(email);
  //   return this.userService.buildUserResponse(user);
  // }

  @Post('/info')
  async info(@User('email') email: string, @Res() response: Response) {
    const user = await this.userService.findByEmail(email);
    const tokenPair = await this.jwtService.generateTokenPair(user);

    response.cookie('refreshToken', tokenPair.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const userResponse = this.userService.buildUserResponse(
      user,
      tokenPair.accessToken,
    );

    return response.json(userResponse);
  }

  @Post('/registration')
  async registration(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const { user, tokenPair } = await this.authService.registration(
      createUserDto,
    );
    await this.telegramService.sendMessage(
      `registration local -> email: ${createUserDto}`,
    );
    response.cookie('refreshToken', tokenPair.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const userResponse = await this.userService.buildUserResponse(
      user,
      tokenPair.accessToken,
    );
    response.json(userResponse);
  }

  @Get('/activate/:link')
  @Redirect('http://localhost:3000', 302)
  async activate(@Param('link') link: string) {
    await this.authService.activate(link);
  }

  @Get('/loginwithgoogle')
  async loginGoogle(@User('email') email: string, @Res() response: Response) {
    await this.telegramService.sendMessage(
      `login with google -> email: ${email}`,
    );
    const user = await this.authService.loginWithGoogle(email);
    const tokenPair = await this.jwtService.generateTokenPair(user);
    response.cookie('refreshToken', tokenPair.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const userResponse = this.userService.buildUserResponse(
      user,
      tokenPair.accessToken,
    );

    return response.json(userResponse);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
    await this.telegramService.sendMessage(
      `login local -> email: ${loginUserDto.email}`,
    );
    const user = await this.authService.login(loginUserDto);
    const tokenPair = await this.jwtService.generateTokenPair(user);
    response.cookie('refreshToken', tokenPair.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const userResponse = this.userService.buildUserResponse(
      user,
      tokenPair.accessToken,
    );

    return response.json(userResponse);
  }

  @Get('/refresh')
  async refresh(@Req() request: Request, @Res() response: Response) {
    const { refreshToken } = request.cookies;
    const { user, tokenPair } = await this.authService.refresh(refreshToken);
    response.cookie('refreshToken', tokenPair.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const userResponse = this.userService.buildUserResponse(
      user,
      tokenPair.accessToken,
    );

    return response.json(userResponse);
  }

  @Post('/logout')
  async logout(@User('id') userId: string, @Res() response: Response) {
    response.clearCookie('refreshToken');
    await this.jwtService.removeToken(userId);
    return response.status(200).json({ message: 'logout ok' });
  }
}
