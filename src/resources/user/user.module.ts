import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { RoleModule } from 'src/resources/role/role.module';
import { UserEntity } from 'src/resources/user/user.entity';
import { JwtModule } from 'src/services/jwt/jwt.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserEntity,
        schemaOptions: {
          collection: 'users',
        },
      },
    ]),
    RoleModule,
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
