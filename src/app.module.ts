import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigFactory } from './config/orm.config';
import { SkillModule } from './resources/skill/skill.module';
import { JwtWrapperModule } from './services/jwt/jwt-wrapper.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfigFactory,
    }),
    SkillModule,
    JwtWrapperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
