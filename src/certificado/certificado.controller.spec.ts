import { Test, TestingModule } from '@nestjs/testing';
import { CertificadoController } from './certificado.controller';
import { CertificadoService } from './certificado.service';

describe('CertificadoController', () => {
  let controller: CertificadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificadoController],
      providers: [CertificadoService],
    }).compile();

    controller = module.get<CertificadoController>(CertificadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
