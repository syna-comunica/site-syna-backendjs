import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly repository: Repository<Lead>,
  ) {}

  async create(data: Partial<Lead>) {
    const exists = await this.repository.findOne({
      where: { email: data.email },
    });

    if (exists) {
      throw new BadRequestException('Já existe um lead com esse e-mail.');
    }

    const lead = this.repository.create(data);

    try {
      return await this.repository.save(lead);
    } catch (err: any) {
      if (err?.code === '23505') {
        throw new BadRequestException('Já existe um lead com esse e-mail.');
      }
      throw err;
    }
  }

  async findAll() {
    return this.repository.find({
      order: { createdAt: 'DESC' },
    });
  }
}