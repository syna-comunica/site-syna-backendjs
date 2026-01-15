import { Body, Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadsController {
  @Post()
  async create(@Body() dto: CreateLeadDto, @Req() req: Request) {
    // 🔎 IP (Render às vezes manda por header)
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.ip ||
      'unknown';

    console.log('📩 Novo lead recebido', {
      ip,
      name: dto.name,
      email: dto.email,
      company: dto.company ?? null,
      messageLength: dto.message?.length ?? 0,
    });

    // Por enquanto não salva no banco — só confirma recebimento.
    return {
      ok: true,
      message: 'Lead recebida com sucesso',
    };
  }
}