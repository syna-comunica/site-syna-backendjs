import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

async function createAdminUser() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);
  const configService = app.get(ConfigService);

  try {
    const adminEmail = configService.get<string>('ADMIN_EMAIL', 'admin@synacomunica.com.br');
    const adminPassword = configService.get<string>('ADMIN_PASSWORD', 'LogSyna@26!');

    console.log('🔧 Criando usuário admin...');
    
    const adminUser = await authService.register({
      email: adminEmail,
      password: adminPassword,
      name: 'Admin User',
    });

    // Atualizar role para admin
    const userRepository = app.get('UserRepository');
    await userRepository.update(adminUser.id, { role: 'admin' });

    console.log('✅ Usuário admin criado com sucesso!');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Senha: ${adminPassword}`);
    
  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error.message);
  } finally {
    await app.close();
  }
}

createAdminUser();
