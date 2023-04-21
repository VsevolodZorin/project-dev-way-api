import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PermissionEntity } from 'src/resources/permission/permission.entity';
import { RoleModule } from 'src/resources/role/role.module';
import { UserModule } from 'src/resources/user/user.module';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PermissionEntity,
        schemaOptions: {
          collection: 'permissions',
        },
      },
    ]),
    UserModule,
    RoleModule,
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
