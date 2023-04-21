import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { EmailActivationEntity } from './emailActivation.entity';
import { EmailActivationService } from './emailActivation.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: EmailActivationEntity,
        schemaOptions: {
          collection: 'emailActivation',
        },
      },
    ]),
  ],
  providers: [EmailActivationService],
  exports: [EmailActivationService],
})
export class EmailActivationModule {}
