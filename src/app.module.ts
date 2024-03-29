import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificadoModule } from './certificado/certificado.module';
import { ConfigModule } from '@nestjs/config';
import { OracleConfigService } from './config/oracle.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CertificadoModule, 
    ConfigModule.forRoot({isGlobal : true}),
    TypeOrmModule.forRootAsync({
      useClass: OracleConfigService,
      inject: [OracleConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
