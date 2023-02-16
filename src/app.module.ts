import { Module } from '@nestjs/common';
import { DevModule } from 'src/resources/dev/dev.module';

@Module({
  imports: [DevModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
