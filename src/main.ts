import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { env } from 'process';

//process.env.TZ = 'America/Sao_Paulo'; 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}

//process.env.TZ='America/Sao_Paulo';
//process.env.ORA_SDTZ='America/Sao_Paulo';
//console.log("TZ ", process.env.TZ)
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
bootstrap();
