import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RoleController } from './role.controller';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: RoleEntity,
        schemaOptions: {
          collection: 'roles',
        },
      },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService, RolesGuard],
  exports: [RoleService],
})
export class RoleModule {}
