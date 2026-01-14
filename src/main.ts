import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS (frontend Vercel + dev local)
  app.enableCors({
    origin: [
      'http://localhost:8080',
      'http://localhost:3000',
      'https://www.synacomunica.com.br',
      'https://synacomunica.com.br',
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ✅ Validação global (DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos extras
      forbidNonWhitelisted: true, // rejeita campos desconhecidos
      transform: true, // converte types quando possível
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port, '0.0.0.0');

  Logger.log(`🚀 API rodando na porta ${port}`, 'Bootstrap');
}
bootstrap();