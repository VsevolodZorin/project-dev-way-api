import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcryptjs';
import { LoginUserDto } from 'src/resources/auth/dto/loginUser.dto';
import { EmailActivationService } from 'src/resources/emailActivation/emailActivation.service';
import { SessionService } from 'src/resources/session/session.service';
import { CreateUserDto } from 'src/resources/user/dto/createUser.dto';
import { IUserFindOptions } from 'src/resources/user/types/userFindOptons.interface';
import { UserEntity } from 'src/resources/user/user.entity';
import { UserService } from 'src/resources/user/user.service';
import { JwtService } from 'src/services/jwt/jwt.service';
import { IJwtTokenPair } from 'src/services/jwt/types/jwtTokenPair.interface';
// import { MailService } from 'src/services/mail/mail.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly emailActivationService: EmailActivationService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService, // private readonly mailService: MailService,
  ) {}

  // async loginWithFirebase(email: string): Promise<UserEntity> {
  // return 'login';
  // const user = await this.userService.findByEmail(email);
  // if (!user) {
  //   user = await this.userService.create({ email });
  // }
  // return user;
  // }

  async registration(
    dto: CreateUserDto,
  ): Promise<{ user: UserEntity } & { tokenPair: IJwtTokenPair }> {
    const user = await this.userService.create(dto);

    const activationLink = uuid(); // v34fa-asfasf-142saf-sa-asf
    const apiUrl = this.configService.get('API_URL');
    // todo activation link on client
    const link = `${apiUrl}/auth/activate/${activationLink}`;
    // await this.mailService.sendActivationMail(dto.email, link);

    await this.emailActivationService.create({
      email: user.email,
      activationLink,
    });

    const tokenPair = await this.jwtService.generateTokenPair(user);

    return { user, tokenPair };
  }

  async activate(link: string) {
    const activationEntity =
      await this.emailActivationService.getByActivationLink(link);

    if (!activationEntity) {
      throw new BadRequestException('uncorrect activation link');
    }

    await this.userService.updateByEmail(activationEntity.email, {
      isActivated: true,
    });
    await this.emailActivationService.remove(link);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    // TODO
    // this.mailService.sendActivationMail('vsevolod.dev@gmail.com');

    const errorResponse = {
      errors: {
        'email or password': 'is invalid',
      },
    };
    // TODO сделать нормальный интерфейс IUserFindOptions из объекта
    const userFindOptions: IUserFindOptions = {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    };
    const user = await this.userService.findByEmail(
      loginUserDto.email,
      userFindOptions,
    );
    if (!user) {
      //     FORBIDDEN = 403,
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      //     FORBIDDEN = 403,
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return user;
  }

  async loginWithGoogle(email: string): Promise<UserEntity> {
    // TODO сделать нормальный интерфейс IUserFindOptions из объекта
    const userFindOptions: IUserFindOptions = {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    };
    const user = await this.userService.findByEmail(email, userFindOptions);
    if (!user) {
      //     FORBIDDEN = 403,
      throw new UnprocessableEntityException('user not found');
    }
    return user;
  }

  async refresh(
    refreshToken: string,
  ): Promise<{ user: UserEntity; tokenPair: IJwtTokenPair }> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const jwtPayload = await this.jwtService.validateRefreshToken(refreshToken);
    const session = await this.sessionService.findByRefreshToken(refreshToken);

    if (!jwtPayload && !session) {
      throw new UnauthorizedException();
    }
    console.log('---refresh jwtPayload', { jwtPayload, session });

    const user = await this.userService.findById(jwtPayload.id);
    const tokenPair = await this.jwtService.generateTokenPair(user);
    return { user, tokenPair };
  }

  async logout(userId: string) {
    return await this.jwtService.removeToken(userId);
  }
}
