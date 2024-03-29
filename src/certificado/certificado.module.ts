import { Module } from '@nestjs/common';
import { CertificadoService } from './certificado.service';
import { CertificadoController } from './certificado.controller';
import { Certificado } from './entities/certificado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Certificado])],
  controllers: [CertificadoController],
  providers: [CertificadoService,],
})
export class CertificadoModule {}
