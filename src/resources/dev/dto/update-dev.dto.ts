import { PartialType } from '@nestjs/mapped-types';
import { CreateDevDto } from './create-dev.dto';

export class UpdateDevDto extends PartialType(CreateDevDto) {}
