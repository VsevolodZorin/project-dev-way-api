import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateEmailActivationDto } from './dto/createEmailActivation.dto';
import { EmailActivationEntity } from './emailActivation.entity';

@Injectable()
export class EmailActivationService {
  constructor(
    @InjectModel(EmailActivationEntity)
    private readonly emailActivatioinRepository: ModelType<EmailActivationEntity>,
  ) {}

  async create(dto: CreateEmailActivationDto): Promise<EmailActivationEntity> {
    const newEmailActivation = new this.emailActivatioinRepository({
      email: dto.email,
      activationLink: dto.activationLink,
    });
    return newEmailActivation.save();
  }

  async getByEmail(email: string): Promise<EmailActivationEntity> {
    return this.emailActivatioinRepository.findOne({ email }).lean().exec();
  }

  async getByActivationLink(
    activationLink: string,
  ): Promise<EmailActivationEntity> {
    return this.emailActivatioinRepository
      .findOne({ activationLink })
      .lean()
      .exec();
  }

  async update(dto: CreateEmailActivationDto): Promise<EmailActivationEntity> {
    return this.emailActivatioinRepository.findOneAndUpdate(
      { email: dto.email },
      { activationLink: dto.activationLink },
    );
  }

  async remove(activationLink: string): Promise<any> {
    return this.emailActivatioinRepository
      .findOneAndDelete({ activationLink })
      .exec();
  }
}
