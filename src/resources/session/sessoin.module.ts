import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SessionEntity } from 'src/resources/session/session.entity';
import { SessionService } from 'src/resources/session/session.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: SessionEntity,
        schemaOptions: {
          collection: 'session',
        },
      },
    ]),
  ],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
