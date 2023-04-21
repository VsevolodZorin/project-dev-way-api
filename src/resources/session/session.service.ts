import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateSessionDto } from 'src/resources/session/dto/createSession.dto';
import { SessionEntity } from 'src/resources/session/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(SessionEntity)
    private readonly sessionRepository: ModelType<SessionEntity>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<SessionEntity> {
    const newSession = new this.sessionRepository(createSessionDto);
    return await newSession.save();
  }

  async findByUserId(userId: string): Promise<SessionEntity> {
    return await this.sessionRepository.findOne({ userId }).exec();
  }

  async findByRefreshToken(refreshToken: string): Promise<SessionEntity> {
    return await this.sessionRepository.findOne({ refreshToken }).exec();
  }

  async update(updateSessionDto: CreateSessionDto): Promise<SessionEntity> {
    const session = await this.findByUserId(updateSessionDto.userId);
    const updated = await this.sessionRepository
      .findByIdAndUpdate(session._id, {
        refreshToken: updateSessionDto.refreshToken,
      })
      .exec();
    return updated;
  }

  async delete(refreshToken: string) {
    return await this.sessionRepository.deleteOne({ refreshToken }).exec();
  }
}
