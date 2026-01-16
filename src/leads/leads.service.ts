import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async create(data: Partial<Lead>) {
    const existing = await this.leadRepository.findOne({
      where: { email: data.email },
    });

    if (existing) {
      throw new BadRequestException('Já existe um lead com esse e-mail.');
    }

    const lead = this.leadRepository.create(data);
    return this.leadRepository.save(lead);
  }

  async findAll() {
    return this.leadRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}