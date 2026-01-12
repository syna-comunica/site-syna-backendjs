import { Controller, Post, Body } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async create(@Body() createLeadDto: CreateLeadDto) {
    console.log('Lead validada:', createLeadDto);

    return {
      message: 'Lead recebida com sucesso',
      data: createLeadDto,
    };
  }
}