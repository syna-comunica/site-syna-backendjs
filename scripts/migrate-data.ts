import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { LeadsService } from '../src/leads/leads.service';
import * as fs from 'fs';

async function migrateData() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const leadsService = app.get(LeadsService);

  try {
    // Exportar dados do banco local
    const localLeads = await leadsService.findAll();
    
    console.log(`📦 Exportando ${localLeads.length} leads...`);
    
    // Salvar backup
    fs.writeFileSync(
      './leads-backup.json', 
      JSON.stringify(localLeads, null, 2)
    );
    
    console.log('✅ Backup salvo em leads-backup.json');
    console.log('🚀 Configure .env.production com credenciais Hostinger');
    console.log('📝 Execute: npm run start:prod para migrar dados');
    
  } catch (error) {
    console.error('❌ Erro na migração:', error);
  } finally {
    await app.close();
  }
}

migrateData();
