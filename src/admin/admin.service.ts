import { Injectable } from '@nestjs/common';
import { LeadsService } from '../leads/leads.service';

@Injectable()
export class AdminService {
  constructor(private readonly leadsService: LeadsService) {}

  async listLeads() {
    return this.leadsService.findAll();
  }
}
