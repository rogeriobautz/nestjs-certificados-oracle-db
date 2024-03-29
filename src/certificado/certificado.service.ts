import { Injectable } from '@nestjs/common';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { Certificado } from './entities/certificado.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CertificadoService {

  constructor( 
    @InjectRepository(Certificado)
    private certificadoRepository: Repository<Certificado>,
  ) {}


  create(dto: CreateCertificadoDto) {
    let now = new Date();
    const expiration_date = (now.getFullYear() + 1) + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    console.log("expiration date: %s", expiration_date);  
    const certificado = new Certificado(randomUUID(), dto.owner, expiration_date, new Date());
    return this.certificadoRepository.save(certificado);
  }

  findAll() {
    return this.certificadoRepository.find();
  }

  select(){
    return this.certificadoRepository.createQueryBuilder().select("certificado").from(Certificado, "certificado").getMany();
  }

  async teste(){ 

    const [connection, oracledb] = this.getDbConnection()
    return  connection.then(async conn => {
      const result =  await conn.execute('SELECT * FROM OCLOPB.CERT_OPB', {}, {
        fetchTypeHandler: function(metaData) {
            if (metaData.name == "TS_LST_CHANGE") {
                return {type: oracledb.TIMESTAMP};
            }
          }
        }
      );
      console.log("result ", result);
      return result.rows.map(row => this.rowToCertificadoMapper(row));
    });
  }

  getDbConnection(){    
    //process.env.TZ='America/Sao_Paulo';
    //process.env.ORA_SDTZ='America/Sao_Paulo';
    const oracledb = require('oracledb');

    const dbConfig = {
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=${process.env.DB_HOST})(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=xe)))`
    };
    return [oracledb.getConnection(dbConfig), oracledb];
  }

  rowToCertificadoMapper(row: any){
    let dateUTC = new Date(row[3]);
    console.log("dateUTC ", dateUTC);
    const certitificado = new Certificado(
      row[0],
      row[1],
      row[2],
      new Date(dateUTC.getTime() - (dateUTC.getTimezoneOffset() * 60 * 1000))
    );
    console.log(certitificado);
    return certitificado;
}



/* 
  findOne(id: number) {
    return this.certificadoRepository.findOne(id);
  }

  update(id: number, updateCertificadoDto: UpdateCertificadoDto) {
    return `This action updates a #${id} certificado`;
  }
*/
  remove(id: number) {
    return this.certificadoRepository.delete(id);
  } 
}
